package js.footballclubmng.model.bean;

import lombok.Data;

import java.util.Date;

@Data
public class UserBean {
    private long id;
    private String email;
    private String authority;
    private String fullname;
    private String deleteFlg;
    private Boolean isActive;
    private Date createTime;
    private String gender;
    private String address;
    private String imageUrl;
}

