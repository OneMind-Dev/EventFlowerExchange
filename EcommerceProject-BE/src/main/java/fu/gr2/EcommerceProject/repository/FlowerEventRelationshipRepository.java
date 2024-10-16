package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Event;
import fu.gr2.EcommerceProject.entity.Flower;
import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlowerEventRelationshipRepository extends JpaRepository<FlowerEventRelationship,Integer> {
    boolean existsByEvent(Event event);
    boolean existsByFlower(Flower flower);
    Optional<FlowerEventRelationship>  findByFlowerAndEvent(Flower flower,Event event);
    List<FlowerEventRelationship> findByEvent(Event event);
    List<FlowerEventRelationship> findByEvent_EventId(int eventId);
}
