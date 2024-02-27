package js.footballclubmng.service;

import js.footballclubmng.entity.User;
import js.footballclubmng.model.bean.UserBean;
import js.footballclubmng.model.request.user.CreateUserRequest;
import js.footballclubmng.model.request.user.DeleteUserRequest;
import js.footballclubmng.model.response.LoginResponse;
import js.footballclubmng.model.response.ResponseAPI;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {
    public User getUserByEmail(String email);
    public LoginResponse handleLogin(String username, String password);
    public ResponseAPI<Object> createUser(CreateUserRequest request, MultipartFile file, String getSiteUrl);
    public ResponseAPI<Object> updateUser(CreateUserRequest request, MultipartFile file);
    public ResponseAPI<Object> activeThroughEmail(String verificationCode, String email);
    public ResponseAPI<Object> getListSearch(String name);
    public ResponseAPI<Object> deleteUser(DeleteUserRequest request);
//    public ResponseAPI<Object> changePassword(ChangePasswordRequest request, UserBean bean);

    public ResponseAPI<Object> detailUser(long id);
}
