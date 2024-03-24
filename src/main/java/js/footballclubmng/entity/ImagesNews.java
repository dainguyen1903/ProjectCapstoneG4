package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "images_news")
public class ImagesNews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_news_id")
    private Long id;

    @Column(name = "path", nullable = false)
    private String path;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "news_id")
    @JsonIgnore
    private News news;

}
