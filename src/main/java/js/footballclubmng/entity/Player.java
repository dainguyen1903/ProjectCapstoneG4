package js.footballclubmng.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "player")
@Data
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private int playerId;
    private String name;
    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    private int height;
    private int weight;
    @Column(name = "image_url")
    private String image;
    private String nationality;
    private String position;
    private String bio;
    @Column(name = "join_date")
    private Date joinDate;
}
