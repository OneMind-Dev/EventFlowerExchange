package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.FlowerCreateRequest;
import fu.gr2.EcommerceProject.dto.request.FlowerUpdateRequest;
import fu.gr2.EcommerceProject.dto.response.FlowerResponse;
import fu.gr2.EcommerceProject.service.FlowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FlowerController {
    private final FlowerService flowerService;

    @GetMapping("/Getflowers")
    public ResponseEntity<List<FlowerResponse>> getAllFlowers(
            @RequestParam(required = false) String flowerName,
            @RequestParam(required = false) String color) {
        return ResponseEntity.ok(flowerService.getAllFlowers(flowerName, color));
    }

    @PostMapping("/CreateFlower")
    public ResponseEntity<FlowerResponse> createFlower(@RequestBody FlowerCreateRequest request) {
        FlowerResponse flowerResponse = flowerService.createFlower(request);
        return new ResponseEntity<>(flowerResponse, HttpStatus.CREATED);
    }

    @PutMapping("/UpdateFlower/{flowerId}")
    public ResponseEntity<FlowerResponse> updateFlower(
            @PathVariable Integer flowerId,
            @RequestBody FlowerUpdateRequest request) {
        FlowerResponse updatedFlower = flowerService.updateFlower(flowerId, request);
        return ResponseEntity.ok(updatedFlower); // Return the updated flower
    }

    @DeleteMapping("/DeleteFlower/{flowerId}")
    public ResponseEntity<Void> deleteFlower(@PathVariable("flowerId") Integer flowerId) {
        flowerService.deleteFlower(flowerId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @GetMapping("/GetFlower/{flowerId}")
    public ResponseEntity<FlowerResponse> getFlower(@PathVariable("flowerId") Integer flowerId) {
        FlowerResponse flowerResponse = flowerService.getFlowerById(flowerId);
        return ResponseEntity.ok(flowerResponse);
    }
}