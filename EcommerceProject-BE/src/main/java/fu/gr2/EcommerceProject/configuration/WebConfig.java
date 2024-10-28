package fu.gr2.EcommerceProject.configuration;

import fu.gr2.EcommerceProject.service.EventService;
import fu.gr2.EcommerceProject.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    UserService userService;
    EventService eventService;
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("file") MultipartFile file, @RequestParam String userId) {
        return saveUserAvatar(file, userId);
    }

    @PostMapping("/event-image")
    public ResponseEntity<String> uploadEventImage(@RequestParam("file") MultipartFile file, @RequestParam int eventId) {
        return saveEventImage(file, eventId);
    }

    private ResponseEntity<String> saveUserAvatar(MultipartFile file, String userId) {
        try {
            Path directory = Paths.get(uploadDir, "avatars");
            Files.createDirectories(directory);
            Path filePath = directory.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath);

            // Cập nhật đường dẫn avatar cho User
            userService.updateAvatar(userId, "/uploads/avatars/" + file.getOriginalFilename());

            return ResponseEntity.ok("Avatar đã được tải lên thành công!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi tải lên avatar: " + e.getMessage());
        }
    }

    private ResponseEntity<String> saveEventImage(MultipartFile file, int eventId) {
        try {
            Path directory = Paths.get(uploadDir, "events");
            Files.createDirectories(directory);
            Path filePath = directory.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath);

            // Cập nhật đường dẫn img cho Event
            eventService.updateImage(eventId, "/uploads/events/" + file.getOriginalFilename());

            return ResponseEntity.ok("Hình ảnh sự kiện đã được tải lên thành công!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi tải lên hình ảnh sự kiện: " + e.getMessage());
        }
    }
}
