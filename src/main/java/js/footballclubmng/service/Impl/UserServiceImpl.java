package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.Role;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.RequestModel.RegisterRequestModel;
import js.footballclubmng.repository.RoleRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public String addUser(RegisterRequestModel request) {
        User user = userRepository.findByAccount(request.getAccount());
        User gmail = userRepository.findByGmail(request.getGmail());
        if(user!=null || gmail!=null){
            return "Account is exist! ";
        }
        User account = new User();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        Role role = roleRepository.findById(1).orElse(null);
        account.setAccount(request.getAccount());
        account.setPassword(request.getPassword());
        account.setGmail(request.getGmail());
      //  account.setRole(role);
        account.setRole_id(1);
        account.setCreate_time(dtf.format(now));
        userRepository.save(account);
        return "Register successfully!";
    }
}
