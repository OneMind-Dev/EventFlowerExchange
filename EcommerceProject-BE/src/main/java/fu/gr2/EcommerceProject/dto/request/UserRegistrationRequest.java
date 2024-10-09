package fu.gr2.EcommerceProject.dto.request;

import fu.gr2.EcommerceProject.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserRegistrationRequest {

    // Add fields for citizen identification verification and approval status
    @NotBlank(message = "Citizen ID is mandatory")
    private String citizenId;

    private boolean approved = false;

    // Additional metadata for processing
    private String rejectionReason; // Optional: In case of rejection, admin can provide a reason

    // Status indicating if the user is currently an active regular user
    private boolean status = true;
    private String image;
    private String role;
}