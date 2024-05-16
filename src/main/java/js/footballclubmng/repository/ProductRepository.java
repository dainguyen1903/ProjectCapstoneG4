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


    @Query(value = "select * from product p join category c on p.category_id = c.category_id where lower(c.category_name) like lower(concat('%',:categoryName,'%')) ", nativeQuery = true)
    List<Product> filterProductByCategoryName(String categoryName);

//    @Query(value = "select * from product p join product_size ps on p.product_id = ps.product_id where lower(ps.size) like lower(concat('%',:size,'%')) ", nativeQuery = true)
//    List<Product> filterProductBySize(String size);
//
//    List<Product> findAllByOrderByPriceAsc();
//
//    List<Product> findAllByOrderByPriceDesc();
//
//    List<Product> findAllByPriceBetween(Float min, Float max);

    @Query(value = "UPDATE product_size pz SET pz.quantity = :quantity WHERE pz.productId = :productId AND pz.size = :size", nativeQuery = true)
    void updateProductQuantity(@Param("productId") Long productId, @Param("size") String size, @Param("quantity") int quantity);


}

