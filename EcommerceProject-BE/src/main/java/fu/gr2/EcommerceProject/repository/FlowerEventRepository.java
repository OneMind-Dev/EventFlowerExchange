package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlowerEventRepository  extends JpaRepository<FlowerEventRelationship, Integer> {
    public List<FlowerEventRelationship> findByEvent_EventId(UUID eventId);

}
