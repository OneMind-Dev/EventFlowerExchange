package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

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
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "event_id")
    Integer eventId;
   @Column(name = "category_id")
   String categoryId;
   String eventName;
   String description;
   @CreationTimestamp
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