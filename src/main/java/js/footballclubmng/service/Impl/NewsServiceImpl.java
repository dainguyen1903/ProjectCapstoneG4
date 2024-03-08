package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.NewsType;
import js.footballclubmng.model.request.CreateNewsRequest;
import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.entity.News;
import js.footballclubmng.repository.NewsRepository;
import js.footballclubmng.repository.NewsTypeRepository;
import js.footballclubmng.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NewsServiceImpl implements NewsService {
    @Autowired
    NewsRepository newsRepository;
    @Autowired
    NewsTypeRepository newsTypeRepository;

    @Override
    public News getNewsById(long id) {
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

    @Override
    public List<News> searchNews(String search) {
        List<News> newsList = newsRepository.searchNews(search);
        return newsList;
    }

    @Override
    public boolean createNews(CreateNewsRequest createNewsRequest) {
        try {
            NewsType newsType = newsTypeRepository.findByName(createNewsRequest.getNewsType());
            News news = new News();
            news.setTitle(createNewsRequest.getTitle());
            news.setDescription(createNewsRequest.getDescription());
            news.setDateCreate(LocalDateTime.now());
            news.setNewsType(newsType);
            newsRepository.save(news);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public boolean updateNews(long id, CreateNewsRequest createNewsRequest) {
        try {
            News news = newsRepository.findById(id).orElse(null);
            if (news != null) {
                NewsType newsType = newsTypeRepository.findByName(createNewsRequest.getNewsType());
                news.setTitle(createNewsRequest.getTitle());
                news.setDescription(createNewsRequest.getDescription());
                news.setNewsType(newsType);
                newsRepository.save(news);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }


    private ListNewsResponse mapToNewsDto(News news) {
        ListNewsResponse listNewsResponse = new ListNewsResponse();
        listNewsResponse.setId(news.getId());
        listNewsResponse.setTitle(news.getTitle());
        listNewsResponse.setDateCreate(news.getDateCreate());
        return listNewsResponse;
    }


}
