package fu.gr2.EcommerceProject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
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
   @Column(name = "created_at")
   LocalDateTime createdAt;
   String image;
   @ManyToOne
   @JoinColumn(name = "user_id")
   User user;
   LocalDateTime startDate;
   LocalDateTime endDate;
   @OneToMany(mappedBy = "event", cascade = {CascadeType.ALL}, orphanRemoval = true)
   @JsonManagedReference
   @JsonIgnore
       List<FlowerEventRelationship> flowerEventRelationships;
}