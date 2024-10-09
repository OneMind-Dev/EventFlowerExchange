package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.RegistrationForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationFormRepository extends JpaRepository<RegistrationForm,Integer> {
}
