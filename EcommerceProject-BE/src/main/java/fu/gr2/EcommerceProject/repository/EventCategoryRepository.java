package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.EventCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EventCategoryRepository extends JpaRepository<EventCategory, UUID> {
}
