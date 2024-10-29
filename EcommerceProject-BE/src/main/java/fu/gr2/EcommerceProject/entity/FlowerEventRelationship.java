package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Flower_Event_Relationship")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class FlowerEventRelationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "R_Id")
    Integer relationshipID;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    Event event;

    @ManyToOne
    @JoinColumn(name = "flower_id", nullable = false)
    Flower flower;

    @Column(name = "quantity")
    int quantity;

    @Column(name = "description")
    String description;

    @Column(name = "flower_price")
    BigDecimal floPrice;


    @Column(name = "created_at")
    LocalDate createdAt=getCreatedAt();

    @Column(name = "image")
    String image;
}