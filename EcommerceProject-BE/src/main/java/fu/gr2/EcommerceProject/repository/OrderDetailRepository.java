package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
    List<OrderDetail> findByOrder_OrderId(Integer orderId);
}
