package js.footballclubmng.entity;

import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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

    @NotBlank(message = "Không được để trống.")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Không được để trống.")
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "newsType",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<News> newsList;
}
