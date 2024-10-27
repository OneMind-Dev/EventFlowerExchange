package fu.gr2.EcommerceProject.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    String phone;
    String name;
    String address;
}
