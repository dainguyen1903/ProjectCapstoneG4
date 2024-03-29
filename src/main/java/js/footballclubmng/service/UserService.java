package js.footballclubmng.service;

import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserProfileDto;
import js.footballclubmng.model.request.UpdatePasswordRequest;
import js.footballclubmng.model.request.UserRegisterRequest;
import js.footballclubmng.model.request.user.CreateUserRequest;
import js.footballclubmng.model.request.user.DeleteUserRequest;
import js.footballclubmng.model.response.LoginResponse;
import js.footballclubmng.model.response.ResponseAPI;
import org.springframework.web.multipart.MultipartFile;


public interface UserService {
    public User getUserByEmail(String email);
    public LoginResponse handleLogin(String username, String password);
    public ResponseAPI<Object> createUser(CreateUserRequest request, MultipartFile file, String getSiteUrl);
    public ResponseAPI<Object> updateUser(CreateUserRequest request, MultipartFile file);
    public ResponseAPI<Object> activeThroughEmail(String verificationCode, String email);
    public ResponseAPI<Object> getListSearch(String name);
    public ResponseAPI<Object> deleteUser(DeleteUserRequest request);
//    public ResponseAPI<Object> changePassword(ChangePasswordRequest request, UserBean bean);
    public boolean addUser(UserRegisterRequest userRegisterRequest);
    public boolean verifyOtp(String email, String otp);
    public boolean generateOtp(String mail);
    public boolean resetPassword(String email);
    public boolean updatePassword(String email, UpdatePasswordRequest updatePasswordRequest);
    public User findUserByEmail(String email);
    public User findUserByEmailForRegister(String email);
    public UserProfileDto userProfile(String token);
    public boolean updateProfile(UserProfileDto userProfileDto, String token);
    public boolean changePassword(String token, UpdatePasswordRequest updatePasswordRequest);
    public ResponseAPI<Object> detailUser(long id);
}
