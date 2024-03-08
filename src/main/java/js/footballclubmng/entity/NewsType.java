package js.footballclubmng.entity;

import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Transactional
@Entity(name = "news_type")
public class NewsType {
    @Id
    @Column(name = "news_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @OneToMany(mappedBy = "newsType",fetch = FetchType.EAGER)
    private List<News> newsList;
}
