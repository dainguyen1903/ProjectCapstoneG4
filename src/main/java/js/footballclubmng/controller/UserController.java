package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.entity.User;
import js.footballclubmng.model.dto.UserProfileDto;
import js.footballclubmng.model.request.UpdatePasswordRequest;
import js.footballclubmng.model.request.UserRegisterRequest;
import js.footballclubmng.model.request.LoginRequest;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.service.UserService;
import js.footballclubmng.util.EmailUtil;
import js.footballclubmng.util.HelperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UserController extends BaseController {

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
        } else {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, CommonConstant.COMMON_MESSAGE.INVALID_PARAMETER);
        }

    }

    @PostMapping(CommonConstant.USER_API.REGISTER)
    public ResponseAPI<Object> register(@RequestBody @Valid UserRegisterRequest userRegisterRequest) {
        User user = userService.findUserByEmailForRegister(userRegisterRequest.getEmail());
        if (user != null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EXIST_EMAIL);
        }
        if (!userRegisterRequest.getPassword().equals(userRegisterRequest.getRepassword())) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_MATCH_PASSWORD);
        }
        boolean result = userService.addUser(userRegisterRequest);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.REGISTER_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.REGISTER_SUCCESS);
    }

    @PutMapping(CommonConstant.USER_API.VERIFY_OTP)
    public ResponseAPI<Object> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        if (!EmailUtil.patternMatches(email)) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.INVALID_EMAIL);
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_EMAIL + email);
        }
        boolean result = userService.verifyOtp(email, otp);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.VERIFY_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.VERIFY_SUCCESS);

    }


    @PutMapping(CommonConstant.USER_API.GENERATE_OTP)
    public ResponseAPI<Object> generateOtp(@RequestParam String email) {
        if (!EmailUtil.patternMatches(email)) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.INVALID_EMAIL);
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_EMAIL + email);
        }
        boolean result = userService.generateOtp(email);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.SEND_OTP_FAIL);

        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.SEND_OTP_SUCCESS);
    }

    @PutMapping(CommonConstant.USER_API.RESET_PASSWORD)
    public ResponseAPI<Object> resetPassword(@RequestParam String email) {
        if (!EmailUtil.patternMatches(email)) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.INVALID_EMAIL);
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_EMAIL + email);
        }
        boolean result = userService.resetPassword(email);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.RESET_PASSWORD_FAIL);

        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.RESET_PASSWORD_SUCCESS);
    }

    @PutMapping(CommonConstant.USER_API.UPDATE_PASSWORD)
    public ResponseAPI<Object> updatePassword(@RequestParam String email, @RequestBody UpdatePasswordRequest updatePasswordRequest) {
        if (!EmailUtil.patternMatches(email)) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.INVALID_EMAIL);
        }
        if (!HelperUtil.patternMatches(updatePasswordRequest.getNewPassword())) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.INVALID_PASSWORD);
        }
        if (!updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getReNewPassword())) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_MATCH_PASSWORD);
        }
        User user = userService.findUserByEmail(email);
        if (user == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.NOT_FOUND_EMAIL + email);
        }
        boolean result = userService.updatePassword(email, updatePasswordRequest);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_PASSWORD_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_PASSWORD_SUCCESS);
    }

    @GetMapping(CommonConstant.USER_API.PROFILE_USER)
    public ResponseAPI<Object> profileUser(@RequestHeader(name = "Authorization") String token) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        UserProfileDto userProfileDto = userService.userProfile(token);
        if (userProfileDto == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.EMPTY, CommonConstant.COMMON_MESSAGE.EMPTY);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.OK, userProfileDto);
    }

    @PutMapping(CommonConstant.USER_API.UPDATE_PROFILE)
    public ResponseAPI<Object> updateProfile(@RequestBody UserProfileDto userProfileDto, @RequestHeader(name = "Authorization") String token) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        boolean result = userService.updateProfile(userProfileDto, token);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_PROFILE_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_PROFILE_SUCCESS);
    }

    @PutMapping(CommonConstant.USER_API.CHANGE_PASSWORD)
    public ResponseAPI<Object> changePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest, @RequestHeader(name = "Authorization") String token) {
        if (token == null) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.EMPTY_TOKEN);
        }
        if (!HelperUtil.patternMatches(updatePasswordRequest.getNewPassword())) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.INVALID_PASSWORD);
        }
        if (!updatePasswordRequest.getNewPassword().equals(updatePasswordRequest.getReNewPassword())) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.NOT_MATCH_PASSWORD);
        }
        boolean result = userService.changePassword(token, updatePasswordRequest);
        if (!result) {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.BAD_REQUEST, CommonConstant.COMMON_MESSAGE.UPDATE_PASSWORD_FAIL);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.OK, CommonConstant.COMMON_MESSAGE.UPDATE_PASSWORD_SUCCESS);
    }

}


