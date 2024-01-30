package js.footballclubmng.service.Impl;

import js.footballclubmng.entity.CustomUser;
import js.footballclubmng.entity.Role;
import js.footballclubmng.entity.User;
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
    }
}
