package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

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
    private LocalDateTime joinDate;

    @Column(name = "delete_flg", length = 1)
    private String deleteFlg;



}
