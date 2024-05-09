package js.footballclubmng.model.dto;

import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerDto {
    @NotNull(message = "Số cầu thủ không được để trống.")
    private Long playerNumber;

    @NotBlank(message = "Tên cầu thủ không được để trống.")
    private String name;

    private Date dateOfBirth;

    @NotNull(message = "Chiều cao không được để trống.")
    private Integer height;

    @NotNull(message = "Cân nặng không được để trống.")
    private Integer weight;

    private String imageAvatar;

    private String imageFirstJersey;

    private String imageSecondJersey;

    @NotBlank(message = "Quốc tịch không được để trống.")
    private String nationality;

    @NotBlank(message = "Vị trí không được để trống.")
    private String position;

    private String bio;

    private Date joinDate;
}
