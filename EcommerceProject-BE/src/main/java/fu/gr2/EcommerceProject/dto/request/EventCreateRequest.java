package fu.gr2.EcommerceProject.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Data
public class EventCreateRequest {

    private String categoryId;
    @NotEmpty
    @Size(max = 500, message = "Comment cannot exceed 500 characters")
    private String eventName;
    @NotEmpty
    private String description;
    private LocalDateTime createdAt;
    private String image;
    @NotEmpty @NotEmpty(message = "Year/Month/date Time")
    private LocalDateTime startDate;
    @NotEmpty(message = "Year/Month/date Time")
    private LocalDateTime endDate;

    private String userId;
}
