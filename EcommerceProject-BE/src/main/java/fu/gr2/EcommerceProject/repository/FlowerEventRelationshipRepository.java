package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerEventRelationshipRepository extends JpaRepository<FlowerEventRelationship,Integer> {
}
