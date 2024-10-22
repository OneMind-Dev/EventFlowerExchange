package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.OrderRequest;
import fu.gr2.EcommerceProject.dto.response.OrderResponse;
import fu.gr2.EcommerceProject.entity.*;
import fu.gr2.EcommerceProject.enums.Status;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.repository.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class OrderService {
    ShoppingCartRepository shoppingCartRepository;
    ShoppingCartItemRepository shoppingCartItemRepository;
    OrderDetailRepository orderDetailRepository;
    OrderRepository orderRepository;
    UserRepository userRepository;

    @Transactional
    public ApiResponse<OrderResponse> createOrder(String userId, OrderRequest request){
        if(request == null){
            throw new AppException(ErrorCode.NO_INFO);
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
        if(shoppingCart==null){
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }
        if (shoppingCart.getTotalPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new AppException(ErrorCode.EMPTY_CART);
        }
        Order order = Order.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .method("Shipcode")
                .orderStatus(Status.PENDING.toString())
                .orderDate(LocalDateTime.now())
                .user(user)
                .totalPrice(shoppingCart.getTotalPrice())
                .build();
        orderRepository.save(order);
        List<OrderDetail> orderDetails= new ArrayList<>();
        List<ShoppingCartItem> shoppingCartItems=shoppingCartItemRepository.findByShoppingCart(shoppingCart);
        for(ShoppingCartItem i: shoppingCartItems){
            OrderDetail orderDetail=new OrderDetail().builder()
                    .quantity(i.getQuantity())
                    .price(i.getItemPrice())
                    .flowerEventRelationship(i.getFlowerEventRelationship())
                    .order(order)
                    .build();
            orderDetailRepository.save(orderDetail);
        }
        shoppingCartItemRepository.deleteByShoppingCart(shoppingCart);

        OrderResponse orderResponse = OrderResponse.builder()
                .orderId(order.getOrderId())
                .method(order.getMethod())
                .orderDate(order.getOrderDate())
                .orderStatus(order.getOrderStatus())
                .totalPrice(order.getTotalPrice())
                .address(order.getAddress())
                .name(order.getName())
                .phone(order.getPhone())
                .build();

        return ApiResponse.<OrderResponse>builder()
                .result(orderResponse)
                .build();
    }
}
