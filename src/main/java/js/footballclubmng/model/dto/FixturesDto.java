package js.footballclubmng.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FixturesDto {
    private Long id;
    @NotBlank(message = "Tên trận đấu không được để trống")
    private String name;
    @NotBlank(message = "Vòng đấu không được để trống")
    private String round;
    @NotBlank(message = "Tên đội chủ nhà không được để trống")
    private String homeTeam;
    @NotBlank(message = "Logo đội nhà không được để trống")
    private String imageHomeTeam;
    @NotBlank(message = "Tên đội khách không được để trống")
    private String awayTeam;
    @NotBlank(message = "Logo đội khách không được để trống")
    private String imageAwayTeam;
    @NotBlank(message = "Thời gian diễn ra trận đấu không được để trống")
    private LocalDateTime dateTime;
    @NotBlank(message = "Địa điểm không được để trống")
    private String location;
    @NotBlank(message = "Trạng thái trận đấu không được để trống")
    private String statusMatch;
    private Integer homeScore;
    private Integer awayScore;
    @NotNull(message = "Số vé bán không được để trống")
    private Integer numberOfTicket;
    @NotNull(message = "Giá vé không được để trống")
    private Double priceOfTicket;
    private Integer numberOfTicketsSold;
    private Boolean status;
}
