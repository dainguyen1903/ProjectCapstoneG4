package js.footballclubmng.config;

import com.google.gson.JsonObject;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
@Component
public class AuthenticationEntryPointHandler implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse res, AuthenticationException authException) throws IOException, ServletException {
        res.setContentType("application/json;charset=UTF-8");
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("timestamp", String.valueOf(new Date()));
        jsonObject.addProperty("status", 401);
        jsonObject.addProperty("message", "Access Denied");
        jsonObject.addProperty("path", request.getRequestURI());
        res.getWriter().write(jsonObject.toString());
    }
}
