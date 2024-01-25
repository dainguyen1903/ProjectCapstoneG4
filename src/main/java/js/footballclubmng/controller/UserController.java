package js.footballclubmng.controller;

import js.footballclubmng.entity.User;
import js.footballclubmng.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity login (@RequestBody User user) {
        List<User> account = userRepository.findByAccountAndPassword(user.getAccount(), user.getPassword());
        return new ResponseEntity(account, HttpStatus.OK);
    }


}
