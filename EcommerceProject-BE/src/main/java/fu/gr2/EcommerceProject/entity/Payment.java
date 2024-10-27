package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int paymentId;
    BigDecimal amount;
    String paymentStatus;  // e.g., SUCCESS, FAILED, PENDING
    LocalDateTime paymentDate;
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
