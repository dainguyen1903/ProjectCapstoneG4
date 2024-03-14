package js.footballclubmng.repository;

import js.footballclubmng.entity.ImagesNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagesNewsRepository extends JpaRepository<ImagesNews, Long> {
}
