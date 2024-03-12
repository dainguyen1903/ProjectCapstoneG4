package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.model.request.LoginRequest;
import js.footballclubmng.model.request.user.CreateUserRequest;
import js.footballclubmng.model.request.user.DeleteUserRequest;
import js.footballclubmng.model.response.ResponseAPI;
import js.footballclubmng.repository.UserRepository;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

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
            }
            catch (Exception ex) {
                result.setStatus(CommonConstant.COMMON_RESPONSE.EXCEPTION);
                result.setMessage(ex.getMessage());
            }
            return result;
        } else {
            return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, CommonConstant.COMMON_MESSAGE.INVALID_PARAMETER);
        }
    }

    @GetMapping(value = CommonConstant.USER_API.GET_LIST_USER)
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseAPI<Object> searchListUser(@RequestParam(value = "name", required = false) String name) {
        return userService.getListSearch(name);
    }

    @PostMapping(value = CommonConstant.USER_API.CREATE_USER,
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseAPI<Object> createUser(HttpServletRequest requestHttp, @RequestPart("request") CreateUserRequest request, @RequestPart(value = "file", required = false) MultipartFile file) {
        if (request.isValid()) {
            return userService.createUser(request, file, getSiteURL(requestHttp));
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, CommonConstant.COMMON_MESSAGE.INVALID_PARAMETER);

    }

    @PostMapping(value = CommonConstant.USER_API.UPDATE_USER,
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseAPI<Object> updateUser(@RequestPart("request") CreateUserRequest request, @RequestPart(value = "file", required = false) MultipartFile file) {
        if (request.isValidUpdate()) {
            return userService.updateUser(request, file);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, CommonConstant.COMMON_MESSAGE.INVALID_PARAMETER);

    }

    @GetMapping(value = CommonConstant.USER_API.ACTIVE_USER)
    public ResponseAPI<Object> activeUser(@RequestParam("email") String email, @RequestParam(value = "token") String verifyCode) {
        if (StringUtils.hasLength(email) && StringUtils.hasLength(verifyCode)) {
            return userService.activeThroughEmail(verifyCode, email);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, CommonConstant.COMMON_MESSAGE.INVALID_PARAMETER);

    }

    @PostMapping(value = CommonConstant.USER_API.DELETE_USER)
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseAPI<Object> deleteUser(@RequestBody DeleteUserRequest request) {
        return userService.deleteUser(request);
    }

    @GetMapping(value = CommonConstant.USER_API.DETAIL_USER)
    public ResponseAPI<Object> detailUser(@RequestParam(value = "id") long id) {
        if (id > 0) {
            return userService.detailUser(id);
        }
        return new ResponseAPI<>(CommonConstant.COMMON_RESPONSE.NOT_VALID, CommonConstant.COMMON_MESSAGE.INVALID_PARAMETER);
    }




}
