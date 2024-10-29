package fu.gr2.EcommerceProject.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class FlowerEventResponse {
    Integer relationshipID;
    String eventname;

    String flowername;
    String origin;
    String color;

    int quantity;

    String description;

    BigDecimal floPrice;

    LocalDate createdAt;

    String image;
}
