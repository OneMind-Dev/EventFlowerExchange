package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.UserRegistrationRequest;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.enums.Role;
import fu.gr2.EcommerceProject.exception.UserAlreadyApprovedException;
import fu.gr2.EcommerceProject.exception.UserNotFound;

import fu.gr2.EcommerceProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserRegistrationService {

    private final UserRepository userRepository;

    @Autowired
    public UserRegistrationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getUserByUsername(String username) throws UserNotFound {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (!userOpt.isPresent()) {
            throw new UserNotFound("User with username '" + username + "' not found.");
        }
        return userOpt.get();
    }

    public void approveRegistration(String username) throws UserNotFound, UserAlreadyApprovedException {
        User user = getUserByUsername(username);

        if (user.isApprovedByAdmin()) {
            throw new UserAlreadyApprovedException("User registration is already approved.");
        }

        user.setApprovedByAdmin(true);

        if (user.getRole().contains(Role.SELLER)) {
            user.setStatus(false);
        }

        userRepository.save(user);
    }

    public void rejectRegistration(String username, String reason) throws UserNotFound {
        User user = getUserByUsername(username);

        if (!user.isApprovedByAdmin()) {
            throw new IllegalStateException("User registration is already not approved.");
        }

        user.setApprovedByAdmin(false);
        user.setRejectionReason(reason);

        userRepository.save(user);
    }

    public User registerUserRole(UserRegistrationRequest request) throws UserNotFound {
        Optional<User> existingUserOpt = userRepository.findByUsername(request.getUsername());

        if (!existingUserOpt.isPresent()) {
            throw new UserNotFound("User with username '" + request.getUsername() + "' not found.");
        }

        User existingUser = existingUserOpt.get();
        Role requestedRole = request.getRole();

        if (requestedRole == Role.SELLER || requestedRole == Role.SHIPPER) {
            existingUser.getRole().add(requestedRole);
            existingUser.setApprovedByAdmin(false);
            existingUser.setStatus(false);
            return userRepository.save(existingUser);
        } else {
            throw new UnsupportedOperationException("Only SELLER or SHIPPER roles can be registered for existing users.");
        }
    }
}