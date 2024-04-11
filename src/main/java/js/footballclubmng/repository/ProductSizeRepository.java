package js.footballclubmng.repository;

import js.footballclubmng.entity.ImagesProduct;
import js.footballclubmng.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {

    List<ImagesProduct> findAllSizesByProductId(Long productId);

    List<ProductSize> findAllByProductId(Long productId);

    ProductSize findProductSizeByProductIdAndSize(Long productId, String size);



}
