package js.footballclubmng.model.dto;

import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
    @Size(max = 50, message = "Tối đa 50 ký tự")
    private String name;

    @NotBlank(message = "Ngày sinh cầu thủ không được để trống.")
    private Date dateOfBirth;

    @NotNull(message = "Chiều cao không được để trống.")
    private Integer height;

    @NotNull(message = "Cân nặng không được để trống.")
    private Integer weight;

    @NotBlank(message = "Ảnh cầu thủ không được để trống.")
    private String imageAvatar;

    @NotBlank(message = "Ảnh cầu thủ không được để trống.")
    private String imageFirstJersey;

    @NotBlank(message = "Ảnh cầu thủ không được để trống.")
    private String imageSecondJersey;

    @NotBlank(message = "Quốc tịch không được để trống.")
    @Size(max = 50, message = "Tối đa 50 ký tự")
    private String nationality;

    @NotBlank(message = "Vị trí không được để trống.")
    @Size(max = 50, message = "Tối đa 50 ký tự")
    private String position;

    private String bio;

    @NotBlank(message = "Ngày tham gia không được để trống.")
    private Date joinDate;
}
