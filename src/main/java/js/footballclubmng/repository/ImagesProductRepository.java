package js.footballclubmng.repository;

import js.footballclubmng.entity.ImagesProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagesProductRepository extends JpaRepository<ImagesProduct,Long> {
}
