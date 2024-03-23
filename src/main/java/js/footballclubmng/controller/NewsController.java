package js.footballclubmng.controller;

import js.footballclubmng.entity.NewsType;
import js.footballclubmng.model.request.CreateNewsRequest;
import js.footballclubmng.model.response.ListNewsResponse;
import js.footballclubmng.model.response.ListNewsTypeResponse;
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
        boolean check = newsService.createNews(createNewsRequest);
        if(!check){
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
        boolean check = newsService.updateNews(id, createNewsRequest);
        if(!check){
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
        boolean check = newsService.deleteNews(id);
        if(!check){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.DELETE_NEWS_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.DELETE_NEWS_SUCCESS);
    }

    @GetMapping(CommonConstant.NEWS_API.LIST_NEWS_TYPE)
    public ResponseAPI<List<ListNewsTypeResponse>> newsTypeList() {
        List<ListNewsTypeResponse> newsTypeList = newsService.findAllNewsType();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null, newsTypeList);
    }

    @GetMapping(CommonConstant.NEWS_API.DETAIL_NEWS_TYPE)
    public ResponseAPI<NewsType> newsTypeDetail(@PathVariable int id) {
        NewsType newsType = newsService.getNewsTypeById(id);
        if (newsType!=null){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null, newsType);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS_TYPE);
    }

    @PostMapping(CommonConstant.NEWS_API.CREATE_NEWS_TYPE)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<String> createNewsType(@RequestBody @Valid NewsType newsType) {
        NewsType newsTypeCheck = newsService.getNewsTypeByName(newsType.getName());
        if(newsTypeCheck!=null){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.EXIST_NEWS_TYPE);
        }
        boolean check =  newsService.createNewsType(newsType);
        if(!check){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.CREATE_NEWS_TYPE_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.CREATE_NEWS_TYPE_SUCCESS);
    }

    @PutMapping(CommonConstant.NEWS_API.UPDATE_NEWS_TYPE)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<String> updateNewsType(@PathVariable int id, @RequestBody @Valid NewsType newsType) {
        NewsType newsTypeCheck = newsService.getNewsTypeById(id);
        if(newsTypeCheck==null){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS_TYPE);
        }
        boolean check = newsService.updateNewsType(id, newsType);
        if(!check){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.UPDATE_NEWS_TYPE_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.UPDATE_NEWS_TYPE_SUCCESS);
    }

    @GetMapping(CommonConstant.NEWS_API.LIST_TOP4_NEWS)
    public ResponseAPI<List<News>> listTop4News() {
        List<News> newsList = newsService.findTop4News();
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null, newsList);
    }

    @GetMapping(CommonConstant.NEWS_API.SEARCH_NEWS_TYPE)
    public ResponseAPI<List<NewsType>> searchNewsType(@RequestParam String search) {
        List<NewsType> newsTypeList = newsService.searchNewsType(search);
        if(newsTypeList.isEmpty()){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS_TYPE);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,null, newsTypeList);
    }

    @DeleteMapping(CommonConstant.NEWS_API.DELETE_NEWS_TYPE)
    @PreAuthorize("hasRole('ROLE_Operator')")
    public ResponseAPI<String> deleteNewsType(@PathVariable int id) {
        NewsType newsType = newsService.getNewsTypeById(id);
        if(newsType==null){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY,CommonConstant.COMMON_MESSAGE.NOT_FOUND_NEWS_TYPE);
        }
        boolean check = newsService.deleteNewsType(id);
        if(!check){
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST,CommonConstant.COMMON_MESSAGE.DELETE_NEWS_TYPE_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK,CommonConstant.COMMON_MESSAGE.DELETE_NEWS_TYPE_SUCCESS);
    }

}
