package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Flower {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID flowerId;
    String flowerName;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    String origin;
    String color;
}