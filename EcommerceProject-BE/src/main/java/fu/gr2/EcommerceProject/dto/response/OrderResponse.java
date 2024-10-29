package fu.gr2.EcommerceProject.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Getter
@Setter
public class OrderResponse {
    int orderId;
    String method;
    BigDecimal totalPrice;

    LocalDateTime orderDate;

    String orderStatus;
    String phone;
    String name;
    String address;
}
