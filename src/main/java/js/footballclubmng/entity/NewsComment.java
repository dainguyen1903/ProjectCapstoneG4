package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "news_comment")
public class NewsComment {
    @Id
    @Column(name = "new_comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment_content",nullable = false)
    private String commentContent;

    @Column(name = "comment_time", nullable = false)
    private Date commentTime;

    @ManyToOne
    @JoinColumn(name = "new_id")
    @JsonIgnore
    private News news;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;



}
