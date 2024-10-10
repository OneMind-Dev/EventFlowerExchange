package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findByCategoryIdAndEventNameContaining(UUID categoryId, String eventName);
    List<Event> findByCategoryId(UUID categoryId);
    List<Event> findByEventNameContaining(String eventName);
}