package fu.gr2.EcommerceProject.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserChangePasswordRequest {
    @Size(min = 8, message = "PASSWORD_INVALID, must has at least 8 characters")
    private String newPassword;
    private String confirmedPassword;
}
