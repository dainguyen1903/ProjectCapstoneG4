package js.footballclubmng.repository;

import js.footballclubmng.entity.Product;
import js.footballclubmng.model.dto.ProductDetailsDto;
import js.footballclubmng.model.dto.ProductDto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();


    @Query(value = "SELECT * FROM product p WHERE lower(p.product_name) LIKE lower(concat('%', :productName, '%'))", nativeQuery = true)
    List<Product> searchProductByName(String productName);

}
