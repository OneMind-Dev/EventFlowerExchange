package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID PaymentId;
    @Column (name = "OrderType")
    private String vnp_OrderType;
    @Column (name = "Description")
    private String vnp_Description;

}
