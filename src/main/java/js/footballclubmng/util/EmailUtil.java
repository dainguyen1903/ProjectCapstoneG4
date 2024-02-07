package js.footballclubmng.util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {
    @Autowired
    private JavaMailSender javaMailSender;
    public void sendOtpEmail(String email, String otp){
        SimpleMailMessage simpleMailMessage =new SimpleMailMessage();
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject("Xác nhận mã OTP");
        simpleMailMessage.setText("Mã OTP của bạn là: " + otp);
        javaMailSender.send(simpleMailMessage);
    }

//    public void sendEmail(String email){
//        SimpleMailMessage simpleMailMessage =new SimpleMailMessage();
//        simpleMailMessage.setTo(email);
//        simpleMailMessage.setSubject("Xác nhận mail");
//        simpleMailMessage.setText("send mail ");
//        javaMailSender.send(simpleMailMessage);
//    }
}
