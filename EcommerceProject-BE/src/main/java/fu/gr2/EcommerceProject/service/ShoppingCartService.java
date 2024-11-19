package fu.gr2.EcommerceProject.service;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.UpdateCartRequest;
import fu.gr2.EcommerceProject.dto.response.ShoppingCartItemResponse;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShoppingCartService {
        UserRepository userRepository;
        FlowerEventRelationshipRepository flowerEventRelationshipRepository;
        ShoppingCartRepository shoppingCartRepository;
        ShoppingCartItemRepository shoppingCartItemRepository;
        FlowerRepository flowerRepository;
        EventRepository eventRepository;

        public ShoppingCartItemResponse addToCart(String userId, int flowerEventId) {
                // Fetch the user, throw exception if not found
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
                // Fetch the flower event relationship, throw exception if not found
                FlowerEventRelationship flower = flowerEventRelationshipRepository.findById(flowerEventId)
                                .orElseThrow(() -> new AppException(ErrorCode.FLOWER_NOT_EXISTED));

                // Retrieve or create a shopping cart for the user
                ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
                if (shoppingCart == null) {
                        shoppingCart = ShoppingCart.builder()
                                        .user(user)
                                        .totalPrice(BigDecimal.ZERO)
                                        .build();
                        shoppingCartRepository.save(shoppingCart); // Save the new shopping cart
                }

                // Retrieve or create a shopping cart item for the flower
                ShoppingCartItem shoppingCartItem = shoppingCartItemRepository
                                .findByShoppingCartAndFlowerEventRelationship(shoppingCart, flower);
                if (shoppingCartItem == null) {
                        shoppingCartItem = shoppingCartItem.builder()
                                        .flowerEventRelationship(flower)
                                        .shoppingCart(shoppingCart)
                                        .quantity(1)
                                        .build();
                } else {
                        // Increment quantity if the item is already in the cart
                        shoppingCartItem.setQuantity(shoppingCartItem.getQuantity() + 1);
                }
                shoppingCart.setTotalPrice(shoppingCart.getTotalPrice().add(flower.getFloPrice()));
                shoppingCartItem.setItemPrice(
                                flower.getFloPrice().multiply(BigDecimal.valueOf(shoppingCartItem.getQuantity())));
                // Save the shopping cart item
                shoppingCartItemRepository.save(shoppingCartItem);
                return ShoppingCartItemResponse.builder()
                                .item_id(shoppingCartItem.getItem_id())
                                .flowerName(flower.getFlower().getFlowerName())
                                .quantity(shoppingCartItem.getQuantity())
                                .item_price(shoppingCartItem.getItemPrice())
                                .build();
        }

        public ApiResponse<ShoppingCart> getCart(String userId) {
                // Fetch the user, throw exception if not found
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

                // Retrieve or create a shopping cart
                ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
                BigDecimal totalPrice = BigDecimal.ZERO;

                if (shoppingCart == null) {
                        shoppingCart = ShoppingCart.builder()
                                        .user(user)
                                        .totalPrice(totalPrice)
                                        .build();
                        shoppingCartRepository.save(shoppingCart);
                }

                // Process cart items to calculate total price
                List<ShoppingCartItem> shoppingCartItems = shoppingCartItemRepository.findByShoppingCart(shoppingCart);

                for (ShoppingCartItem item : shoppingCartItems) {

                        BigDecimal itemPrice = item.getFlowerEventRelationship().getFloPrice()
                                        .multiply(BigDecimal.valueOf(item.getQuantity()));
                        totalPrice = totalPrice.add(itemPrice);

                }

                // Update and save total price in the shopping cart
                shoppingCart.setTotalPrice(totalPrice);
                shoppingCartRepository.save(shoppingCart);

                // Return only the ShoppingCart entity
                return ApiResponse.<ShoppingCart>builder()
                                .result(shoppingCart)
                                .message("Shopping cart retrieved successfully.")
                                .build();
        }

        public List<ShoppingCartItemResponse> getCartItems(String userId) {
                ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
                if (shoppingCart == null) {
                        throw new AppException(ErrorCode.CART_NOT_FOUND);
                }

                List<ShoppingCartItem> shoppingCartItems = shoppingCartItemRepository.findByShoppingCart(shoppingCart);

                return shoppingCartItems.stream()
                                .map(item -> new ShoppingCartItemResponse(
                                                item.getItem_id(),
                                                item.getFlowerEventRelationship().getFlower().getFlowerName(),
                                                item.getFlowerEventRelationship().getImage(),
                                                item.getQuantity(),
                                                item.getItemPrice()))
                                .toList();
        }

        @Transactional
        public void updateCart(String userId, List<UpdateCartRequest> updateCartRequests) {
                // Validate user existence
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

                // Get user's shopping cart
                ShoppingCart shoppingCart = shoppingCartRepository.findByUser_userId(userId);
                if (shoppingCart == null) {
                        throw new AppException(ErrorCode.CART_NOT_FOUND);
                }

                // Iterate through the update requests
                for (UpdateCartRequest i : updateCartRequests) {
                        System.out.println("Quantity: " + i.getQuantity());
                        System.out.println("Item ID: " + i.getItemId());

                        // Fetch the shopping cart item or throw exception if not found
                        ShoppingCartItem shoppingCartItem = shoppingCartItemRepository.findById(i.getItemId())
                                        .orElseThrow(() -> new AppException(ErrorCode.ITEM_NOT_FOUND));

                        // If the quantity is 0, remove the item
                        if (i.getQuantity() == 0) {
                                shoppingCartItemRepository.delete(shoppingCartItem);
                                System.out.println("Item ID " + i.getItemId() + " removed from the cart.");
                        } else {
                                // Otherwise, update the quantity
                                shoppingCartItem.setQuantity(i.getQuantity());

                                // Recalculate item price based on the new quantity
                                shoppingCartItem.setItemPrice(
                                                shoppingCartItem.getFlowerEventRelationship().getFloPrice()
                                                                .multiply(BigDecimal.valueOf(i.getQuantity())));

                                // Save the updated shopping cart item
                                shoppingCartItemRepository.save(shoppingCartItem);
                        }
                }

                // Recalculate the total price of the cart
                BigDecimal updatedTotalPrice = shoppingCartItemRepository.findByShoppingCart(shoppingCart).stream()
                                .map(ShoppingCartItem::getItemPrice)
                                .reduce(BigDecimal.ZERO, BigDecimal::add);

                shoppingCart.setTotalPrice(updatedTotalPrice);
                shoppingCartRepository.save(shoppingCart);

                System.out.println("Updated cart total price: " + updatedTotalPrice);
        }

}
