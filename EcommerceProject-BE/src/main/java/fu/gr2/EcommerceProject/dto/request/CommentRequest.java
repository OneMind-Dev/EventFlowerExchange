package fu.gr2.EcommerceProject.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    @Size(max = 500, message = "Comment cannot exceed 1000 characters")
    @NotEmpty(message = "Comment cannot be empty")
    private String comment;

    @NotNull(message = "User ID cannot be null")
    private String userId;
}