package js.footballclubmng.model.request;

import lombok.Data;
import org.springframework.util.StringUtils;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class LoginRequest {
    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Email không hợp lệ.")
    @Size(max = 50, message = "Tối đa 50 ký tự")
    private String email;
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S+$",message = "Bạn cần nhập ít nhất một chữ cái viết hoa, một chữ cái thường, một chữ số.")
    @Size(min = 8, max = 30, message = "Mật khẩu phải có ít nhất 8 ký tự.")
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

    public boolean isValid(){
        return StringUtils.hasLength(email) && StringUtils.hasLength(password);
    }
}
