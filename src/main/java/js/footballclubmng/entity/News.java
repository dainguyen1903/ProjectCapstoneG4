package js.footballclubmng.entity;


import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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


}
