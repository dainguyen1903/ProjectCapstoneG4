package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.request.LoginRequest;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UserController extends BaseController{

    @Autowired
    UserService userService;

    @PostMapping(CommonConstant.USER_API.LOGIN)
    public ResponseAPI<Object> login(@RequestBody LoginRequest request) {
        ResponseAPI<Object> result = new ResponseAPI<Object>();
        if (request.isValid()) {
            try {
                result.setStatus(CommonConstant.COMMON_RESPONSE.OK);
                result.setMessage(CommonConstant.COMMON_MESSAGE.OK);
                result.setData(userService.handleLogin(request.getEmail(), request.getPassword()));
            } catch (BadCredentialsException ex) {
                result.setStatus(CommonConstant.COMMON_RESPONSE.EXCEPTION);
                result.setMessage(CommonConstant.COMMON_MESSAGE.PASSWORD_INCORRECT);
            } catch (NullPointerException ex) {
                result.setStatus(CommonConstant.COMMON_RESPONSE.EXCEPTION);
                result.setMessage(CommonConstant.COMMON_MESSAGE.INVALID_PARAMETER);
            } catch (Exception ex) {
                result.setStatus(CommonConstant.COMMON_RESPONSE.EXCEPTION);
                result.setMessage(ex.getMessage());
            }
            return result;
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

}

