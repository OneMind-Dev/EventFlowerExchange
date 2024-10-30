package fu.gr2.EcommerceProject.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventUpdateRequest {

    private Integer categoryId;
    private String eventName;
    private String description;
    private String image;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}