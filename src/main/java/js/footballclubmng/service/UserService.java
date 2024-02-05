package js.footballclubmng.service;


import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public String addUser(UserRegisterDto userRegisterDto);
}

