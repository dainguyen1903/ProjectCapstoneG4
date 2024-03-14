package js.footballclubmng.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Transactional
@Entity(name = "news")
public class News {
    @Id
    @Column(name = "news_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date_create", nullable = false)
    private LocalDateTime dateCreate;

    @OneToMany(mappedBy = "news",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<ImagesNews> imagesNewsList;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "news_type_id")
    @JsonIgnore
    private NewsType newsType;

//    @OneToMany(mappedBy = "news")
//    private List<NewsComment> newsCommentList;

}
