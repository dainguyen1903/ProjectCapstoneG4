package js.footballclubmng.service.Impl;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.common.FootballclubmngUtils;
import js.footballclubmng.config.CustomerUserDetails;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.config.WebSecurityConfig;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserProfileDto;
import js.footballclubmng.model.request.UpdatePasswordRequest;
import js.footballclubmng.model.request.UserRegisterRequest;
import js.footballclubmng.model.bean.UserBean;
import js.footballclubmng.model.request.user.CreateUserRequest;
import js.footballclubmng.model.request.user.DeleteUserRequest;
import js.footballclubmng.model.response.LoginResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import js.footballclubmng.util.EmailUtil;
import js.footballclubmng.util.OtpUtil;
import net.bytebuddy.utility.RandomString;
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

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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

//    @Value("${spring.mail.sender.display-name} ")
//    private String displayNameEmail;

    @Autowired
    EmailUtil emailUtil;

    @Autowired
    OtpUtil otpUtil;

//    @Value("${spring.mail.username}")
//    private String fromEmail;

    @Override
    public User getUserByEmail(String email) {
        try {
            User result = userRepository.findByEmailAndIsActiveAndDeleteFlg(email, true, "0");
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
    public ResponseAPI<Object> createUser(CreateUserRequest request, String getSiteUrl) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, "EMAIL EXISTED");
            } else {
                User userEntity = new User();

                userEntity.setEmail(request.getEmail());
                userEntity.setFirstName(request.getFirstName());
                userEntity.setLastName(request.getLastName());
                userEntity.setAuthority(request.getAuthority());
                userEntity.setDateOfBirth(new SimpleDateFormat("yyyy-MM-dd").parse(request.getDateOfBirth()));
                userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
                userEntity.setIsActive(false);
                userEntity.setDeleteFlg("0");
                userEntity.setCreateTime(LocalDateTime.now());
                userEntity.setGender(request.getGender());
                userEntity.setAddress(request.getAddress());
                String resetCode = RandomString.make(64);
                userEntity.setVerificationCode(resetCode);

                //sendMail
//                activeCreateUser(request, resetCode, getSiteUrl);

                userRepository.saveAndFlush(userEntity);
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, "OK");
            }
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EXCEPTION, CommonConstant.COMMON_MESSAGE.EXCEPTION);
        }
    }

    @Override
    public ResponseAPI<Object> updateUser(CreateUserRequest request, MultipartFile file) {
        try {

            User userUpdate = userRepository.findByIdAndDeleteFlg(request.getId(),  "0");
            if (null != userUpdate) {
                if (file.getSize() > 0) {
                    userUpdate.setImageUrl(FootballclubmngUtils.handleAvatar(file));
                }
                userUpdate.setFirstName(request.getFirstName());
                userUpdate.setLastName(request.getLastName());
                userUpdate.setAuthority(request.getAuthority());
                userUpdate.setDateOfBirth(new SimpleDateFormat("yyyy-MM-dd").parse(request.getDateOfBirth()));
                userUpdate.setGender(request.getGender());
                userUpdate.setAddress(request.getAddress());
                userRepository.saveAndFlush(userUpdate);
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, "OK");
            } else {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, "ERROR_UPDATE");
            }
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EXCEPTION, CommonConstant.COMMON_MESSAGE.EXCEPTION);
        }
    }

    @Override
    public ResponseAPI<Object> activeThroughEmail(String verificationCode, String email) {
        return null;
    }

    @Override
    public ResponseAPI<Object> getListSearch(String name) {
        try {
            if (null == name) {
                name = "";
            }
            List<User> getListSearch = userRepository.getByName(name);
            if (null != getListSearch && !getListSearch.isEmpty()) {
                List<UserBean> listResponse = new ArrayList<>();
                for (User user : getListSearch) {
                    listResponse.add(FootballclubmngUtils.convertUserToBeans(user));
                }
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.OK, listResponse);
            }
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, CommonConstant.COMMON_MESSAGE.EMPTY);
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EXCEPTION, CommonConstant.COMMON_MESSAGE.EXCEPTION);
        }
    }

    @Override
    public ResponseAPI<Object> deleteUser(DeleteUserRequest request) {
        try {
            User deleteUser = userRepository.findByIdAndDeleteFlg(request.getId(), "0");
            if (null != deleteUser) {
                deleteUser.setDeleteFlg("1"); //1 là bị xóa mềm, 0 là chưa xóa
                userRepository.saveAndFlush(deleteUser);
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.OK);
            }
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, "ERROR");

        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EXCEPTION, e.getMessage());
        }
    }

    @Override
    public boolean addUser(UserRegisterRequest userRegisterRequest) {
        try {
            String otp = otpUtil.generateOtp();
            try {
                emailUtil.sendOtpEmail(userRegisterRequest.getEmail(), otp);
            } catch (Exception e) {
                throw new RuntimeException("Không thể gửi OTP vui lòng thử lại!");
            }
            User account = new User();
            account.setFirstName(userRegisterRequest.getFirstName());
            account.setLastName(userRegisterRequest.getLastName());
            account.setEmail(userRegisterRequest.getEmail());
            account.setPassword(passwordEncoder.encode(userRegisterRequest.getPassword()));
            account.setAuthority("User");
            account.setIsActive(false);
            account.setDeleteFlg("1");
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
                if (Duration.between(u, now).getSeconds() < 120) {
                    user.setIsActive(true);
                    user.setDeleteFlg("0");
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
        } catch (Exception e) {
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
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    public boolean updatePassword(String email, UpdatePasswordRequest updatePasswordRequest) {
        try {
            User user = userRepository.findByEmail(email);
            user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public ResponseAPI<Object> detailUser(long id) {
        try {
            User detailUser =  userRepository.findByIdAndDeleteFlg(id, "0");
            if (null != detailUser ) {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.OK, FootballclubmngUtils.convertUserToBeans(detailUser));
            }
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, "NOT_FIND_USER");
        } catch (Exception e) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EXCEPTION, CommonConstant.COMMON_MESSAGE.EXCEPTION);
        }
    }

    @Override
    public User findUserLocked(String email){
        try {
            User user = userRepository.findByEmail(email);
            if (user.getIsActive() && user.getDeleteFlg().equals("1")){
                return user;
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    @Override
    public User findUserByEmailForRegister(String email) {
        try {
            User user = userRepository.checkEmailExist(email);
            if (user.getIsActive() && user.getDeleteFlg().equals("0")) {
                return user;
            }
            if (!user.getIsActive()) {
                userRepository.delete(user);
                return null;
            }
        } catch (Exception e) {
            return null;
        }
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
    public UserProfileDto userProfile(String token) {
        try {
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);
            if (user != null) {
                UserProfileDto userProfileDto = new UserProfileDto();
                userProfileDto.setFirstName(user.getFirstName());
                userProfileDto.setLastName(user.getLastName());
                userProfileDto.setEmail(user.getEmail());
                userProfileDto.setAddress(user.getAddress());
                if (user.getDateOfBirth() != null) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    String dateString = sdf.format(user.getDateOfBirth());
                    userProfileDto.setDateOfBirth(dateString);
                }
                userProfileDto.setGender(user.getGender());
                userProfileDto.setImage(user.getImageUrl());
                userProfileDto.setDistrict(user.getDistrict());
                userProfileDto.setWard(user.getWard());
                userProfileDto.setProvince(user.getProvince());
                return userProfileDto;
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    @Override
    public boolean updateProfile(UserProfileDto userProfileDto, String token) {
        try {
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);
            if (user != null) {
                user.setFirstName(userProfileDto.getFirstName());
                user.setLastName(userProfileDto.getLastName());
                user.setEmail(userProfileDto.getEmail());
                user.setAddress(userProfileDto.getAddress());
                if (userProfileDto.getDateOfBirth() != null && !userProfileDto.getDateOfBirth().isEmpty()){
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date date = sdf.parse(userProfileDto.getDateOfBirth());
                    user.setDateOfBirth(date);
                }
                user.setGender(userProfileDto.getGender());
                user.setImageUrl(userProfileDto.getImage());
                user.setDistrict(userProfileDto.getDistrict());
                user.setWard(userProfileDto.getWard());
                user.setProvince(userProfileDto.getProvince());
                userRepository.save(user);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    public static Date getPreviousDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date); // Đặt ngày muốn xem
        calendar.add(Calendar.DAY_OF_MONTH, -1); // Trừ một ngày
        return calendar.getTime(); // Trả về ngày trước đó
    }
    public boolean isDateInThePast(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date d = sdf.parse(date);
            Date currentDate = new Date();
            Date previousDate = getPreviousDate(currentDate);
            if (d.before(previousDate)) {
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
    @Override
    public boolean changePassword(String token, UpdatePasswordRequest updatePasswordRequest) {
        try {
            String jwtToken = token.substring(7);
            String email = tokenProvider.getUsernameFromJWT(jwtToken);
            User user = userRepository.findByEmail(email);
            if (user != null) {
                user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
                userRepository.save(user);
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }
}

