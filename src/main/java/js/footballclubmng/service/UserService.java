package js.footballclubmng.service;


import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public String addUser(UserRegisterDto userRegisterDto);
    public String verifyOtp(String email, String otp);
    public String generateOtp(String mail);
    public String resetPassword(String email);
    public String updatePassword(String email, String newPassword);
}

