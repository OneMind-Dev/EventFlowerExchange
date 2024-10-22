package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.OrderRequest;
import fu.gr2.EcommerceProject.dto.response.OrderResponse;
import fu.gr2.EcommerceProject.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequestMapping("/order")
public class OrderController {
    OrderService orderService;
    @PostMapping("/shipcode/{userId}")
    ApiResponse<OrderResponse> orderCreate(@PathVariable String userId, @RequestBody OrderRequest request){
        return orderService.createOrder(userId,request);
    }

}
