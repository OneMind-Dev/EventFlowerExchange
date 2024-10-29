package fu.gr2.EcommerceProject.dto.response;

import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Getter
@Setter
public class RegistrationFormResponse {
    int id;
    boolean approved=false;
    String citizenId;
    String image;
    String rejectionReason;
    Role role;
    String username;
    String email;
    String phone;
}