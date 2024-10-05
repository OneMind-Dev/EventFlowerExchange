package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import fu.gr2.EcommerceProject.service.FlowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FlowerController {
    private final FlowerService flowerService;

    @GetMapping("/api/flowers")
    public ResponseEntity<List<FlowerResponse>> getAllFlowers(
            @RequestParam(required = false) String flowerName,
            @RequestParam(required = false) String color) {
        return ResponseEntity.ok(flowerService.getAllFlowers(flowerName, color));
    }
}