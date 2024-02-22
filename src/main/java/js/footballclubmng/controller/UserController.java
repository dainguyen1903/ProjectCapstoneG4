package js.footballclubmng.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import js.footballclubmng.dto.ResponseModel;
import js.footballclubmng.dto.UserRegisterDto;
import js.footballclubmng.entity.Role;
import js.footballclubmng.entity.User;
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

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseModel> register(@RequestBody @Valid UserRegisterDto userRegisterDto){
        String result = userService.addUser(userRegisterDto);
        ResponseModel r = new ResponseModel("true", result, null);
        return new ResponseEntity<ResponseModel>(r, HttpStatus.OK);
    }

    @PutMapping("/verify-otp")
    public ResponseEntity<ResponseModel> verifyEmail(@RequestParam String email, @RequestParam String otp){
        String result = userService.verifyOtp(email,otp);
        ResponseModel r = new ResponseModel("true", result, null);
        return new ResponseEntity<ResponseModel>(r,HttpStatus.OK);
    }

    @PutMapping("/generrate-otp")
    public ResponseEntity<ResponseModel> generateOtp(@RequestParam String email){
        String result = userService.generateOtp(email);
        ResponseModel r = new ResponseModel("true", result, null);
        return new ResponseEntity<ResponseModel>(r,HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<ResponseModel> resetPassword(@RequestParam @Email(message = "Email không hợp lệ") String email){
        String result = userService.resetPassword(email);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseModel("true",result, null));
    }

    @PutMapping("/upadate-password")
    public ResponseEntity<ResponseModel> updatePassword(@RequestParam String email,@Min(value = 8, message = "Mật khẩu phải có ít nhất 8 ký tự") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\\S+$") @RequestParam String newPassword){
        String result = userService.updatePassword(email,newPassword);
        return ResponseEntity.status(HttpStatus.OK).body(
                new js.footballclubmng.dto.ResponseModel("true",result, null));
    }







}

