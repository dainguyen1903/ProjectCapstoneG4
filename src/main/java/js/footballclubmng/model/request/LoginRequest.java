package js.footballclubmng.model.request;

import lombok.Data;
import org.springframework.util.StringUtils;
@Data
public class LoginRequest {
    private String email;
    private String password;

    public boolean isValid(){
        return StringUtils.hasLength(email) && StringUtils.hasLength(password);
    }
}
