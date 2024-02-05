package js.footballclubmng.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
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
    private Date createTime;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public User(String firstName, String lastName, String email, String password, Date createTime, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createTime = createTime;
        this.role = role;
    }
}

