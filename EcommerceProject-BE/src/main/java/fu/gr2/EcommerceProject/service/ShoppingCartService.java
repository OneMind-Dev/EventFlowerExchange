package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.response.ShoppingCartResponse;
import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.entity.ShoppingCart;
import fu.gr2.EcommerceProject.entity.ShoppingCartItem;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
        if(shoppingCart == null){
            shoppingCart = ShoppingCart.builder()
                    .user(user)
                    .totalPrice(BigDecimal.ZERO)
                    .build();
            shoppingCartRepository.save(shoppingCart);
        }
        List<ShoppingCartResponse> shoppingCartResponses = new ArrayList<>();
        List<ShoppingCartItem> shoppingCarts = shoppingCartItemRepository.findByShoppingCart(shoppingCart);
        for (ShoppingCartItem i: shoppingCarts){
                String flowerName = i.getFlowerEventRelationship().getFlower().getFlowerName();
                ShoppingCartResponse shoppingCartResponse = ShoppingCartResponse.builder()
                        .item_id(i.getItem_id())
                        .flowerName(flowerName)
                        .quantity(i.getQuantity())
                        .item_price(i.getItemPrice())
                        .build();
                shoppingCartResponses.add(shoppingCartResponse);
        }
        return  ApiResponse.<List<ShoppingCartResponse>>builder()
                .result(shoppingCartResponses)
                .message("Total Price: "+shoppingCart.getTotalPrice().toString())
                .build();
    }
}
