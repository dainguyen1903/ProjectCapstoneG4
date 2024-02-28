package js.footballclubmng.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "news")
@Data
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "new_id")
    private long newId;
    private String title;
    private String description;
    @Column(name = "date_create")
    private LocalDateTime dateCreate;

    @OneToMany(mappedBy = "news")
    private List<Images> imagesList;

    @OneToMany(mappedBy = "news")
    private List<NewsComment> newsCommentList;


}
