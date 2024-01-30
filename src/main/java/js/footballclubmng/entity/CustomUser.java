package js.footballclubmng.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Setter
@ToString
public class CustomUser extends org.springframework.security.core.userdetails.User {
    private String customUserPassword;
    private long userCreateTime;

    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities, String customUserPassword, long userCreateTime) {
        super(username, password, authorities);
        this.customUserPassword = customUserPassword;
        this.userCreateTime = userCreateTime;
    }

}
