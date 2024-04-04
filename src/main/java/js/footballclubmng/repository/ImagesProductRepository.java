package js.footballclubmng.repository;

import js.footballclubmng.entity.ImagesProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesProductRepository extends JpaRepository<ImagesProduct, Long> {

    List<ImagesProduct> findAllImagesByProductId(Long productId);

    List<ImagesProduct> findAllByProductId(Long productId);
}
