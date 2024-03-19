package js.footballclubmng.repository;

import js.footballclubmng.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAll();

    @Query(value = "SELECT * FROM product p WHERE lower(p.name) LIKE lower(concat('%', :query, '%'))", nativeQuery = true)
    List<Product> searchProductByName(String query);
}
