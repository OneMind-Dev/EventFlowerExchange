package fu.gr2.EcommerceProject.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventUpdateRequest {
    @NotBlank(message = "Category cannot be blank")
    private String categoryId;
    @NotBlank(message = "Event name cannot be blank")
    private String eventName;
    @NotBlank(message = "Category cannot be blank")
    private String description;
    @NotNull(message = "Creation date must not be null")
    private LocalDateTime createdAt;
    private String image;
    @NotNull(message = "Start date must not be null")
    private LocalDateTime startDate;
    @NotNull(message = "End date must not be null")
    private LocalDateTime endDate;
}