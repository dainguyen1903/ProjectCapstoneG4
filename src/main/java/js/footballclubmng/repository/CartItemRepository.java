package js.footballclubmng.repository;

import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.CartItem;
import js.footballclubmng.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByProductAndCartAndSizeAndPlayerNumberAndPlayerName(Product product, Cart cart, String size, Integer playerNumber, String playerName);


    List<CartItem> findAllByCart(Cart cart);

    List<CartItem> findAllByCartAndSizeAndProduct(Cart cart, String size, Product product);

}
