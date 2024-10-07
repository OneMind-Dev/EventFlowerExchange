package fu.gr2.EcommerceProject.dto.response;

import fu.gr2.EcommerceProject.enums.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class AuthenticationResponse {
    String token;
    boolean authenticated;
    String username;
    String email;
    String phone;
    String address;
    Set<String> role;
}
