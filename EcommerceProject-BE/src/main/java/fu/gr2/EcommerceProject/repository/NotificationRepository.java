package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.Notification;
import fu.gr2.EcommerceProject.enums.NotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findByUser_UserId(String userId);
    List<Notification> findAllById(Iterable<Integer> ids);
    List<Notification> findByUser_UserIdAndStatus(String userId, NotificationStatus status);
}