package js.footballclubmng.service;

import js.footballclubmng.dto.UserDTO;
import js.footballclubmng.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User findUserByUsername(String username);
}
