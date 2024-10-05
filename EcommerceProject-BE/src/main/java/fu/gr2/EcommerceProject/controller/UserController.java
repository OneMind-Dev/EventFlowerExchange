//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.UserCreationRequest;
import fu.gr2.EcommerceProject.dto.request.UserRegistrationRequest;
import fu.gr2.EcommerceProject.dto.request.UserUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.UserResponse;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.UserNotFound;
import fu.gr2.EcommerceProject.service.UserRegistrationService;
import fu.gr2.EcommerceProject.service.UserService;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/users"})
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;
    private UserRegistrationService userRegistrationService;

    public UserController() {
    }

    @PostMapping({"/register"})
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.builder().result(this.userService.createUser(request)).build();
    }

    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        Authentication authentitcation = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username: {}", authentitcation.getName());
        authentitcation.getAuthorities().forEach((grantedAuthority) -> {
            log.info(grantedAuthority.getAuthority());
        });
        return ApiResponse.builder().result(this.userService.getUser()).build();
    }

    @GetMapping({"/{userId}"})
    UserResponse getUser(@PathVariable("userId") String userId) {
        return this.userService.getUser(userId);
    }

    @PutMapping({"/{userId}"})
    UserResponse updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
        return this.userService.updateUser(userId, request);
    }

    @DeleteMapping({"/{userId}"})
    String deleteUser(@PathVariable String userId) {
        this.userService.deleteUser(userId);
        return "User has been deleted";
    }

    @PostMapping({"/registerRole"})
    public User registerUserRole(@RequestBody UserRegistrationRequest request) {
        try {
            return this.userRegistrationService.registerUserRole(request);
        } catch (UserNotFound var3) {
            throw new UserNotFound("User with the provided details not found.");
        } catch (UnsupportedOperationException var4) {
            throw new RuntimeException("Operation is not supported.");
        }
    }
}
