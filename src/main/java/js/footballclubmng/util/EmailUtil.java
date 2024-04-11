package js.footballclubmng.util;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.regex.Pattern;

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
//    public void sendReSetPasswordEmail(String email, String link){
//        SimpleMailMessage simpleMailMessage =new SimpleMailMessage();
//        simpleMailMessage.setTo(email);
//        simpleMailMessage.setSubject("Đặt lại mật khẩu ");
//        String content= "Click <a href='" + link + "'>Đổi mật khẩu tại đây</a> để đặt lại mật khẩu của bạn.";
//        simpleMailMessage.setText(content);
//        javaMailSender.send(simpleMailMessage);
//    }

    public void sendInformationTicket(String email, String qrCode) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Thông tin mua vé");
            String content = "Click <a href='" + qrCode + "'>Đổi mật khẩu tại đây</a> để đặt lại mật khẩu của bạn.";
            helper.setText(content, true);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

//    public void sendEmail(String email){
//        SimpleMailMessage simpleMailMessage =new SimpleMailMessage();
//        simpleMailMessage.setTo(email);
//        simpleMailMessage.setSubject("Xác nhận mail");
//        simpleMailMessage.setText("send mail ");
//        javaMailSender.send(simpleMailMessage);
//    }
    public static boolean patternMatches(String email) {
        String regexPattern = "^[\\w.+\\-]+@gmail\\.com$";
        boolean check = Pattern.compile(regexPattern)
                .matcher(email)
                .matches();
        return check;
    }


}
