package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Relationship")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class FlowerEventRelationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int eventId;

    int categoryId;
    String eventName;
    String description;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    String image;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    LocalDateTime startDate;
    LocalDateTime endDate;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    List<FlowerEventRelationship> flowerEventRelationships;
}