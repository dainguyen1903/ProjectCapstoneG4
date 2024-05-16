package js.footballclubmng.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePasswordRequest {
    @Size(min = 8, max = 30, message = "Mật khẩu phải có ít nhất 8 ký tự.")
    @NotBlank(message = "Nhập mật khẩu mới")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S+$",message = "Bạn cần nhập ít nhất một chữ cái viết hoa, một chữ cái thường, một chữ số.")
    private String newPassword;
    @NotBlank(message = "Phải trùng khớp")
    private String reNewPassword;
}
