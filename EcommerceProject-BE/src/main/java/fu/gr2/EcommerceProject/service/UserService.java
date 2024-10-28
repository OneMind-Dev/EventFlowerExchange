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

}
