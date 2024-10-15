package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.entity.ShoppingCart;
import fu.gr2.EcommerceProject.entity.ShoppingCartItem;
import fu.gr2.EcommerceProject.entity.User;
import fu.gr2.EcommerceProject.exception.AppException;
import fu.gr2.EcommerceProject.exception.ErrorCode;
import fu.gr2.EcommerceProject.repository.FlowerEventRelationshipRepository;
import fu.gr2.EcommerceProject.repository.ShoppingCartItemRepository;
import fu.gr2.EcommerceProject.repository.ShoppingCartRepository;
import fu.gr2.EcommerceProject.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ShoppingCartService {
    UserRepository userRepository;
    FlowerEventRelationshipRepository flowerEventRelationshipRepository;
    ShoppingCartRepository shoppingCartRepository;
    ShoppingCartItemRepository shoppingCartItemRepository;
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
                    .build();
            shoppingCartRepository.save(shoppingCart); // Save the new shopping cart
        }

        // Retrieve or create a shopping cart item for the flower
        ShoppingCartItem shoppingCartItem = shoppingCartItemRepository.findByShoppingCartAndFlowerEventRelationship(shoppingCart,flower);
        if(shoppingCart==null){
            shoppingCartItem = shoppingCartItem.builder()
                    .flowerEventRelationship(flower)
                    .shoppingCart(shoppingCart)
                    .quantity(1)
                    .build();
        }else{
            // Increment quantity if the item is already in the cart
            shoppingCartItem.setQuantity(shoppingCartItem.getQuantity()+1);
        }
        // Save the shopping cart item
        shoppingCartItemRepository.save(shoppingCartItem);
    }
}
