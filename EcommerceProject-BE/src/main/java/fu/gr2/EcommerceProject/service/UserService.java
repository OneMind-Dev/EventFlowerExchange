package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.UserChangePasswordRequest;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserService {
    @Autowired
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;


    public UserResponse createAdmin(UserCreationRequest request){


        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);


        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roles.add(Role.valueOf(Role.ADMIN.name()));

        user.setRole(roles);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse createUser(UserCreationRequest request){


        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);


        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        roles.add(Role.valueOf(Role.USER.name()));

        user.setRole(roles);
//        System.out.println("userId " +user.getUserId());
        return userMapper.toUserResponse(userRepository.save(user));
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


        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId){
        userRepository.deleteById(userId);
    }

    public void banUser(String userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(!user.isStatus()) throw new AppException(ErrorCode.ACCOUNT_BANNED);
        user.setStatus(false);
        userRepository.save(user);
    }

    public void unbanUser(String userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(user.isStatus()) throw new AppException(ErrorCode.ACCOUNT_NOT_BANNED);
        user.setStatus(true);
        userRepository.save(user);
    }

    public void updateAvatar(String userId, String avatarPath) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
        user.setAvatar(avatarPath);
        userRepository.save(user);
    }
    public void changePassword(String userId, UserChangePasswordRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
        if(request.getNewPassword().equals(request.getConfirmedPassword())){
            user.setPassword(passwordEncoder.encode(request.getConfirmedPassword()));
        }
        userRepository.save(user);
    }
//    public User handleGoogleLogin(String accessToken) {
//        String userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
//
//        // Retrieve user info from Google
//        RestTemplate restTemplate = new RestTemplate();
//        String response;
//        try {
//            response = restTemplate.getForObject(userInfoEndpoint + "?access_token=" + accessToken, String.class);
//        } catch (HttpClientErrorException e) {
//            // Handle HTTP errors (e.g., 4xx, 5xx)
//            throw new AppException(ErrorCode.Retrieve_user_infoFail);
//        } catch (Exception e) {
//            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
//        }
//        // Parse the response into UserResponse
//        UserResponse userResponse;
//        try {
//            userResponse = parseUserInfo(response);
//        } catch (RuntimeException e) {
//            throw new AppException(ErrorCode.INVALID_KEY);
//        }
//        // Check if user already exists
//        User user = userRepository.findByEmail(userResponse.getEmail())
//                .map(existingUser -> {
//                    existingUser.setAvatar(userResponse.getAvatar());
//                    existingUser.setUsername(userResponse.getUsername());
//                    return existingUser;
//                })
//                .orElseGet(() -> User.builder()
//                        .username(userResponse.getUsername())
//                        .email(userResponse.getEmail())
//                        .avatar(userResponse.getAvatar())
//                        .role(Set.of(Role.USER)) // Assign the USER role
//                        .status(true) // Set user status to active
//                        .build());
//
//        // Save user to the database
//        return userRepository.save(user);
//    }
//
//    private UserResponse parseUserInfo(String response) {
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            return objectMapper.readValue(response, UserResponse.class);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to parse user info from Google", e);
//        }
//    }

}
