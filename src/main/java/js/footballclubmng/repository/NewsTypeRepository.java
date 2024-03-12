package js.footballclubmng.repository;

import js.footballclubmng.entity.NewsType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsTypeRepository extends JpaRepository<NewsType,Long> {
    NewsType findByName(String name);
    List<NewsType> findByNameContaining(String search);
}
