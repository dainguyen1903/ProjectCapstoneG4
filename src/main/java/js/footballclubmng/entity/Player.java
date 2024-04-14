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
    @Column(name = "player_number")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerNumber;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "image_avatar")
    private String imageAvatar;

    @Column(name = "image_first_jersey")
    private String imageFirstJersey;

    @Column(name = "image_second_jersey")
    private String imageSecondJersey;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "position")
    private String position;

    @Column(name = "bio")
    private String bio;

    @Column(name = "join_date")
    private Date joinDate;

    @Column(name = "status")
    private Boolean status;


}


