package js.footballclubmng.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "users")
public class User {
    @Id
    @Column(name = "user_id")
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

    @Column(name = "ward")
    private String ward;

    @Column(name = "district")
    private String district;

    @Column(name = "province")
    private String province;

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

    @Column(name = "otp")
    private String otp;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "delete_flg")
    private String deleteFlg;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private Cart cart;


//    @OneToMany(mappedBy = "user1")
//    private List<TicketOrder> ticketOrders;

    @OneToMany(mappedBy = "user",  cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orderList;


    public User(String firstName, String lastName, String email, String password, LocalDateTime createTime, String role, String otp, LocalDateTime otpGenerateTime) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createTime = createTime;
        this.authority = role;
        this.otp = otp;
        this.otpGenerateTime = otpGenerateTime;
    }
}
