package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "fixtures")
public class Fixtures {
    @Id
    @Column(name = "fixtures_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name ="round")
    private String round;
    @Column(name = "home_team")
    private String homeTeam;
    @Column(name = "away_team")
    private String awayTeam;
    @Column(name = "date_time")
    private LocalDateTime dateTime;
    @Column(name = "location")
    private String location;
    @Column(name = "status_match")
    private String statusMatch;
    @Column(name = "home_score")
    private Integer homeScore;
    @Column(name = "away_score")
    private Integer awayScore;
    @Column(name = "number_of_ticket")
    private Integer numberOfTicket;
    @Column(name = "price_of_ticket")
    private Double priceOfTicket;
    @Column(name = "number_of_tickets_sold")
    private Integer numberOfTicketsSold;
    @Column(name = "status")
    private Boolean status;


}
