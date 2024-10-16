package fu.gr2.EcommerceProject.dto.response;

import fu.gr2.EcommerceProject.enums.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Getter
@Setter
public class UserResponse {
    private String userId;
    String username;
    String email;
    String phone;
    String address;
    String avatar;
    Set<String> role;
    boolean status;
    LocalDateTime created_at;
}
