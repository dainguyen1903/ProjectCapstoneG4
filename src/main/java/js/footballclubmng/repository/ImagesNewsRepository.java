package js.footballclubmng.repository;

import js.footballclubmng.entity.ImagesNews;
import js.footballclubmng.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesNewsRepository extends JpaRepository<ImagesNews, Long> {
    ImagesNews findImagesNewsByPathAndNews(String image, News news);

    List<ImagesNews> findImagesNewsByNews(News news);
}
