package js.footballclubmng.util;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class HelperUtil {
    public static boolean patternMatches(String password) {
        String regexPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S{8,}$";
        boolean check = Pattern.compile(regexPattern)
                .matcher(password)
                .matches();
        return check;
    }
}
