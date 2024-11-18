package fu.gr2.EcommerceProject.dto.response;

import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.entity.Order;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class OrderDetailResponse {
    int orderDetailId;
    int orderId;
    int eventId;
    String eventName;
    int flowerId;
    String flowerName;
    int quantity;
    BigDecimal price;
}
