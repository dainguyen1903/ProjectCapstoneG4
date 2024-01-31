package js.footballclubmng.service.Impl;


import js.footballclubmng.entity.CustomUser;
import js.footballclubmng.entity.Role;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.RequestModel.RegisterRequestModel;
import js.footballclubmng.repository.RoleRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);

    }


    @Override

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw  new UsernameNotFoundException("User" + username + "was not found in the database");
        }
        //Get role of user
        Role roles = user.getRole();

        // Create GrantedAuthority of Spring for role
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        if(roles != null) {
                GrantedAuthority authority = new SimpleGrantedAuthority(roles.getRoleName());
                grantedAuthorities.add(authority);
        }
        return new CustomUser(
                user.getUsername(),
                user.getPassword(),
                grantedAuthorities,
                user.getPassword(),
                user.getCreateTime());

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
