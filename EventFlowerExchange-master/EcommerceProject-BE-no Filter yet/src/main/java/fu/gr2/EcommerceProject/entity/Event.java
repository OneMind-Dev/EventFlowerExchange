package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Event {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)

   UUID eventId;
   String categoryId;
   String eventName;
   String description;
   LocalDateTime createdAt;
   String image;

   @ManyToOne
   @JoinColumn(name = "user_id", nullable = false)
   User user;

   LocalDateTime startDate;
   LocalDateTime endDate;
}