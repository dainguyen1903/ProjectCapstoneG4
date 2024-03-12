package js.footballclubmng.controller;

import js.footballclubmng.model.request.CreateNewsRequest;
import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.common.CommonConstant;

import js.footballclubmng.entity.News;
import js.footballclubmng.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class NewsController {
    @Autowired
    NewsService newsService;


    @GetMapping(CommonConstant.NEWS_API.LIST_NEWS)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<List<ListNewsResponse>> newsList() {
        List<ListNewsResponse> newsList = newsService.findAllNews();
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

    @GetMapping(CommonConstant.NEWS_API.SEARCH_NEWS)
    public ResponseAPI<List<News>> searchNews(@RequestParam String search) {
        List<News> newsList = newsService.searchNews(search);
        if(newsList.isEmpty()){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null, newsList);
    }

    @PostMapping(CommonConstant.NEWS_API.CREATE_NEWS)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<String> createNews(@RequestBody @Valid CreateNewsRequest createNewsRequest) {
        if(!newsService.createNews(createNewsRequest)){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.CREATE_NEWS_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.CREATE_NEWS_SUCCESS);
    }

    @PutMapping(CommonConstant.NEWS_API.UPDATE_NEWS)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<String> updateNews(@PathVariable int id, @RequestBody @Valid CreateNewsRequest createNewsRequest) {
        News news = newsService.getNewsById(id);
        if(news==null){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS);
        }
        if(!newsService.updateNews(id, createNewsRequest)){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.UPDATE_NEWS_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.UPDATE_NEWS_SUCCESS);
    }

    @DeleteMapping(CommonConstant.NEWS_API.DELETE_NEWS)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<String> deleteNews(@PathVariable int id) {
        News news = newsService.getNewsById(id);
        if(news==null){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS);
        }
        if(!newsService.deleteNews(id)){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.DELETE_NEWS_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.DELETE_NEWS_SUCCESS);
    }
}
