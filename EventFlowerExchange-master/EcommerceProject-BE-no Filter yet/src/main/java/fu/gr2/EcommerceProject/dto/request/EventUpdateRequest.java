package fu.gr2.EcommerceProject.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class EventUpdateRequest {
    @NotBlank(message = "Event name cannot be blank")
    String eventName;
    String description;
    @FutureOrPresent(message = "Start date must be in the present or future")
    LocalDateTime startDate;
    @Future(message = "End date must be in the future")
    LocalDateTime endDate;
    String image;
}