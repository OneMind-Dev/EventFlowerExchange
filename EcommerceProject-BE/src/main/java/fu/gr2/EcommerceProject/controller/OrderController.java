package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.OrderRequest;
import fu.gr2.EcommerceProject.dto.response.OrderDetailResponse;
import fu.gr2.EcommerceProject.dto.response.OrderResponse;
import fu.gr2.EcommerceProject.entity.OrderDetail;
import fu.gr2.EcommerceProject.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequestMapping("/order")
public class OrderController {
    OrderService orderService;
    @PostMapping("/shipcode/{userId}")
    ApiResponse<OrderResponse> orderCreate(@PathVariable String userId, @RequestBody OrderRequest request){
        return orderService.createOrder(userId,request);
        //thêm message bên OrderService
    }

    @GetMapping("/{userId}")
    ApiResponse<List<OrderResponse>> getOrder(@PathVariable String userId){
        return orderService.getOrder(userId);
    }

    @GetMapping("/detail/{orderId}")
    List<OrderDetailResponse> getOrderDetail(@PathVariable Integer orderId){
        return orderService.GetOrderDetail(orderId);
    }
    @GetMapping("cash/{orderId}")
    OrderResponse OrderCash(@PathVariable Integer orderId){
        return orderService.OrderCash(orderId);
    }
//    @GetMapping("/seller/{userId}")
//    ApiResponse<List<OrderResponse>> sellerGetOrder(@PathVariable String userId){
//
//    }
}
