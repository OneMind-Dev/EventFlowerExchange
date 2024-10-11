package fu.gr2.EcommerceProject.entity;

import fu.gr2.EcommerceProject.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String user_id;
    //BE cần chuyển đổi gerateType thành IDENTITY để tự động tạo ra Id không bị trùng và thứ tự tăng dần
    // ngoài ra cần implement toàn bộ các đối tượng lưu dưới dạng Serializable vào Database

    @Column(unique = true, nullable = false)
    String username;

    @Column(nullable = false)
    String password;

    @Email(message = "Email is not valid", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @NotEmpty(message = "Email cannot be empty")
    String email;

    String phone;
    String address;
    String avatar;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    Set<Role> role;

    boolean status = true;

    @CreationTimestamp
    LocalDateTime createdAt;

}
