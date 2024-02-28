package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.dto.NewsDto;
import js.footballclubmng.model.response.ResponseApi;
import js.footballclubmng.entity.News;
import js.footballclubmng.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NewsController {
    @Autowired
    NewsService newsService;

    @GetMapping(CommonConstant.NEWS_API.LIST_NEWS)
    public ResponseEntity<ResponseApi> newsList() {
        List<NewsDto> newsList = newsService.findAllNews();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseApi("true",null, newsList));
    }
    @GetMapping(CommonConstant.NEWS_API.DETAIL_NEWS)
    public ResponseEntity<ResponseApi> newsDetail(@PathVariable int id) {
        News news = newsService.getNewsById(id).orElse(null);
        if (news!=null){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseApi("true",null, news));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseApi("false","không tìm thấy thông tin tin tức", null));
    }


}
