package fu.gr2.EcommerceProject.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventCreateRequest {
    private String categoryId;
    private String eventName;
    private String description;
    private LocalDateTime createdAt;
    private String image;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String userId;
}
