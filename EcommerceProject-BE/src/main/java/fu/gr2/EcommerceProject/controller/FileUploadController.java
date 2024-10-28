package fu.gr2.EcommerceProject.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FileUploadController {
    @PostMapping("/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        // Xử lý ảnh đại diện ở đây
        return ResponseEntity.ok("Ảnh đại diện đã được tải lên thành công!");
    }

    @PostMapping("/product-image")
    public ResponseEntity<String> uploadProductImage(@RequestParam("file") MultipartFile file) {
        // Xử lý ảnh sản phẩm ở đây
        return ResponseEntity.ok("Ảnh sản phẩm đã được tải lên thành công!");
    }
}
