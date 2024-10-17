package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.UpdateCartRequest;
import fu.gr2.EcommerceProject.dto.response.ShoppingCartResponse;
import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.entity.ShoppingCart;
import fu.gr2.EcommerceProject.entity.ShoppingCartItem;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.repository.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ShoppingCartService {
    UserRepository userRepository;
    FlowerEventRelationshipRepository flowerEventRelationshipRepository;
    ShoppingCartRepository shoppingCartRepository;
    ShoppingCartItemRepository shoppingCartItemRepository;
    FlowerRepository flowerRepository;
    EventRepository eventRepository;
    public void addToCart(String userId,int flowerEventId){
        // Fetch the user, throw exception if not found
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        // Fetch the flower event relationship, throw exception if not found
        FlowerEventRelationship flower = flowerEventRelationshipRepository.findById(flowerEventId)
                .orElseThrow(() -> new AppException(ErrorCode.FLOWER_NOT_EXISTED));

        // Retrieve or create a shopping cart for the user
        ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
        if(shoppingCart==null){
            shoppingCart = ShoppingCart.builder()
                    .user(user)
                    .totalPrice(BigDecimal.ZERO)
                    .build();
            shoppingCartRepository.save(shoppingCart); // Save the new shopping cart
        }

        // Retrieve or create a shopping cart item for the flower
        ShoppingCartItem shoppingCartItem = shoppingCartItemRepository.findByShoppingCartAndFlowerEventRelationship(shoppingCart,flower);
        if(shoppingCartItem==null){
            shoppingCartItem = shoppingCartItem.builder()
                    .flowerEventRelationship(flower)
                    .shoppingCart(shoppingCart)
                    .quantity(1)
                    .build();
        }else{
            // Increment quantity if the item is already in the cart
            shoppingCartItem.setQuantity(shoppingCartItem.getQuantity()+1);
        }
        shoppingCart.setTotalPrice(shoppingCart.getTotalPrice().add(flower.getFloPrice()));
        shoppingCartItem.setItemPrice(flower.getFloPrice().multiply(BigDecimal.valueOf(shoppingCartItem.getQuantity())));
        // Save the shopping cart item
        shoppingCartItemRepository.save(shoppingCartItem);
    }

    public ApiResponse<List<ShoppingCartResponse>> getCart(String userId){
        // Fetch the user, throw exception if not found
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
        BigDecimal totalPrice = BigDecimal.ZERO;
        if(shoppingCart == null){
            shoppingCart = ShoppingCart.builder()
                    .user(user)
                    .totalPrice(totalPrice)
                    .build();
            shoppingCartRepository.save(shoppingCart);
        }

        List<ShoppingCartResponse> shoppingCartResponses = new ArrayList<>();
        List<ShoppingCartItem> shoppingCarts = shoppingCartItemRepository.findByShoppingCart(shoppingCart);
        for (ShoppingCartItem i: shoppingCarts){
                if(i.getFlowerEventRelationship().getEvent().getEndDate().isAfter(LocalDateTime.now())){
                    String flowerName = i.getFlowerEventRelationship().getFlower().getFlowerName();

                    ShoppingCartResponse shoppingCartResponse = ShoppingCartResponse.builder()
                            .item_id(i.getItem_id())
                            .flowerName(flowerName)
                            .quantity(i.getQuantity())
                            .item_price(i.getFlowerEventRelationship().getFloPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                            .build();
                    shoppingCartResponses.add(shoppingCartResponse);
                    totalPrice=totalPrice.add(shoppingCartResponse.getItem_price());
                }
        }
        System.out.println("total :"+totalPrice);
        shoppingCart.setTotalPrice(totalPrice);
        shoppingCartRepository.save(shoppingCart);
        return  ApiResponse.<List<ShoppingCartResponse>>builder()
                .result(shoppingCartResponses)
                .message("Total Price: "+shoppingCart.getTotalPrice().toString())
                .build();
    }

    @Transactional
    public void updateCart(String userId, List<UpdateCartRequest> updateCartRequests) {
        // Lấy người dùng từ repository hoặc ném ngoại lệ nếu không tồn tại
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Lấy giỏ hàng của người dùng
        ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
        if (shoppingCart == null) {
            throw new AppException(ErrorCode.CART_NOT_FOUND);
        }
        // Duyệt qua danh sách cập nhật từ người dùng
        for(UpdateCartRequest i : updateCartRequests){
            System.out.println("Quantity: "+i.getQuantity());
            System.out.println("item id: "+i.getItemId());
            ShoppingCartItem shoppingCartItem =  shoppingCartItemRepository.findById(i.getItemId()).orElseThrow(() -> new AppException(ErrorCode.ITEM_NOT_FOUND));
            shoppingCartItem.setQuantity(i.getQuantity());
            shoppingCartItemRepository.save(shoppingCartItem);
        }
    }
}
