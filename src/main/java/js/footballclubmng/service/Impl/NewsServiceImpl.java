package js.footballclubmng.service.Impl;

import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.entity.News;
import js.footballclubmng.repository.NewsRepository;
import js.footballclubmng.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {
    @Autowired
    NewsRepository newsRepository;

    @Override
    public News getNewsById(long id){
        News news = newsRepository.findById(id).orElse(null);
        return news;
    }

    @Override
    public List<ListNewsResponse> findAllNews() {
        List<News> newsList = newsRepository.findAll();
        return newsList.stream()
                .map((news) -> mapToNewsDto(news))
                .collect(Collectors.toList());
    }

    private ListNewsResponse mapToNewsDto(News news){
        ListNewsResponse listNewsResponse = new ListNewsResponse();
        listNewsResponse.setId(news.getId());
        listNewsResponse.setTitle(news.getTitle());
        listNewsResponse.setDateCreate(news.getDateCreate());
        return listNewsResponse;
    }

}
