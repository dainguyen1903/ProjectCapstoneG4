package js.footballclubmng.entity;

import jakarta.persistence.*;
import lombok.*;


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
    private String username;
    private String password;
    private long createTime;
    @Column(name = "role_id")
    private int roleId;
    @ManyToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private Role role;
    @OneToOne
    @JoinColumn(name = "user_detail_id")
    private UserDetail userDetail;

}

