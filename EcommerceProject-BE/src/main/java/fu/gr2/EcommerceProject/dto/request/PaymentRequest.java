package fu.gr2.EcommerceProject.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentRequest {
    private BigDecimal amount;  // Amount in VND, not in cents
    private String bankCode;    // Optional: can be set to NCB by default
}
