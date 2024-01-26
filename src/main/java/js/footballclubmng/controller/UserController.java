package js.footballclubmng.controller;

import js.footballclubmng.entity.Role;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.RequestModel.RegisterRequestModel;
import js.footballclubmng.model.ResponseModel;
import js.footballclubmng.repository.RoleRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    UserService userService;

    public UserController(UserService  userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity login (@RequestBody User user) {
        List<User> account = userRepository.findByAccountAndPassword(user.getAccount(), user.getPassword());
        return new ResponseEntity(account, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseModel> register(@RequestBody RegisterRequestModel request){
        String result = userService.addUser(request);
        ResponseModel r = new ResponseModel("true", result, null);

        return new ResponseEntity<ResponseModel>(r,HttpStatus.OK) ;
    }

    @GetMapping("/getrole")
    public List<Role> getRole(){
        List<Role> l = roleRepository.findAll();
        return l;
    }



}