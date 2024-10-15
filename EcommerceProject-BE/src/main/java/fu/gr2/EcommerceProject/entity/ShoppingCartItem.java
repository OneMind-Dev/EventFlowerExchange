package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ShoppingCartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int item_id;
    @ManyToOne
    @JoinColumn(name="cart_id")
    ShoppingCart shoppingCart;
    @OneToOne
    @JoinColumn(name = "e_id")
    FlowerEventRelationship flowerEventRelationship;
    int quantity;
}
