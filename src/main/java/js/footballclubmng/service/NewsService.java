package js.footballclubmng.service;

import js.footballclubmng.model.request.CreateNewsRequest;
import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.entity.News;

import java.util.List;

public interface NewsService {
    News getNewsById(long id);
    public List<ListNewsResponse> findAllNews();
    public List<News> searchNews(String search);
    public boolean createNews(CreateNewsRequest createNewsRequest);
    public boolean updateNews(long id, CreateNewsRequest createNewsRequest);
}
