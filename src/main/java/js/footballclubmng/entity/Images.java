package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

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
    @Column(name = "image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String imageName;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "image_type", nullable = false)
    private String imageType;

    @ManyToOne
    @JoinColumn(name = "news_id")
    @JsonIgnore
    private News news;

}
