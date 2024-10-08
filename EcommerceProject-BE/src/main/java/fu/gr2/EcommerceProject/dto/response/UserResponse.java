package fu.gr2.EcommerceProject.dto.response;

import fu.gr2.EcommerceProject.enums.Role;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
public class UserResponse {
    String user_id;
    String username;
    String email;
    String phone;
    String address;
    String avatar;
    Set<Role> role;
    boolean statusUser;
    LocalDateTime created_at;
}
