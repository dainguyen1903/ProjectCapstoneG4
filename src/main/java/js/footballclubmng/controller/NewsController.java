package js.footballclubmng.controller;

import js.footballclubmng.model.dto.NewsDto;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.common.CommonConstant;

import js.footballclubmng.entity.News;
import js.footballclubmng.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NewsController {
    @Autowired
    NewsService newsService;

    @GetMapping(CommonConstant.NEWS_API.LIST_NEWS)
    public ResponseAPI<List<NewsDto>> newsList() {
        List<NewsDto> newsList = newsService.findAllNews();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null, newsList);
    }
    @GetMapping(CommonConstant.NEWS_API.DETAIL_NEWS)
    public ResponseAPI<News> newsDetail(@PathVariable int id) {
        News news = newsService.getNewsById(id);
        if (news!=null){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null, news);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS);
    }


}
