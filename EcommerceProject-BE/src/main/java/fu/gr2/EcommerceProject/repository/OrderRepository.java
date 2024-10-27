package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findByUser_userId(String userId);
}
