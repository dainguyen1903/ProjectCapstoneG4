package js.footballclubmng.config;

import js.footballclubmng.entity.User;
import js.footballclubmng.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceSecurity implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        User userEntity = userRepository.findByEmailAndDeleteFlg(email, "0");
        if(userEntity == null) {
            throw new UsernameNotFoundException(email);
        }
        return CustomerUserDetails.build(userEntity);
    }
}
