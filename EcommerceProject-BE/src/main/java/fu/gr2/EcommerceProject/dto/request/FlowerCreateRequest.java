package fu.gr2.EcommerceProject.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class FlowerCreateRequest {
    @NotEmpty(message = "Flower name is required")
    private String flowerName;
    @NotEmpty(message = "User ID is required")
    private String userId;
    private String origin;
    private String color;
}