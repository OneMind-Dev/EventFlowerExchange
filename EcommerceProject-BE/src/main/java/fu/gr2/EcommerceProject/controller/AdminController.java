package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.UserCreationRequest;
import fu.gr2.EcommerceProject.dto.response.RegistrationFormResponse;
import fu.gr2.EcommerceProject.dto.response.UserResponse;
import fu.gr2.EcommerceProject.exception.UserAlreadyApprovedException;
import fu.gr2.EcommerceProject.exception.UserNotFound;
import fu.gr2.EcommerceProject.service.UserRegistrationService;
import fu.gr2.EcommerceProject.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserRegistrationService userRegistrationService;
    private final UserService userService;

    @PostMapping("/AdminRegister")
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request){

        return ApiResponse.<UserResponse>builder()
                .result(userService.createAdmin(request))
                .build();
    }

    public AdminController(UserRegistrationService userRegistrationService, UserService userService) {
        this.userRegistrationService = userRegistrationService;
        this.userService = userService;
    }

    @GetMapping("/registerForm")
    ApiResponse<List<RegistrationFormResponse>> getAllRegisterForm(){
        return ApiResponse.<List<RegistrationFormResponse>>builder()
                .result(userRegistrationService.getRegistrationForm())
                .build();
    }

    @PostMapping("/approveRegistration/{formId}")
    ApiResponse approveRegistration(@PathVariable int formId) {
        return userRegistrationService.approveRegistration(formId);
    }

    @PostMapping("/rejectRegistration/{formId}")
    ApiResponse rejectRegistration(@PathVariable int formId, @RequestBody @NotBlank String reason) {
        return  userRegistrationService.rejectRegistration(formId,reason);
    }
}