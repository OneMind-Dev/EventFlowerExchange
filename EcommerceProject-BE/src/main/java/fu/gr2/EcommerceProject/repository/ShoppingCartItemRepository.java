package fu.gr2.EcommerceProject.repository;

import fu.gr2.EcommerceProject.entity.FlowerEventRelationship;
import fu.gr2.EcommerceProject.entity.ShoppingCart;
import fu.gr2.EcommerceProject.entity.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem,Integer>{
    ShoppingCartItem findByShoppingCartAndFlowerEventRelationship(ShoppingCart shoppingCart, FlowerEventRelationship flowerEventRelationship);
    List<ShoppingCartItem> findByShoppingCart(ShoppingCart shoppingCart);
    void deleteByShoppingCart(ShoppingCart shoppingCart);
}
