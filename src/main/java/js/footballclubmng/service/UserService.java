package js.footballclubmng.service;


import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public boolean addUser(UserRegisterDto userRegisterDto);
    public boolean verifyOtp(String email, String otp);
    public boolean generateOtp(String mail);
    public boolean resetPassword(String email);
    public boolean updatePassword(String email, String newPassword);
    public User findUserByEmail(String email);
}

