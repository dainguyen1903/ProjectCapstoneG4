package js.footballclubmng.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    @NotBlank(message = "Tên không được để trống.")
    private String firstName;
    @NotBlank(message = "Họ không được để trống.")
    private String lastName;
    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Email không hợp lệ.")
    private String email;
    private String address;
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", message = "Ngày sinh không hợp lệ! Vui lòng nhập theo định dạng yyyy-mm-dd.")
    private String dateOfBirth;
    private String gender;
    private String image;
    private String district;
    private String ward;
    private String province;
}
