package js.footballclubmng.service.Impl;

import js.footballclubmng.config.CustomerUserDetails;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.config.WebSecurityConfig;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserProfileDto;
import js.footballclubmng.model.dto.UserRegisterDto;
import js.footballclubmng.model.request.user.CreateUserRequest;
import js.footballclubmng.model.request.user.DeleteUserRequest;
import js.footballclubmng.model.response.LoginResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import js.footballclubmng.util.EmailUtil;
import js.footballclubmng.util.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    WebSecurityConfig securityConfig;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    EmailUtil emailUtil;

    @Autowired
    OtpUtil otpUtil;

//    @Value("${spring.mail.sender.display-name}")
//    private String displayNameEmail;
//
//
//    @Value("${spring.mail.username}")
//    private String fromEmail;

    @Override
    public User getUserByEmail(String email) {
        try {
            User result = userRepository.findByEmailAndDeleteFlg(email, "0");
            if (result == null || null == result.getEmail()) {
                return null;
            } else {
                return result;
            }
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public LoginResponse handleLogin(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            // Nếu không xảy ra exception tức là thông tin hợp lệ
            // Set thông tin authentication vào Security Context
            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomerUserDetails authenUser = (CustomerUserDetails) authentication.getPrincipal();
            User user = this.getUserByEmail(authenUser.getUsername());
            // Trả về jwt cho người dùng.
            String jwt = tokenProvider.generateJwtToken(user.getEmail());
            String role = user.getAuthority();
            return new LoginResponse(email, user.getId(), jwt, role);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(e.getMessage(), e);
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage(), ex);
        }
    }

    @Override
    public ResponseAPI<Object> createUser(CreateUserRequest request, MultipartFile file, String getSiteUrl) {
        return null;
    }

    @Override
    public ResponseAPI<Object> updateUser(CreateUserRequest request, MultipartFile file) {
        return null;
    }

    @Override
    public ResponseAPI<Object> activeThroughEmail(String verificationCode, String email) {
        return null;
    }

    @Override
    public ResponseAPI<Object> getListSearch(String name) {
        return null;
    }

    @Override
    public ResponseAPI<Object> deleteUser(DeleteUserRequest request) {
        return null;
    }

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
            account.setAuthority("user");
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
                    user.setIsActive(true);
                    userRepository.save(user);
                    return true;
                }
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    @Override
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

    @Override
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


    @Override
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

    @Override
    public ResponseAPI<Object> detailUser(long id) {
        return null;
    }

    public User findUserByEmail(String email) {
        try {
            User user = userRepository.findByEmail(email);
            return user;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserProfileDto userprofile() {
        return null;
    }
}

