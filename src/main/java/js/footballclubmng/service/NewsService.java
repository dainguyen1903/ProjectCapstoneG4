package js.footballclubmng.service;

import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.entity.News;

import java.util.List;

public interface NewsService {
    News getNewsById(long id);
    public List<ListNewsResponse> findAllNews();
}
