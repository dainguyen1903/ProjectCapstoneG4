package js.footballclubmng.repository;

import js.footballclubmng.entity.Cart;
import js.footballclubmng.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser(User user);
}
