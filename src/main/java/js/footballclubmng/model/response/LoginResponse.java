package js.footballclubmng.model.response;

import lombok.Data;

@Data
public class LoginResponse {

    private String email;
    private long userId;
    private String accessToken;
    private String tokenType = "Bearer";
    private String role;

    public LoginResponse(String email, String accessToken) {
        this.setEmail(email);
        this.setAccessToken(accessToken);
    }

    public LoginResponse(String email, long userId, String accessToken, String role) {
        this.email = email;
        this.userId = userId;
        this.accessToken = accessToken;
        this.role = role;
    }

    public LoginResponse(String email, String accessToken, String role) {
        this.setEmail(email);
        this.setAccessToken(accessToken);
        this.setRole(role);
    }
}
