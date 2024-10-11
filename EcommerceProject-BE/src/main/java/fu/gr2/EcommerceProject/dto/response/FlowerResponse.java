package fu.gr2.EcommerceProject.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FlowerResponse {
    private Integer flowerId;
    private String flowerName;
    private String userId;
    private String origin;
    private String color;
}