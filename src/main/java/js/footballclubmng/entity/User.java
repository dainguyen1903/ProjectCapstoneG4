package js.footballclubmng.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String email;
    private String password;
    private String address;
    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    private String gender;
    @Column(name = "image_url")
    private String image;
    @Column(name = "create_time")
    private LocalDateTime createTime;
    private String role;
    @Column(name = "is_active")
    private boolean active;
    private String otp;
    @Column(name = "otp_generate_time")
    private LocalDateTime otpGenerateTime;
    @OneToMany(mappedBy = "user")
    private List<NewsComment> newsComments;

    public User(String firstName, String lastName, String email, String password, LocalDateTime createTime, String role, String otp, LocalDateTime otpGenerateTime) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createTime = createTime;
        this.role = role;
        this.otp = otp;
        this.otpGenerateTime = otpGenerateTime;
    }
}
