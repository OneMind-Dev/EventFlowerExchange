package fu.gr2.EcommerceProject.dto.request;

import fu.gr2.EcommerceProject.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserRegistrationRequest {
    @NotBlank(message = "Username is mandatory")
    private String username;

    @NotBlank(message = "Password is mandatory")
    private String password;

    @Email(message = "Email should be valid")
    private String email;

    @Pattern(regexp = "\\d{10}", message = "Phone should be valid")
    private String phone;

    private String address;

    private String avatar;

    // For specifying the role (User, Seller, Shipper, etc.)
    private Role role;

    // Add fields for citizen identification verification and approval status
    @NotBlank(message = "Citizen ID is mandatory")
    private String citizenId;

    private boolean approvedByAdmin = false;

    // Additional metadata for processing
    private String rejectionReason; // Optional: In case of rejection, admin can provide a reason

    // Status indicating if the user is currently an active regular user
    private boolean status = true;
}