package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.response.PaymentResponse;
import fu.gr2.EcommerceProject.dto.response.ResponseObject;
import fu.gr2.EcommerceProject.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    @Autowired
    private VNPayService vnPayService;

    @GetMapping("/vn-pay")
    public ResponseObject<PaymentResponse> pay(HttpServletRequest request) {
        PaymentResponse paymentResponse = vnPayService.createVnPayPayment(request);
        if (paymentResponse != null) {
            return new ResponseObject<>(HttpStatus.OK, "Success", paymentResponse);
        }
        return new ResponseObject<>(HttpStatus.NOT_FOUND, "Not Found", null);
    }

    @GetMapping("/vn-pay-callback")
    public ResponseObject<PaymentResponse> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            return new ResponseObject<>(HttpStatus.OK, "Success", new PaymentResponse("00", "Success", ""));
        } else {
            return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Failed", null);
        }
    }
}
