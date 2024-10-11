package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken,String> {
}