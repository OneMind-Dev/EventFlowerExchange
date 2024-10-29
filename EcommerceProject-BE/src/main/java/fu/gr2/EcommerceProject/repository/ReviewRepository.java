package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Review;
import fu.gr2.EcommerceProject.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {


    List<Review> findByEvent(Event event);
   // List<Review> findByUser(User user);
}