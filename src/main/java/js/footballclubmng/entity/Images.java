package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.nio.file.Path;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "images")
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String imageName;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "image_type", nullable = false)
    private String imageType;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "news_id")
    private News news;

}
