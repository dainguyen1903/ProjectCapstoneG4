package js.footballclubmng.service;

import js.footballclubmng.model.dto.NewsDto;
import js.footballclubmng.entity.News;

import java.util.List;
import java.util.Optional;

public interface NewsService {
    Optional<News> getNewsById(long id);
    public List<NewsDto> findAllNews();
}