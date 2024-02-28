package js.footballclubmng.controller;

import js.footballclubmng.common.CommonConstant;
import js.footballclubmng.common.FootballclubmngUtils;
import js.footballclubmng.model.bean.UserBean;
import js.footballclubmng.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.http.HttpServletRequest;

public abstract class BaseController {

    @Autowired
    UserService userService;

    protected UserBean getUser(){
        try{
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            return FootballclubmngUtils.convertUserToBeans(userService.getUserByEmail(auth.getName()));
        }catch (Exception ex){
            throw new RuntimeException(CommonConstant.COMMON_MESSAGE.USER_NOT_LOGIN);
        }
    }

    protected String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
