package js.footballclubmng.repository;

import js.footballclubmng.entity.Order;
import js.footballclubmng.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByOrderByOrderDateDesc();

    Order findByIdAndUserId(Long orderId,Long userId);

    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);

    @Query(value = "SELECT * FROM orders o JOIN shipping s ON o.shipping_id = s.shipping_id WHERE s.shipper_id = ?1", nativeQuery = true)
    List<Order> listOrderByShipper(Long shipperId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE orders o SET o.status = :status WHERE o.order_id = :orderId", nativeQuery = true)
    void updateOrderStatus(@Param("orderId") Long orderId, @Param("status") String status);

}
