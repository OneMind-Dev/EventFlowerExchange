package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Event")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Event {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "event_id")
   UUID eventId;
   @Column(name = "category_id")
   String categoryId;
   String eventName;
   String description;
   @Column(name = "created_at")
   LocalDateTime createdAt;
   String image;
   @ManyToOne
   @JoinColumn(name = "user_id")
   User user;
   LocalDateTime startDate;
   LocalDateTime endDate;
   @OneToMany(mappedBy = "event", cascade = {CascadeType.ALL}, orphanRemoval = true)
       List<FlowerEventRelationship> flowerEventRelationships;
}