package js.footballclubmng.repository;

import javax.persistence.Tuple;
import js.footballclubmng.entity.Order;
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

    @Query(value = "SELECT YEAR(o.order_date) AS order_year, MONTH(o.order_date) AS order_month, SUM(od.quantity) AS total_quantity\n" +
            "FROM orders o\n" +
            "JOIN order_detail od ON o.order_id = od.order_id\n" +
            "WHERE YEAR(o.order_date) = :year\n" +
            "  AND MONTH(o.order_date) = :month\n" +
            "  AND o.status = 'DELIVERED'\n" +
            "  GROUP BY YEAR(o.order_date), MONTH(o.order_date);", nativeQuery = true)
    Tuple countProductSalesByMonthAndYear(@Param("year") int year, @Param("month") int month);

    @Query(value = "SELECT YEAR(o.order_date) AS order_year, MONTH(o.order_date) AS order_month, COUNT(o.user_id) AS total_buyer\n" +
            "FROM orders o\n" +
            "JOIN order_detail od ON o.order_id = od.order_id\n" +
            "WHERE YEAR(o.order_date) = :year\n" +
            "   AND MONTH(o.order_date) = :month\n" +
            "   AND o.status = 'DELIVERED'\n" +
            "   GROUP BY YEAR(o.order_date), MONTH(o.order_date)", nativeQuery = true)
    Tuple countBuyerByMonthAndYear(@Param("year") int year, @Param("month") int month);

    @Query(value = "SELECT YEAR(o.order_date) AS order_year, MONTH(o.order_date) AS order_month, SUM(o.total_price) AS revenue\n" +
            "FROM orders o\n" +
            "JOIN order_detail od ON o.order_id = od.order_id\n" +
            "WHERE YEAR(o.order_date) = :year\n" +
            "   AND MONTH(o.order_date) = :month\n" +
            "   AND o.status = 'DELIVERED'\n" +
            "   GROUP BY YEAR(o.order_date), MONTH(o.order_date)", nativeQuery = true)
    Tuple calculateRevenue(@Param("year") int year, @Param("month") int month);



}

