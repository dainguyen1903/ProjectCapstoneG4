package js.footballclubmng.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "role_id")
    private int roleId;

    @Column(name = "role_name")
    private String roleName;

    @OneToMany(mappedBy = "role")
    private Set<User> users;

    public Role(String roleName) {
        this.roleName = roleName;
    }
}

