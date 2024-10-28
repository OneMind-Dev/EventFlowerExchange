package fu.gr2.EcommerceProject.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
public class UserUpdateRequest {
    String phone;
    String address;
    String avatar;
}
