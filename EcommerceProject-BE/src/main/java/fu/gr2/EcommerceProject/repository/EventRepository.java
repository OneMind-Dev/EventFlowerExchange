package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByCategoryIdAndEventNameContaining(String categoryId, String eventName);
    List<Event> findByCategoryId(String categoryId);
    List<Event> findByEventNameContaining(String eventName);
}