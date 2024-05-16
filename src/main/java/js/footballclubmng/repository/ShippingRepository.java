package js.footballclubmng.repository;

import js.footballclubmng.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping,Long> {


    @Query(value = "SELECT * FROM orders o JOIN shipping s ON o.shipping_id = s.shipping_id WHERE s.shipper_id = ?1", nativeQuery = true)
    List<Shipping> listShippingForShipper(Long shipperId);

    int countByShipperId(Long shipperId);
}
