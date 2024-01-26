package js.footballclubmng.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    String account;
    String password;
    String create_time;
    Integer role_id;
    String gmail;

    @OneToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    private Role role;

    public User(String account, String password, String create_time, Integer role_id, String gmail) {
        this.account = account;
        this.password = password;
        this.create_time = create_time;
        this.role_id = role_id;
        this.gmail = gmail;
    }
}