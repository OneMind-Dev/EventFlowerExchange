package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Flower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FlowerRepository extends JpaRepository<Flower, UUID> {
}