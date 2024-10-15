package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.dto.response.ShoppingCartResponse;
import fu.gr2.EcommerceProject.service.ShoppingCartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ShoppingCartController {
    ShoppingCartService shoppingCartService;

    @PostMapping("/addFlowerToCart/{userId}/{flowerEventId}")
    public ApiResponse addToCart(@PathVariable String userId, @PathVariable int flowerEventId){
        shoppingCartService.addToCart(userId,flowerEventId);
        return ApiResponse.builder()
                .message("Đã thêm vào giỏ hàng thành công")
                .build();
    }

    @GetMapping("/GetShoppingCart/{userId}")
    public ApiResponse<List<ShoppingCartResponse>> showCart(@PathVariable String userId){
        return shoppingCartService.getCart(userId);
    }

}
