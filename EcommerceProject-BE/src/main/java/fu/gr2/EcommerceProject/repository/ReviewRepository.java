package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Review;
import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    // Use 'findByEvent' to refer to the Event object directly
    List<Review> findByEvent(Event event); // This method should match the entity definition

    List<Review> findByUser(User userId);
}