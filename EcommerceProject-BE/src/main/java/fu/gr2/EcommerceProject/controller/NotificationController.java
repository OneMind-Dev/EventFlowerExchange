package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.response.NotificationResponse;
import fu.gr2.EcommerceProject.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/{userId}")
    public ApiResponse<List<NotificationResponse>> getNotifications(@PathVariable String userId) {
        List<NotificationResponse> notifications = notificationService.getUserNotifications(userId);
        return ApiResponse.<List<NotificationResponse>>builder()
                .result(notifications)
                .build();
    }

    @PutMapping("/markAsRead/{notificationId}")
    public ResponseEntity<ApiResponse<Void>> markNotificationAsRead(@PathVariable Integer notificationId) {
        ApiResponse<Void> response = notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(@PathVariable Integer notificationId) {
        ApiResponse<Void> response = notificationService.deleteNotification(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/markAllRead/{userId}")
    public ResponseEntity<ApiResponse<Void>> markAllNotificationsAsRead(@PathVariable String userId) {
        ApiResponse<Void> response = notificationService.markAllNotificationsAsRead(userId);
        return ResponseEntity.ok(response);
    }
}