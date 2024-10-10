package fu.gr2.EcommerceProject.dto.request;

import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.entity.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class EventCreationRequest {
    @NotEmpty
    UUID categoryId;
    @NotEmpty
    String eventName;
    @NotEmpty
    String description;
    LocalDateTime createdAt;
    String image;
    User user;
    LocalDateTime startDate;
    LocalDateTime endDate;
    List<FlowerEventRelationship> flowerEventRelationships;
}
