package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "player")
public class Player {
    @Id
    @Column(name = "player_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "position")
    private String position;

    @Column(name = "bio")
    private String bio;

    @Column(name = "join_date")
    private Date joinDate;

    @Column(name = "player_number")
    private Integer numberPlayer;

    @Column(name = "status")
    private Boolean status;


    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<ImagesProduct> imagesProductList;


