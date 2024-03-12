package js.footballclubmng.repository;

import js.footballclubmng.entity.NewsType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsTypeRepository extends JpaRepository<NewsType,Long> {
    NewsType findByName(String name);
}
