package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.configuration.VNPAYConfig;
import fu.gr2.EcommerceProject.dto.response.PaymentResponse;
import fu.gr2.EcommerceProject.entity.Payment;
import fu.gr2.EcommerceProject.entity.Order;
import fu.gr2.EcommerceProject.repository.OrderRepository;
import fu.gr2.EcommerceProject.repository.PaymentRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.http.ConcurrentDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class VNPayService {
    @Autowired
    private PaymentRepository repository;
    public static String hmacSHA512(final String key, final String data) {
        try {
            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

    public static String getIpAddress(HttpServletRequest request) {
        String ipAdress;
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        return ipAdress;
    }

    public String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public static String getPaymentURL(Map<String, String> paramsMap, boolean encodeKey) {
        return paramsMap.entrySet().stream()
                .filter(entry -> entry.getValue() != null && !entry.getValue().isEmpty())
                .sorted(Map.Entry.comparingByKey())
                .map(entry ->
                        (encodeKey ? URLEncoder.encode(entry.getKey(),
                                StandardCharsets.US_ASCII)
                                : entry.getKey()) + "=" +
                                URLEncoder.encode(entry.getValue()
                                        , StandardCharsets.US_ASCII))
                .collect(Collectors.joining("&"));
    }
    private final VNPAYConfig vnpayConfig;

    @Autowired
    public VNPayService(VNPAYConfig vnpayConfig) {
        this.vnpayConfig = vnpayConfig;
    }

    public PaymentResponse createVnPayPayment(String orderId, HttpServletRequest request) {
        Payment payment = new Payment();
        BigDecimal AM = BigDecimal.valueOf(Double.valueOf(request.getParameter("amount")));
        payment.setAmount(AM.multiply(BigDecimal.valueOf(100)));
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentStatus("PENDING");
        payment.setOrder(orderRepository.findById(Integer.parseInt(orderId)).get());
        int pid = repository.save(payment).getPaymentId();
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnpayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", getIpAddress(request));
        //build query url
        String queryUrl = getPaymentURL(vnpParamsMap, true);
        String hashData = getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = hmacSHA512(vnpayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnpayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return PaymentResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }
    @Autowired
    OrderRepository orderRepository;

    public void savePayment(int s){
        Payment payment = repository.findTopByOrderByPaymentIdDesc();
        Order o = orderRepository.findById(payment.getOrder().getOrderId()).get();
         if(s==1){
             o.setOrderStatus("SUCESS");
             payment.setPaymentStatus("SUCCESS");

         }
         else {
             o.setOrderStatus("FAILED");

             payment.setPaymentStatus("FAILED");
         }
         orderRepository.save(o);
         repository.save(payment);
    }
}
