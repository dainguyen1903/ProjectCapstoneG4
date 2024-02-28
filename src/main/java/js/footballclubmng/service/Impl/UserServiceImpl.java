package js.footballclubmng.service.Impl;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.common.FootballclubmngUtils;
import js.footballclubmng.config.CustomerUserDetails;
import js.footballclubmng.config.TokenProvider;
import js.footballclubmng.config.WebSecurityConfig;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.bean.UserBean;
import js.footballclubmng.model.request.user.CreateUserRequest;
import js.footballclubmng.model.request.user.DeleteUserRequest;
import js.footballclubmng.model.response.LoginResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
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

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @Value("${spring.mail.sender.display-name} ")
    private String displayNameEmail;


    @Value("${spring.mail.username}")
    private String fromEmail;

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
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, "EMAIL EXISTED");
            } else {
                User userEntity = new User();
                if (file.getSize() > 0) {
                    userEntity.setImageUrl(FootballclubmngUtils.handleAvatar(file));
                }
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
}
