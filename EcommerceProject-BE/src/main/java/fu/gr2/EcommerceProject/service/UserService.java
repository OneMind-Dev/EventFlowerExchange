package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.dto.request.UserCreationRequest;
import fu.gr2.EcommerceProject.dto.request.UserUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.UserResponse;
import fu.gr2.EcommerceProject.enums.Role;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.mapper.UserMapper;
import fu.gr2.EcommerceProject.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    public UserResponse createUser(UserCreationRequest request){


        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);


        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roles.add(Role.USER);

        user.setRole(roles);
        userRepository.save(user);
        return UserResponse.
                builder()
                .user_id(user.getUser_id())
                .username(user.getUsername())
                .phone(user.getPhone())
                .statusUser(user.isStatusUser())
                .role(user.getRole())
                .created_at(user.getCreatedAt())
                .email(user.getEmail())
                .address(user.getAddress())
                .avatar(user.getAvatar())
                .build();
    }

    public List<UserResponse> getUser(){
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }
    public UserResponse getUser(String userId){
        return userMapper.toUserResponse(userRepository.findById(userId).
                orElseThrow(() -> new RuntimeException("User not found")));
    }

    public UserResponse updateUser(String userId,UserUpdateRequest request){
        User user = userRepository.findById(userId).
                orElseThrow(() -> new RuntimeException("User not found"));

        userMapper.updateUser(user,request);

        user.setStatusUser(true);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId){
        userRepository.deleteById(userId);
    }


}
