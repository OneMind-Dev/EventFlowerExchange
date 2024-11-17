package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.request.UpdateCartRequest;
import fu.gr2.EcommerceProject.dto.response.ShoppingCartItemResponse;
import fu.gr2.EcommerceProject.entity.ShoppingCart;
import fu.gr2.EcommerceProject.service.ShoppingCartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ShoppingCartController {
    ShoppingCartService shoppingCartService;

    @PostMapping("/addFlowerToCart/{userId}/{flowerEventId}")
    public ShoppingCartItemResponse addToCart(@PathVariable String userId, @PathVariable int flowerEventId){
        return shoppingCartService.addToCart(userId,flowerEventId);

    }
    @GetMapping("/GetCartItem/{userId}")
    public List<ShoppingCartItemResponse> getCartItem(@PathVariable String userId){
        return shoppingCartService.getCartItems(userId);
    }

    @GetMapping("/GetShoppingCart/{userId}")
    public ApiResponse<ShoppingCart> showCart(@PathVariable String userId){
        return shoppingCartService.getCart(userId);
    }

    @PostMapping("/updateCart/{userId}")
    public ApiResponse<ShoppingCart> updateCart(@PathVariable String userId, @RequestBody List<UpdateCartRequest> request){
        shoppingCartService.updateCart(userId,request);
        return shoppingCartService.getCart(userId);
    }

}
