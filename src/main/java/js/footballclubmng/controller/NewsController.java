package js.footballclubmng.controller;

import js.footballclubmng.dto.NewsDto;
import js.footballclubmng.dto.ResponseModel;
import js.footballclubmng.entity.News;
import js.footballclubmng.entity.Player;
import js.footballclubmng.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
public class NewsController {
    @Autowired
    NewsService newsService;

    @GetMapping("/list-news")
    public ResponseEntity<ResponseModel> newsList() {
        List<NewsDto> newsList = newsService.findAllNews();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseModel("true","", newsList));
    }
    @GetMapping("/news-detail/{id}")
    public ResponseEntity<ResponseModel> newsDetail(@PathVariable int id) {
        Optional<News> news = newsService.getNewsById(id);
        if (news.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseModel("true","", news));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseModel("false","không tìm thấy thông tin tin tức", null));
    }


}
