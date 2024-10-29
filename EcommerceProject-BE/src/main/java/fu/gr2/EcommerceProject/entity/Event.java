package fu.gr2.EcommerceProject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

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
   int eventId;
   @ManyToOne // Many events can belong to one category
   @JoinColumn(name = "category_id") // Ensure this column references the correct ID
   private EventCategory eventCategory; //
   String eventName;
   String description;
   @Column(name = "created_at")
   @CreationTimestamp
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