package js.footballclubmng.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailResponse {
    private Long id;

    private String email;

    private String password;

    private String authority;

    private String firstName;

    private String lastName;

    private String address;

    private String ward;

    private String district;

    private String province;

    private Date dateOfBirth;

    private String gender;

    private String imageUrl;

    private LocalDateTime otpGenerateTime;

    private LocalDateTime createTime;

    private String otp;

    private String verificationCode;

    private Boolean isActive;

    private String deleteFlg;
}
