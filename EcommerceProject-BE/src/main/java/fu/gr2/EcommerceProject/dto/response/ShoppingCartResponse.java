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
public class ShoppingCartResponse {
    int item_id;
    String flowerName;
    int quantity;
    BigDecimal item_price;
}
