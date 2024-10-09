package fu.gr2.EcommerceProject.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class EventResponse {
    private String eventId;
     private  String categoryId;
     private  String eventName;
     private String description;
     private LocalDateTime createdAt;
     private String image;
     private String userId;
     private LocalDateTime startDate;
     private  LocalDateTime endDate;
}