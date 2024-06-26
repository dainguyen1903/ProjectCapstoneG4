package js.footballclubmng.repository;

import js.footballclubmng.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findCategoryByName(String name);
    @Query(value = "select * from category c where " +
            "(c.status = 1) and" +
            "(lower(c.category_name) like lower(concat('%', :name, '%')))", nativeQuery = true)
    List<Category> searchCategory(String name);

    @Query(value = "select * from category c where " +
            "(c.status = 1) and" +
            "(lower(trim(both from c.category_name))) = (lower(trim(both from :name)))", nativeQuery = true)
    Category checkNameCategoryExist(String name);

    @Query(value = "select * from category c where c.status = 1", nativeQuery = true)
    List<Category> viewAllCategory();
}
