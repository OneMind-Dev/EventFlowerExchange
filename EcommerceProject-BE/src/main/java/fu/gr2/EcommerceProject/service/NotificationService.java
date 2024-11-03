package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.response.NotificationResponse;
import fu.gr2.EcommerceProject.entity.Notification;
import fu.gr2.EcommerceProject.enums.NotificationStatus;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;


    public ApiResponse<Void> markAllNotificationsAsRead(String userId) {
        // Fetch unread notifications for the user
        List<Notification> notifications = notificationRepository.findByUser_UserIdAndStatus(userId, NotificationStatus.UNREAD);

        // Update status to READ
        if (!notifications.isEmpty()) {
            notifications.forEach(notification -> notification.setStatus(NotificationStatus.READ));
            notificationRepository.saveAll(notifications); // Batch save
        }

        return ApiResponse.<Void>builder()
                .result(null)
                .message("All notifications marked as read.")
                .build();
    }

    public ApiResponse<Void> markNotificationAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_NOT_EXISTED));

        notification.setStatus(NotificationStatus.READ);
        notificationRepository.save(notification);

        return ApiResponse.<Void>builder().result(null).build();
    }

    public List<NotificationResponse> getUserNotifications(String userId) {
        List<Notification> notifications = notificationRepository.findByUser_UserId(userId); // Fetch all notifications

        return notifications.stream()
                .map(notification -> NotificationResponse.builder()
                        .message(notification.getMessage())
                        .status(notification.getStatus().toString())
                        .build())
                .collect(Collectors.toList());
    }

    public ApiResponse<Void> deleteNotification(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_NOT_EXISTED));

        // Check if the notification status is READ before deleting
        if (notification.getStatus() != NotificationStatus.READ) {
            throw new AppException(ErrorCode.READ_NOTIFICATION);
        }

        notificationRepository.delete(notification);
        return ApiResponse.<Void>builder().result(null).build();
    }
}