package js.footballclubmng.service;


import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public String addUser(UserRegisterDto userRegisterDto);

    String verifyEmail(String email, String otp);

    String generateOtp(String mail);
}

