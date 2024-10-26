package fu.gr2.EcommerceProject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetail {
    @Id
    @Column (name = "eventdetail_id")
    @GeneratedValue (strategy = GenerationType.AUTO)
    UUID eventDetailId;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "flower_id") // This will create the foreign key in the order_detail table
    private Flower flower;  // A single flower associated with this order detail
}
