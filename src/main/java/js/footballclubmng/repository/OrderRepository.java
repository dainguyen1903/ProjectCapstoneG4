package js.footballclubmng.repository;

import js.footballclubmng.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT * FROM `order` o INNER JOIN users u ON o.user_id = u.user_id", nativeQuery = true)
    List<Order> listAllOrder();




}
