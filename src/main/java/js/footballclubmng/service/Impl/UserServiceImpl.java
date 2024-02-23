package js.footballclubmng.service.Impl;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.Role;
import js.footballclubmng.entity.User;
import js.footballclubmng.repository.RoleRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import js.footballclubmng.util.EmailUtil;
import js.footballclubmng.util.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private OtpUtil otpUtil;
    @Autowired
    private EmailUtil emailUtil;

    @Override
    public String addUser(UserRegisterDto userRegisterDto) {
        User email = userRepository.findByEmail(userRegisterDto.getEmail());
        if(email!=null){
            return "Email đã tồn tại!";
        }
        if (!userRegisterDto.getPassword().equals(userRegisterDto.getRepassword())){
            return "Mật khẩu không khớp!";
        }
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(userRegisterDto.getEmail(), otp);
        } catch (Exception e) {
            throw new RuntimeException("Không thể gửi OTP vui lòng thử lại!");
        }
        User account = new User();
        account.setFirstName(userRegisterDto.getFirstName());
        account.setLastName(userRegisterDto.getLastName());
        account.setEmail(userRegisterDto.getEmail());
        Role r = roleRepository.findById(3).orElse(null);
        account.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        account.setCreateTime(LocalDateTime.now());
        account.setRole("user");
        account.setOtp(otp);
        account.setOtpGenerateTime(LocalDateTime.now());
        userRepository.save(account);
        return "Đăng ký thành công. Mã OTP đã được gửi đến Email của bạn, vui lòng xác minh OTP trong vòng 60 giây";
    }

    @Override
    public String verifyOtp(String email, String otp){
         User user = userRepository.findByEmail(email);
        if (user==null){
            return "không tìm thấy email!" + email;
        }

        if (user.getOtp().equals(otp)){
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime u = user.getOtpGenerateTime();
            if(Duration.between(u,now).getSeconds()<60){
                user.setActive(true);
                userRepository.save(user);
                return "Xác minh OTP thành công";
            }
        }
        return "Vui lòng tạo lại OTP và thử lại.";
    }


    public String generateOtp(String email){
        User user = userRepository.findByEmail(email);
        if (user==null){
            return "không tìm thấy email: " + email;
        }
        String otp =otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(email, otp);
        } catch (Exception e) {
            throw new RuntimeException("Không thể gửi OTP vui lòng thử lại!");
        }
        user.setOtp(otp);
        user.setOtpGenerateTime(LocalDateTime.now());
        userRepository.save(user);
        return "Mã OTP mới đã được gửi tới Email của bạn, vui lòng xác minh OTP trong vòng 60 giây";
    }

//    public String resetPassword(String email){
//        User user = userRepository.findByEmail(email);
//        if (user==null){
//            return "email của bạn không đúng!";
//        }
//        String token = UUID.randomUUID().toString().replace("-", "").substring(0, 30);
//        user.setResetPasswordToken(token);
//        userRepository.save(user);
//        String link = "http://localhost:8090/user/reset?token=" + token;
//        emailUtil.sendReSetPasswordEmail(email,link);
//        return "Link đặt lại mật khẩu đã được gửi đến email của bạn.";
//    }

//    public User getToken(String resetPasswordToken ){
//        return userRepository.findByResetPasswordToken(resetPasswordToken);
//    }

    public String resetPassword(String email){
        User user = userRepository.findByEmail(email);
        if (user==null){
            return "không tìm thấy email: " + email;
        }
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(email, otp);
        } catch (Exception e) {
            throw new RuntimeException("Không thể gửi otp vui lòng thử lại!");
        }
        user.setOtp(otp);
        user.setOtpGenerateTime(LocalDateTime.now());
        userRepository.save(user);
        return "Mã OTP mới đã được gửi tới email của bạn, vui lòng xác minh OTP trong vòng 60 giây";
    }

    public String updatePassword(String email, String newPassword){
        User user = userRepository.findByEmail(email);
        if (user==null){
            return "không tìm thấy email: " + email;
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "Đổi mật khẩu thành công";
    }








}
