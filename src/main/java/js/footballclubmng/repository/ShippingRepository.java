package js.footballclubmng.repository;

import js.footballclubmng.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping,Long> {

    List<Shipping> findAllByShipperId(Long shipperId);
}
