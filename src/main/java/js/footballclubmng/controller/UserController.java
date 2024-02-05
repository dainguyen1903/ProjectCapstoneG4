package js.footballclubmng.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import js.footballclubmng.dto.ResponseModel;
import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.Role;
import js.footballclubmng.repository.RoleRepository;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserService userService;
    public UserController(UserService  userService) {
        this.userService = userService;
    }

    @Autowired RoleRepository roleRepository;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseModel> register(@RequestBody UserRegisterDto userRegisterDto){
        String result = userService.addUser(userRegisterDto);
        ResponseModel r = new ResponseModel("true", result, null);
        return new ResponseEntity<ResponseModel>(r, HttpStatus.OK) ;
    }

    @GetMapping("/getrole")
    public List<Role> getRole(){
        List<Role> l = roleRepository.findAll();
        return l;
    }

}

