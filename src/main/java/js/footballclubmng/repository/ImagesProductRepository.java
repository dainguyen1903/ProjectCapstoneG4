package js.footballclubmng.repository;

import js.footballclubmng.entity.ImagesProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesProductRepository extends JpaRepository<ImagesProduct, Long> {

    List<ImagesProduct> findAllImagesByProductId(Long productId);

    List<ImagesProduct> findAllByProductId(Long productId);

    @Query(value = "SELECT ip.path FROM images_product ip  WHERE ip.product_id = :productId AND ip.player_id = :playerId", nativeQuery = true)
    List<String> findAllByProductIdAndPlayerId(Long productId, Long playerId);
}
