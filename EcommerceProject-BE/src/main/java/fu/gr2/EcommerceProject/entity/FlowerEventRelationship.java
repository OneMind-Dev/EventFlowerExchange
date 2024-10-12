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
    @Column(name = "e_id")
    int eId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    Event event;

    @ManyToOne
    @JoinColumn(name = "flower_id")
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