package fu.gr2.EcommerceProject.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Getter
@Setter
public class ShoppingCartItemResponse {
    int item_id;
    String flowerName;
    String image;
    int quantity;
    BigDecimal item_price;
}
