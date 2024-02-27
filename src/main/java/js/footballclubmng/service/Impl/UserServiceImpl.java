package js.footballclubmng.service.Impl;

import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.User;
import js.footballclubmng.repository.RoleRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import js.footballclubmng.util.EmailUtil;
import js.footballclubmng.util.HelperUtil;
import js.footballclubmng.util.OtpUtil;
import org.hibernate.id.uuid.Helper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

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
    public boolean addUser(UserRegisterDto userRegisterDto) {
        try {
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
            account.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
            account.setRole("user");
            account.setCreateTime(LocalDateTime.now());
            account.setOtp(otp);
            account.setOtpGenerateTime(LocalDateTime.now());
            userRepository.save(account);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        try {
            User user = userRepository.findByEmail(email);
            if (user.getOtp().equals(otp)) {
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime u = user.getOtpGenerateTime();
                if (Duration.between(u, now).getSeconds() < 60) {
                    user.setActive(true);
                    userRepository.save(user);
                    return true;
                }
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }


    public boolean generateOtp(String email) {
        try {
            User user = userRepository.findByEmail(email);
            String otp = otpUtil.generateOtp();
            try {
                emailUtil.sendOtpEmail(email, otp);
            } catch (Exception e) {
                throw new RuntimeException("Không thể gửi OTP vui lòng thử lại!");
            }
            user.setOtp(otp);
            user.setOtpGenerateTime(LocalDateTime.now());
            userRepository.save(user);
            return true;
        }catch (Exception e){
            return false;
        }
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

    public boolean resetPassword(String email) {
        try {
            User user = userRepository.findByEmail(email);
            String otp = otpUtil.generateOtp();
            try {
                emailUtil.sendOtpEmail(email, otp);
            } catch (Exception e) {
                throw new RuntimeException("Không thể gửi otp vui lòng thử lại!");
            }
            user.setOtp(otp);
            user.setOtpGenerateTime(LocalDateTime.now());
            userRepository.save(user);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    public boolean updatePassword(String email, String newPassword) {
        try {
            User user = userRepository.findByEmail(email);
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public User findUserByEmail(String email) {
        try {
            User user = userRepository.findByEmail(email);
            return user;
        } catch (Exception e) {
            return null;
        }
    }

}
