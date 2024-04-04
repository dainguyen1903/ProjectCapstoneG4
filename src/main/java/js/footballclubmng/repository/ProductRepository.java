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

    @Query(value = "select p.product_id, \n" +
            "    p.product_name, \n" +
            "    p.price, \n" +
            "    p.discount, \n" +
            "    p.description, \n" +
            "    p.status, \n" +
            "    p.is_customise, \n" +
            "    c.category_name,\n" +
            "    group_concat(ip.path separator ',') as image_paths,\n" +
            "\tjson_objectagg(coalesce (ps.size, ''), ps.quantity) as size_quantities\n" +
            "from product p \n" +
            "left join category c on p.category_id = c.category_id\n" +
            "left join images_product ip on p.product_id = ip.product_id\n" +
            "left join (\n" +
            "    select product_id, size, sum(quantity) as quantity\n" +
            "    from product_size\n" +
            "    group by product_id, size\n" +
            ") ps on p.product_id = ps.product_id\n" +
            "where p.product_id = :productId\n" +
            "group by p.product_id;", nativeQuery = true)
    ProductDetailsDto getProductDetailsById(@Param("productId") Long productId);



    @Query(value = "SELECT * FROM product p WHERE lower(p.name) LIKE lower(concat('%', :query, '%'))", nativeQuery = true)
    List<Product> searchProductByName(String query);

}
