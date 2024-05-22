package js.footballclubmng.model.request.user;

import lombok.Data;
import org.springframework.util.StringUtils;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class CreateUserRequest {

    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Email không hợp lệ.")
    @Size(max = 50, message = "Tối đa 50 ký tự")
    private String email;

    @NotBlank(message = "Tên không được để trống.")
    @Size(max = 20, message = "Tối đa 20 ký tự")
    private String firstName;

    @NotBlank(message = "Họ không được để trống.")
    @Size(max = 20, message = "Tối đa 20 ký tự")
    private String lastName;

    private String address;

    @NotBlank(message = "Tên Phường không được để trống")
    private String ward;

    @NotBlank(message = "Tên Huyện/Thành phố không được để trống")
    private String district;

    @NotBlank(message = "Tên Tỉnh không được để trống")
    private String province;

    private String gender;

    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$", message = "Ngày sinh không hợp lệ! Vui lòng nhập theo định dạng yyyy-mm-dd.")
    private String dateOfBirth;

    private String imageUrl;

    @NotBlank(message = "Vai trò của người dùng không được để trống")
    private String authority;


//    public boolean isValid() {
//        return StringUtils.hasLength(email)
//                && StringUtils.hasLength(firstName)
//                && StringUtils.hasLength(lastName)
//                && null != dateOfBirth
//                && StringUtils.hasLength(authority)
//                && StringUtils.hasLength(address)
//                && StringUtils.hasLength(gender);
//
//    }

//    public boolean isValidUpdate() {
//        return id > 0
//                && StringUtils.hasLength(firstName)
//                && StringUtils.hasLength(lastName)
//                && null != dateOfBirth
//                && StringUtils.hasLength(authority)
//                && StringUtils.hasLength(address)
//                && StringUtils.hasLength(gender);
//    }
}
