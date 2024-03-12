package js.footballclubmng.repository;

import js.footballclubmng.entity.NewsType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsTypeRepository extends JpaRepository<NewsType,Long> {
    NewsType findByName(String name);
}
