package js.footballclubmng.service.Impl;

import js.footballclubmng.model.dto.NewsDto;
import js.footballclubmng.entity.News;
import js.footballclubmng.repository.NewsRepository;
import js.footballclubmng.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    NewsRepository newsRepository;

    @Override
    public Optional<News> getNewsById(int id){
        Optional<News> news = newsRepository.findById(id);
        return news;
    }

    @Override
    public List<NewsDto> findAllNews() {
        List<News> newsList = newsRepository.findAll();
        return newsList.stream()
                .map((news) -> mapToNewsDto(news))
                .collect(Collectors.toList());
    }

    private NewsDto mapToNewsDto(News news){
        NewsDto newsDto = new NewsDto();
        newsDto.setId(news.getId());
        newsDto.setTitle(news.getTitle());
        newsDto.setDateCreate(news.getDateCreate());
        return newsDto;
    }

}
