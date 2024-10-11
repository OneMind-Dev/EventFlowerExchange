package fu.gr2.EcommerceProject.dto.request;

import lombok.Data;

@Data
public class FlowerUpdateRequest {
    private String flowerName;
    private String origin;
    private String color;
}