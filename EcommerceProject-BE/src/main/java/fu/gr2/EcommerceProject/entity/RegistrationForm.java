package fu.gr2.EcommerceProject.entity;

import fu.gr2.EcommerceProject.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RegistrationForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    boolean approved=false;
    @Column(nullable = false)
    String citizenId;
    String image;
    String rejectionReason;
    @Enumerated(EnumType.STRING)
    Role role;
    @ManyToOne
    @JoinColumn(name="user_id")
    User user;
}
