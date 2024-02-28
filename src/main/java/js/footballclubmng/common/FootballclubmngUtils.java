package js.footballclubmng.common;

import js.footballclubmng.entity.User;
import js.footballclubmng.model.bean.UserBean;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

public class FootballclubmngUtils {
    public static UserBean convertUserToBeans(User user) {
        if (null == user) {
            return null;
        }
        UserBean userBeans = new UserBean();
        userBeans.setId(user.getId());
        if (null != user.getEmail()) {
            userBeans.setEmail(user.getEmail());
        }

        if (null != user.getDeleteFlg()) {
            userBeans.setDeleteFlg(user.getDeleteFlg());
        }
        if (null != user.getAuthority()) {
            userBeans.setAuthority(user.getAuthority());
        }
        if (null != user.getEmail()) {
            userBeans.setEmail(user.getEmail());
        }
        if (null != user.getFirstName() &&  null != user.getLastName()) {
            userBeans.setFullname(user.getFirstName() + " " + user.getLastName());
        }
        if (null != user.getCreateTime()) {
            userBeans.setCreateTime(user.getCreateTime());
        }

        if(null != user.getGender()){
            userBeans.setGender(user.getGender());
        }

        if(null != user.getIsActive()){
            userBeans.setIsActive(user.getIsActive());
        }

        if(null != user.getAddress()){
            userBeans.setAddress(user.getAddress());
        }

        if(null != user.getImageUrl()){
            userBeans.setImageUrl(user.getImageUrl());
        }

        return userBeans;
    }

    public static String handleAvatar(MultipartFile file) throws IOException {
        return Base64.getEncoder().encodeToString(file.getBytes());
    }
}
