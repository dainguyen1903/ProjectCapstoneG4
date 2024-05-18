package js.footballclubmng.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$", message = "Nhập ngày theo định dạng yyyy-mm-ddThh:mm:ss")
    private String dateTime;
    @NotBlank(message = "Địa điểm không được để trống")
    private String location;
    @NotBlank(message = "Trạng thái trận đấu không được để trống")
    private String statusMatch;
    @Pattern(regexp = "^[0-9]+$", message = "Vui lòng nhập số.")
    private String homeScore;
    @Pattern(regexp = "^[0-9]+$", message = "Vui lòng nhập số.")
    private String awayScore;
    @NotBlank(message = "Số vé bán không được để trống")
    @Pattern(regexp = "^[0-9]+$", message = "Vui lòng nhập số.")
    private String numberOfTicket;
    @NotBlank(message = "Giá vé không được để trống")
    @Pattern(regexp = "^[0-9]+$", message = "Vui lòng nhập số.")
    private String priceOfTicket;
    private Integer numberOfTicketsSold;
    private Boolean status;
}
