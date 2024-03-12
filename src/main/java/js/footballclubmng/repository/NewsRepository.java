package js.footballclubmng.repository;

import js.footballclubmng.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News,Long> {
    @Query(value = "select * from news n where " +
            "lower(n.title) like lower(concat('%', :query, '%')) or " +
            "lower(n.description) like lower(concat('%', :query, '%'))", nativeQuery = true)
    List<News> searchNews(String query);
}
