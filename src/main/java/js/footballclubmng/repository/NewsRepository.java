package js.footballclubmng.repository;

import js.footballclubmng.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News,Integer> {
}
