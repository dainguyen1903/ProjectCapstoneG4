package js.footballclubmng.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.nio.file.Path;

@Entity
@Table(name = "images")
@Data
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private long imageId;
    private String name;
    private String path;
    @Column(name = "image_type")
    private String imageType;
    @ManyToOne
    @JoinColumn(name = "new_id")
    @JsonIgnore
    private News news;
}
