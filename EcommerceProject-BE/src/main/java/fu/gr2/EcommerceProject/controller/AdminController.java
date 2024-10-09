package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.response.RegistrationFormResponse;
import fu.gr2.EcommerceProject.exception.UserAlreadyApprovedException;
import fu.gr2.EcommerceProject.exception.UserNotFound;
import fu.gr2.EcommerceProject.service.UserRegistrationService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserRegistrationService userRegistrationService;

    public AdminController(UserRegistrationService userRegistrationService) {
        this.userRegistrationService = userRegistrationService;
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
//
//    @PutMapping("/reject-registration/{username}")
//    public ResponseEntity<String> rejectRegistration(@PathVariable String username, @RequestParam @NotBlank String reason) {
//        if (username == null || username.trim().isEmpty()) {
//            return ResponseEntity.badRequest().body("Username is required and cannot be blank.");
//        }
//
//        try {
//            userRegistrationService.rejectRegistration(username, reason);
//            return ResponseEntity.ok("User registration rejected successfully.");
//        } catch (UserNotFound e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }
}