package js.footballclubmng.service;

import js.footballclubmng.entity.NewsType;
import js.footballclubmng.model.request.CreateNewsRequest;
import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.entity.News;
import js.footballclubmng.model.response.ListNewsTypeResponse;

import java.util.List;

public interface NewsService {
    public News getNewsById(long id);

    public List<ListNewsResponse> findAllNews();

    public List<News> searchNews(String search);

    public boolean createNews(CreateNewsRequest createNewsRequest);

    public boolean updateNews(long id, CreateNewsRequest createNewsRequest);

    public boolean deleteNews(long id);

    public List<ListNewsTypeResponse> findAllNewsType();

    public NewsType getNewsTypeById(long id);

    public boolean createNewsType(NewsType newsType);

    public boolean updateNewsType(long id, NewsType newsType);

    public boolean deleteNewsType(long id);

    public List<News> findTop4News();

    public NewsType getNewsTypeByName(String name);

    public List<NewsType> searchNewsType(String search);
}
