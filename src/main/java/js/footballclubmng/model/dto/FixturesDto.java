package js.footballclubmng.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FixturesDto {
    private Long id;
    private String name;
    private String round;
    private String homeTeam;
    private String imageHomeTeam;
    private String awayTeam;
    private String imageAwayTeam;
    private LocalDateTime dateTime;
    private String location;
    private String statusMatch;
    private Integer homeScore;
    private Integer awayScore;
    private Integer numberOfTicket;
    private Double priceOfTicket;
    private Integer numberOfTicketsSold;
    private Boolean status;
}