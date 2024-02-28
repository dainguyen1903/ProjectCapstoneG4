package js.footballclubmng.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class OtpUtil {
    public String generateOtp(){
        Random random = new Random();
        String output = "";
        for (int i=0; i<6; i++){
            int randomNumber = random.nextInt(10);
            output += Integer.toString(randomNumber);
        }
        return output;
    }
}