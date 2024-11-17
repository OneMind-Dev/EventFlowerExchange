package fu.gr2.EcommerceProject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

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
    private int item_id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private ShoppingCart shoppingCart;

    @OneToOne
    @JoinColumn(name = "e_id")
    @JsonIgnore
    private FlowerEventRelationship flowerEventRelationship;

    private int quantity;
    private BigDecimal itemPrice;

    // Custom getter to return only the ID
    @JsonProperty("relationshipID")
    public int getFlowerEventRelationshipId() {
        return flowerEventRelationship.getRelationshipID();
    }
}


