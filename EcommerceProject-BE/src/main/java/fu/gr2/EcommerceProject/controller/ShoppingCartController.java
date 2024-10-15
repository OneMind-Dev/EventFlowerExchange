package fu.gr2.EcommerceProject.controller;

import fu.gr2.EcommerceProject.dto.request.ApiResponse;
import fu.gr2.EcommerceProject.service.ShoppingCartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class ShoppingCartController {
    ShoppingCartService shoppingCartService;

    @PostMapping("/addFlowerToCart/{userId}/{flowerEventId}")
    public void addToCart(@PathVariable String userId,@PathVariable int flowerEventId){
        shoppingCartService.addToCart(userId,flowerEventId);
    }

}
