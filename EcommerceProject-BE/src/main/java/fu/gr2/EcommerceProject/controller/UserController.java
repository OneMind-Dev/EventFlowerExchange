package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.*;
import fu.gr2.EcommerceProject.dto.response.RegistrationFormResponse;
import fu.gr2.EcommerceProject.dto.response.UserResponse;
import fu.gr2.EcommerceProject.exception.UserNotFound;
import fu.gr2.EcommerceProject.service.UserRegistrationService;
import fu.gr2.EcommerceProject.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRegistrationService userRegistrationService;

    @PostMapping("/register")
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request){

        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {

//        var authentitcation = SecurityContextHolder.getContext().getAuthentication();
//
//        log.info("Username: {}",authentitcation.getName());
//        authentitcation.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
//
//

        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getUser())
                .build();
    }

    @GetMapping("/{userId}")
    UserResponse getUser(@PathVariable("userId") String userId){
        return userService.getUser(userId);
    }

    @PutMapping("/{userId}")
    UserResponse updateUser(@PathVariable String userId,@RequestBody UserUpdateRequest request){
        return userService.updateUser(userId, request);
    }

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
        return "User has been deleted";
    }

    @PostMapping("/registerRole/{userId}")
    public RegistrationFormResponse registerUserRole(@PathVariable String userId, @RequestBody UserRegistrationRequest request) {
        try {
            return userRegistrationService.registerUserRole(userId,request);
        } catch (UserNotFound e) {
            throw new UserNotFound("User with the provided details not found.");
        } catch (UnsupportedOperationException e) {
            throw new RuntimeException("Operation is not supported.");
        }
    }

    @PostMapping("/ban/{userId}")
    public ApiResponse<Void> banUser(@PathVariable String userId){
        userService.banUser(userId);
        return  ApiResponse.<Void>builder()
                .message("Ban user thành công")
                .build();
    }
    @PostMapping("/unban/{userId}")
    public ApiResponse<Void> unbanUser(@PathVariable String userId){
        userService.unbanUser(userId);
        return  ApiResponse.<Void>builder()
                .message("Unban user thành công")
                .build();
    }
    @PatchMapping("/changepass/{userId}")
    public void changePass(@PathVariable String userId,@RequestBody @Valid UserChangePasswordRequest request){
        userService.changePassword(userId, request);
    }
}
