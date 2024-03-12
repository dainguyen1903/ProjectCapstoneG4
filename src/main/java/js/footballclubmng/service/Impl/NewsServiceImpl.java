package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.NewsType;
import js.footballclubmng.model.request.CreateNewsRequest;
import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.entity.News;
import js.footballclubmng.model.response.ListNewsTypeResponse;
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

    @Override
    public boolean deleteNews(long id) {
        try {
            newsRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<ListNewsTypeResponse> findAllNewsType() {
        try {
            List<NewsType> newsTypeList = newsTypeRepository.findAll();
            return newsTypeList.stream()
                    .map((newsType) -> mapToNewsTypeDto(newsType))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public NewsType getNewsTypeById(long id) {
        try {
            NewsType newsType = newsTypeRepository.findById(id).orElse(null);
            return newsType;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean createNewsType(NewsType newsType) {
        try {
            NewsType newsType1 = new NewsType();
            newsType1.setName(newsType.getName());
            newsType1.setDescription(newsType.getDescription());
            newsTypeRepository.save(newsType1);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateNewsType(long id, NewsType newsType) {
        try {
            NewsType newsType1 = newsTypeRepository.findById(id).orElse(null);
            if (newsType1 != null) {
                newsType1.setName(newsType.getName());
                newsType1.setDescription(newsType.getDescription());
                newsTypeRepository.save(newsType1);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteNewsType(long id) {
        return false;
    }

    @Override
    public List<News> findTop4News() {
        return null;
    }

    @Override
    public NewsType getNewsTypeByName(String name) {
        try {
            NewsType newsType = newsTypeRepository.findByName(name);
            return newsType;
        } catch (Exception e) {
            return null;
        }
    }


    private ListNewsResponse mapToNewsDto(News news) {
        ListNewsResponse listNewsResponse = new ListNewsResponse();
        listNewsResponse.setId(news.getId());
        listNewsResponse.setTitle(news.getTitle());
        listNewsResponse.setDateCreate(news.getDateCreate());
        return listNewsResponse;
    }

    private ListNewsTypeResponse mapToNewsTypeDto(NewsType newsType) {
        ListNewsTypeResponse listNewsTypeResponse = new ListNewsTypeResponse();
        listNewsTypeResponse.setId(newsType.getId());
        listNewsTypeResponse.setName(newsType.getName());
        return listNewsTypeResponse;
    }


}
