package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Flower")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Flower {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "flower_id")
    Integer  flowerId;
    @Column(name = "flower_name")
     String flowerName;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
     String origin;
     String color;
    @OneToMany(mappedBy = "flower", cascade = {CascadeType.ALL}, orphanRemoval = true)
     List<FlowerEventRelationship> flowerEventRelationships;
}