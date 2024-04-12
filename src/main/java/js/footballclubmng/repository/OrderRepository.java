package js.footballclubmng.repository;

import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByIdAndUserId(Long orderId,Long userId);

}
