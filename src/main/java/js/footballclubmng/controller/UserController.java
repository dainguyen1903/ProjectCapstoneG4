package js.footballclubmng.controller;

import jakarta.validation.Valid;
import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.response.ResponseApi;
import js.footballclubmng.model.dto.UserRegisterDto;
import js.footballclubmng.entity.User;
import js.footballclubmng.service.UserService;
import js.footballclubmng.util.EmailUtil;
import js.footballclubmng.util.HelperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {


    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping(CommonConstant.USER_API.REGISTER)
    public ResponseEntity<ResponseApi> register(@RequestBody @Valid UserRegisterDto userRegisterDto) {
        User user = userService.findUserByEmail(userRegisterDto.getEmail());
        if (user != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Email đã tồn tại!" , null));
        }
        if (!userRegisterDto.getPassword().equals(userRegisterDto.getRepassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Mật khẩu không khớp!" , null));
        }
        boolean result = userService.addUser(userRegisterDto);
        if (result == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Đăng ký thất bại" , null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseApi("true", "Mã OTP đã được gửi đến Email của bạn, vui lòng xác minh OTP trong vòng 60 giây" , null));
    }

    @PutMapping(CommonConstant.USER_API.VERIFY_OTP)
    public ResponseEntity<ResponseApi> verifyEmail(@RequestParam String email, @RequestParam String otp) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Email không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseApi("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.verifyOtp(email, otp);
        if (result == false) {
            ResponseApi r = new ResponseApi("false", "Vui lòng tạo lại OTP và thử lại.", null);
            return new ResponseEntity<ResponseApi>(r, HttpStatus.BAD_REQUEST);
        }
        ResponseApi r = new ResponseApi("true", "Xác minh OTP thành công", null);
        return new ResponseEntity<ResponseApi>(r, HttpStatus.OK);
    }

    @PutMapping(CommonConstant.USER_API.GENERATE_OTP)
    public ResponseEntity<ResponseApi> generateOtp(@RequestParam String email) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Email không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseApi("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.generateOtp(email);
        if (result == false){
            ResponseApi r = new ResponseApi("false", "Không gửi được OTP", null);
            return new ResponseEntity<ResponseApi>(r, HttpStatus.BAD_REQUEST);
        }
        ResponseApi r = new ResponseApi("true", "Mã OTP mới đã được gửi tới Email của bạn, vui lòng xác minh OTP trong vòng 60 giây", null);
        return new ResponseEntity<ResponseApi>(r, HttpStatus.OK);
    }

    @PutMapping(CommonConstant.USER_API.RESET_PASSWORD)
    public ResponseEntity<ResponseApi> resetPassword(@RequestParam String email) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Email không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseApi("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.resetPassword(email);
        if (result == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "", null));

        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseApi("true", "Mã OTP mới đã được gửi tới email của bạn, vui lòng xác minh OTP trong vòng 60 giây", null));
    }

    @PutMapping(CommonConstant.USER_API.UPDATE_PASSWORD)
    public ResponseEntity<ResponseApi> updatePassword(@RequestParam String email, @RequestParam String newPassword) {
        if (!EmailUtil.patternMatches(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Email không hợp lệ", null));
        }
        if (!HelperUtil.patternMatches(newPassword)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseApi("false", "Mật khẩu không hợp lệ", null));
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseApi("false", "không tìm thấy email: " + email, null));
        }
        boolean result = userService.updatePassword(email, newPassword);
        if (result == false) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseApi("false", "Cập nhật thất bại", null));
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseApi("true", "Cập nhật thành công", null));
    }
}

