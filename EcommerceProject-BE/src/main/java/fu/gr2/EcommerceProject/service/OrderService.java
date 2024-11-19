package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.OrderRequest;
import fu.gr2.EcommerceProject.dto.response.OrderDetailResponse;
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
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class OrderService {
    FlowerEventRepository flowerEventRepository;
    ShoppingCartRepository shoppingCartRepository;
    ShoppingCartItemRepository shoppingCartItemRepository;
    OrderDetailRepository orderDetailRepository;
    OrderRepository orderRepository;
    UserRepository userRepository;
    EventRepository eventRepository;
     List<String> notifications;
    @Transactional
    public ApiResponse<OrderResponse> createOrder(String userId, OrderRequest request) {
        if (request == null) {
            throw new AppException(ErrorCode.NO_INFO);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
        if (shoppingCart == null) {
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
        String successMessage = "Order placed successfully! Order ID: " + order.getOrderId();
        notifications.add(successMessage);

        List<OrderDetail> orderDetails = new ArrayList<>();
        List<ShoppingCartItem> shoppingCartItems = shoppingCartItemRepository.findByShoppingCart(shoppingCart);

        for (ShoppingCartItem item : shoppingCartItems) {
            FlowerEventRelationship flowerEventRelationship = item.getFlowerEventRelationship();

            // Validate stock availability
            if (flowerEventRelationship.getQuantity() < item.getQuantity()) {
                throw new IllegalArgumentException(
                        "Not enough stock for " + flowerEventRelationship.getFlower().getFlowerName()
                );
            }

            // Deduct stock and update relationship
            flowerEventRelationship.setQuantity(flowerEventRelationship.getQuantity() - item.getQuantity());
            flowerEventRepository.save(flowerEventRelationship);

            // Create order detail
            OrderDetail orderDetail = OrderDetail.builder()
                    .quantity(item.getQuantity())
                    .price(item.getItemPrice())
                    .flowerEventRelationship(flowerEventRelationship)
                    .order(order)
                    .build();
            orderDetails.add(orderDetail);
        }

        // Save all order details in batch
        orderDetailRepository.saveAll(orderDetails);

        // Clear shopping cart
        shoppingCartItemRepository.deleteByShoppingCart(shoppingCart);

        // Build the response
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
                .message(successMessage)
                .notifications(notifications)
                .build();
    }

    public List<OrderResponse> GetAllOrder(){
        List<Order> oL = orderRepository.findAll();
        List<OrderResponse> oRL = new ArrayList<>();
        if(oL==null){
            throw new AppException(ErrorCode.NO_ORDER);
        }
        for(Order order: oL){
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
            oRL.add(orderResponse);
        }
        return oRL;
    }
    public ApiResponse<List<OrderResponse>> getOrder(String userId){
        List<Order> orders = orderRepository.findByUser_userId(userId);
        if(orders==null){
            throw new AppException(ErrorCode.NO_ORDER);
        }
        List<OrderResponse> orderResponses = new ArrayList<>();
        for(Order order: orders){
            if(Duration.between(order.getOrderDate(), LocalDateTime.now()).toMinutes() >= 15 && !order.getOrderStatus().equalsIgnoreCase("SUCCESS")){
                order.setOrderStatus("FAILED");
            }
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
            orderResponses.add(orderResponse);
        }
        return ApiResponse.<List<OrderResponse>>builder()
                .result(orderResponses)
                .build();
    }
    public OrderResponse OrderCash(Integer orderId){
        Order o = orderRepository.findById(orderId).get();
        o.setOrderStatus("SUCCESS");
        o.setMethod("CASH");
        orderRepository.save(o);
        OrderResponse or = OrderResponse.builder()
                .orderStatus(o.getOrderStatus())
                .orderId(o.getOrderId())
                .totalPrice(o.getTotalPrice())
                .orderDate(o.getOrderDate())
                .address(o.getAddress())
                .phone(o.getPhone())
                .method(o.getMethod())
                .name(o.getName())
                .build();
        return or;
    }
    public List<OrderDetailResponse> GetOrderDetail(Integer orderId){
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder_OrderId(orderId);
        List<OrderDetailResponse> orL = new ArrayList<>();
        for(OrderDetail od: orderDetails ){
            OrderDetailResponse or = OrderDetailResponse.builder()
                    .orderDetailId(od.getOrderDetailId())
                    .eventId(od.getFlowerEventRelationship().getEvent().getEventId())
                    .eventName(od.getFlowerEventRelationship().getEvent().getEventName())
                    .flowerId(od.getFlowerEventRelationship().getFlower().getFlowerId())
                    .flowerName(od.getFlowerEventRelationship().getFlower().getFlowerName())
                    .orderId(od.getOrder().getOrderId())
                    .quantity(od.getQuantity())
                    .price(od.getPrice())
                    .build();
            orL.add(or);
        }
        return orL;
    }

//    public ApiResponse<List<OrderResponse>> sellerGetOrder(String userId){
//        List<Event> events = eventRepository.findByUser_userId(userId);
//
//    }

}
