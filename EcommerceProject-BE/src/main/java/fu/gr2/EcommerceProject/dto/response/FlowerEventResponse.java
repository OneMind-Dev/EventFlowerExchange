package fu.gr2.EcommerceProject.dto.response;

import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.Flower;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
