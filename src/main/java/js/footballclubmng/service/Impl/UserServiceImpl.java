package js.footballclubmng.service.Impl;

import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.Role;
import js.footballclubmng.entity.User;
import js.footballclubmng.repository.RoleRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.sql.Date;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserRegisterDto userRegisterDto) {
        User email = userRepository.findByEmail(userRegisterDto.getEmail());
        if(email!=null){
            return "Email đã tồn tại!";
        }
        if (!userRegisterDto.getPassword().equals(userRegisterDto.getRepassword())){
            return "Mật khẩu không khớp!";
        }

        User account = new User();
        LocalDate now = LocalDate.now();
        Date sqlDate = Date.valueOf(now);

        account.setFirstName(userRegisterDto.getFirstName());
        account.setLastName(userRegisterDto.getLastName());
        account.setEmail(userRegisterDto.getEmail());
        Role r = roleRepository.findById(3).orElse(null);
        account.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        account.setCreateTime(sqlDate);
        account.setRole(r);
        userRepository.save(account);
        return "Đăng ký thành công!";
    }
}
