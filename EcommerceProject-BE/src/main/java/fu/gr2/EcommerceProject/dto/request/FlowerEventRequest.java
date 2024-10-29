package fu.gr2.EcommerceProject.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlowerEventRequest {
    String description;
    BigDecimal floPrice;
    String img;
    int quantity;
    int floId;
    int eventId;
}
