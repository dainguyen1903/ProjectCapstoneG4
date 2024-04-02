package js.footballclubmng.repository;

import js.footballclubmng.entity.Product;
import js.footballclubmng.model.dto.ProductDto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();

    @Query(value = "SELECT * \n" +
            "            FROM \n" +
            "                product p\n" +
            "            JOIN  \n" +
            "               category c ON p.category_id = c.category_id\n" +
            "            JOIN  \n" +
            "                product_size ps ON p.product_id = ps.product_id\n" +
            "            JOIN \n" +
            "                images_product ip ON p.product_id = ip.product_id\n" +
            "                WHERE p.status = 1;", nativeQuery = true)
    List<Product> getAllProduct();




    @Query(value = "SELECT * FROM product p WHERE lower(p.name) LIKE lower(concat('%', :query, '%'))", nativeQuery = true)
    List<Product> searchProductByName(String query);

}
