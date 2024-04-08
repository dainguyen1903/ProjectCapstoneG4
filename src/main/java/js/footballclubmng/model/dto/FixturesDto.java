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
    private String awayTeam;
    private LocalDateTime dateTime;
    private String location;
    private String statusMatch;
    private Integer homeScore;
    private Integer awayScore;
    private Integer numberOfTicket;
    private Double priceOfTicket;
    private Boolean status;
}
