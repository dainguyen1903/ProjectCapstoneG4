package js.footballclubmng.model.dto;

import lombok.*;
import org.springframework.security.access.method.P;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlayerDto {
    @NotNull(message = "Số cầu thủ không được để trống.")
    @Pattern(regexp = "^[0-9]+$", message = "Số cầu thủ không hợp lệ! Vui lòng nhập số.")
    private String playerNumber;

    @NotBlank(message = "Tên cầu thủ không được để trống.")
    @Size(max = 50, message = "Tối đa 50 ký tự")
    private String name;

    @NotBlank(message = "Ngày sinh cầu thủ không được để trống.")
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", message = "Ngày sinh không hợp lệ! Vui lòng nhập theo định dạng yyyy-mm-dd.")
    private String dateOfBirth;

    @NotBlank(message = "Chiều cao không được để trống.")
    @Pattern(regexp = "^[0-9]+$", message = "Chiều cao không hợp lệ! Vui lòng nhập số.")
    private String height;

    @NotBlank(message = "Cân nặng không được để trống.")
    @Pattern(regexp = "^[0-9]+$", message = "Cân nặng không hợp lệ! Vui lòng nhập số.")
    private String weight;

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
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", message = "Ngày tham gia không hợp lệ! Vui lòng nhập theo định dạng yyyy-mm-dd.")
    private String joinDate;
}
