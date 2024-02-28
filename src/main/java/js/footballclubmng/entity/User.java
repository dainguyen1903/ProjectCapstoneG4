package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "users")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email",nullable = false,unique = true)
    private String email;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "role", length = 20,nullable = false)
    private String authority;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "address")
    private String address;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "gender", length = 1)
    private String gender;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "otp_generate_time")
    private LocalDateTime otpGenerateTime;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "delete_flg")
    private String deleteFlg;

}
