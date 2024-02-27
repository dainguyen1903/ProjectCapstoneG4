package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "user")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "email",nullable = false,unique = true)
    public String email;

    @Column(name = "password",nullable = false)
    public String password;

    @Column(name = "role", length = 1,nullable = false)
    public String authority;

    @Column(name = "first_name")
    public String firstName;

    @Column(name = "last_name")
    public String lastName;

    @Column(name = "address")
    public String address;

    @Column(name = "date_of_birth")
    public Date dateOfBirth;

    @Column(name = "gender", length = 1)
    public String gender;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "otp_generate_time")
    public Date otpGenerateTime;

    @Column(name = "create_time")
    public Date createTime;

    @Column(name = "verification_code")
    public String verificationCode;

    @Column(name = "is_active")
    public Boolean isActive;

    @Column(name = "delete_flg")
    public String deleteFlg;

}
