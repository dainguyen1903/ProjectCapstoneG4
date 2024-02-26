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
import js.footballclubmng.util.EmailUtil;
import js.footballclubmng.util.HelperUtil;
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

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseModel> register(@RequestBody @Valid UserRegisterDto userRegisterDto) {
        User user = userService.findUserByEmail(userRegisterDto.getEmail());
        if (user != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Email đã tồn tại!" , null));
        }
        if (!userRegisterDto.getPassword().equals(userRegisterDto.getRepassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Mật khẩu không khớp!" , null));
        }
        boolean result = userService.addUser(userRegisterDto);
        if (result == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Đăng ký thất bại" , null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseModel("true", "Mã OTP đã được gửi đến Email của bạn, vui lòng xác minh OTP trong vòng 60 giây" , null));
    }

    @PutMapping("/verify-otp")
    public ResponseEntity<ResponseModel> verifyEmail(@RequestParam String email, @RequestParam String otp) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Email không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseModel("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.verifyOtp(email, otp);
        if (result == false) {
            ResponseModel r = new ResponseModel("false", "Vui lòng tạo lại OTP và thử lại.", null);
            return new ResponseEntity<ResponseModel>(r, HttpStatus.BAD_REQUEST);
        }
        ResponseModel r = new ResponseModel("true", "Xác minh OTP thành công", null);
        return new ResponseEntity<ResponseModel>(r, HttpStatus.OK);
    }

    @PutMapping("/generrate-otp")
    public ResponseEntity<ResponseModel> generateOtp(@RequestParam String email) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Email không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseModel("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.generateOtp(email);
        if (result == false){
            ResponseModel r = new ResponseModel("false", "Không gửi được OTP", null);
            return new ResponseEntity<ResponseModel>(r, HttpStatus.BAD_REQUEST);
        }
        ResponseModel r = new ResponseModel("true", "Mã OTP mới đã được gửi tới Email của bạn, vui lòng xác minh OTP trong vòng 60 giây", null);
        return new ResponseEntity<ResponseModel>(r, HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<ResponseModel> resetPassword(@RequestParam String email) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Email không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseModel("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.resetPassword(email);
        if (result == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "", null));

        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseModel("true", "Mã OTP mới đã được gửi tới email của bạn, vui lòng xác minh OTP trong vòng 60 giây", null));
    }

    @PutMapping("/update-password")
    public ResponseEntity<ResponseModel> updatePassword(@RequestParam String email, @RequestParam String newPassword) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Email không hợp lệ", null));
        }
        if (!HelperUtil.patternMatches(newPassword)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseModel("false", "Mật khẩu không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseModel("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.updatePassword(email, newPassword);
        if (result == false) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new js.footballclubmng.dto.ResponseModel("false", "Cập nhật thất bại", null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new js.footballclubmng.dto.ResponseModel("true", "Cập nhật thành công", null));
    }
}

