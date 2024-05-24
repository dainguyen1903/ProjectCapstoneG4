package js.footballclubmng.service;

import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserProfileDto;
import js.footballclubmng.model.request.UpdatePasswordRequest;
import js.footballclubmng.model.request.UserRegisterRequest;
import js.footballclubmng.model.request.user.CreateUserRequest;
import js.footballclubmng.model.request.user.DeleteUserRequest;
import js.footballclubmng.model.request.user.UpdateUserRequest;
import js.footballclubmng.model.response.LoginResponse;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.model.response.UserDetailResponse;
import org.springframework.web.multipart.MultipartFile;


public interface UserService {
    public User getUserByEmail(String email);
    public LoginResponse handleLogin(String username, String password);
    public ResponseAPI<Object> createUser(CreateUserRequest request);
    public ResponseAPI<Object> updateUser(UpdateUserRequest request, Long id);
    public ResponseAPI<Object> getListSearch(String name);
    public ResponseAPI<Object> updateDeleteUser(DeleteUserRequest request);
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
    public ResponseAPI<UserDetailResponse> detailUser(Long id);
    public boolean isDateInThePast(String date);
    public boolean isUserExist(String email);
    public User findUserLocked(String email);
}
