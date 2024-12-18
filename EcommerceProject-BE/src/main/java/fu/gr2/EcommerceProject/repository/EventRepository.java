package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByEventCategory_CategoryIdAndEventName(Integer categoryId, String eventName);
    List<Event> findByEventCategory_CategoryId(Integer categoryId);
    List<Event> findByEventNameContaining(String eventName);
    List<Event> findByUser_userId(String userId);

}