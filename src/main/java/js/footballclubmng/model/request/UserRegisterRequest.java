package js.footballclubmng.model.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {
    @NotBlank(message = "Tên không được để trống.")
    @Size(max = 20, message = "Tối đa 20 ký tự")
    private String firstName;
    @NotBlank(message = "Họ không được để trống.")
    @Size(max = 20, message = "Tối đa 20 ký tự")
    private String lastName;
    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Email không hợp lệ.")
    @Size(max = 50, message = "Tối đa 50 ký tự")
    private String email;
    @Size(min = 8, max = 30, message = "Mật khẩu phải có ít nhất 8 ký tự.")
    @NotBlank(message = "Mật khẩu không được để trống")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S+$",message = "Bạn cần nhập ít nhất một chữ cái viết hoa, một chữ cái thường, một chữ số.")
    private String password;
    @NotBlank(message = "Phải trùng khớp")
    private String repassword;
}
