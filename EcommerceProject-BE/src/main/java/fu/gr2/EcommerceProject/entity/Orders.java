package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table (name = "Orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column (name = "order_id")
    UUID orderId;
    @ManyToOne
    @JoinColumn (name = "user_id")
    User user;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
    @OneToOne
    @JoinColumn (name = "payment_id")
    Payment payment;
    @Column (name = "total_price")
    double totalPrice;
    @Column (name = "status")
    String status;
    @Column (name = "order_date")
    @CreationTimestamp
    LocalDateTime orderDate;
    @Column (name = "address_shipping")
    String addressShipping;
    @Column (name = "phone")
    @Pattern(regexp = "^\\d{9,12}$", message = "Phone number must be between 9 and 12 digits")
    String phone;
}
