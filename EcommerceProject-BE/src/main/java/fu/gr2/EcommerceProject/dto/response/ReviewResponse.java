package fu.gr2.EcommerceProject.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Integer reviewID;
    private List<String> comments;
    private LocalDateTime createdAt;
    private Integer eventId; // Reference to Event ID
    private Integer userId;  // Reference to User ID
}