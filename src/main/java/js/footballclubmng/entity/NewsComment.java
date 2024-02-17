package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "news_comment")
@Data
public class NewsComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "new_comment_id")
    private int commentId;
    private String comment;
    @Column(name = "comment_time")
    private LocalDateTime commentTime;

    @ManyToOne
    @JoinColumn(name = "new_id")
    @JsonIgnore
    private News news;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
