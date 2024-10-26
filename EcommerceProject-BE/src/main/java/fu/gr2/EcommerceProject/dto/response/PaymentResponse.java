package fu.gr2.EcommerceProject.dto.response;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaymentResponse {
    public String code;
    public String message;
    public String paymentUrl;
}

