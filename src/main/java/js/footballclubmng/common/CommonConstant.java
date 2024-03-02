package js.footballclubmng.common;

public class CommonConstant {
    public static final String HEAD_API = "/api";

    public static class CONFIG {
        public final static String JPADataSource = "JPADataSource";
        public final static String JPAEntityManagerFactory = "JPAEntityManagerFactory";
        public final static String JPATransactionManager = "JPATransactionManager";

        public final static String HibernateDataSource = "hibernateDataSource";
        public final static String HibernateSessionFactory = "hibernateSessionFactory";
        public final static String HibernateTransactionManager = "hibernateTransactionManager";
    }

    public static class COMMON_ROLE {
        public static String ROLE = "ROLE_";
    }

    public static class COMMON_RESPONSE {
        public static int OK = 200;

        public static int EXCEPTION = 500;

        public static int NON_AUTH = 203;

        public static int EMPTY = 204;

        public static int NOT_VALID = 422;

        public static int PERMISSION_DENIED = 403;

        public static int NOT_FOUND = 404;

        public static int BAD_REQUEST = 400;
    }

    public static class COMMON_MESSAGE {
        public static String NOT_CONVERT = "CAN_NOT_CONVERT";
        public static String OK = "OK";
        public static String USER_NOT_LOGIN = "USER_NOT_LOGIN";
        public static String USER_NOT_LOGIN_OR_QUALIFIED = "USER NOT QUALIFIED TO STAMP";
        public static String PASSWORD_INCORRECT = "USERNAME_OR_PASSWORD_INCORRECT";
        public static String INVALID_PARAMETER = "INVALID_DATA";
        public static String EXIST_USERNAME = "USERNAME_EXIST";
        public static String EXIST_KEY = "KEY_EXIST";
        public static String EXIST_TOKEN = "TOKEN_IS_EXIST";
        public static String EMPTY = "EMPTY";
        public static String EXCEPTION = "EXCEPTION";
        public static String EXIST_EMAIL = "Email đã tồn tại";
        public static String NOT_MATCH_PASSWORD = "Mật khẩu không khớp";
        public static String REGISTER_SUCCESS = "Đăng ký thành công.";
        public static String REGISTER_FAIL = "Đăng ký thất bại!";
        public static String INVALID_EMAIL = "Email không hợp lệ";
        public static String NOT_FOUND_EMAIL = "Không tìm thấy email: ";
        public static String VERIFY_SUCCESS = "Xác minh OTP thành công";
        public static String VERIFY_FAIL = "Xác minh OTP thất bại, vui lòng tạo lại OTP và thử lại";
        public static String SEND_OTP_SUCCESS = "Mã OTP đã được gửi tới email của bạn, vui lòng xác minh OTP trong vòng 60 giây";
        public static String SEND_OTP_FAIL = "Không gửi được OTP";
        public static String RESET_PASSWORD_SUCCESS = "Mã OTP mới đã được gửi tới email của bạn, vui lòng xác minh OTP trong vòng 60 giây";
        public static String RESET_PASSWORD_FAIL = "Không thể tạo lại mật khẩu";
        public static String UPDATE_PASSWORD_SUCCESS = "Cập nhật mật khẩu thành công";
        public static String UPDATE_PASSWORD_FAIL = "Cập nhật mật khẩu thất bại";
        public static String INVALID_PASSWORD = "Mật khẩu không hợp lệ";
        public static String NOT_FOUND_PLAYER = "Không tìm thấy cầu thủ";
        public static String NOT_FOUND_NEWS = "Không tìm thấy tin tức";
        public static String UPDATE_PROFILE_SUCCESS = "Cập nhật thông tin cá nhân thành công";
        public static String UPDATE_PROFILE_FAIL = "Cập nhật thông tin cá nhân thất bại";
        public static String EMPTY_TOKEN = "Đăng nhập để thực hiện chức năng này";
    }

    public static class USER_API {

        public static final String USER = "/user";
        public static final String REGISTER = HEAD_API + USER + "/register";
        public static final String VERIFY_OTP = HEAD_API + USER + "/verify-otp";
        public static final String GENERATE_OTP = HEAD_API + USER + "/generrate-otp";
        public static final String RESET_PASSWORD = HEAD_API + USER + "/reset-password";
        public static final String UPDATE_PASSWORD = HEAD_API + USER + "/update-password";

        public static final String LOGIN = HEAD_API + USER + "/login";

        public static final String CREATE_USER = HEAD_API + USER + "/create-user";

        public static final String UPDATE_USER = HEAD_API + USER + "/update-user";

        public static final String ACTIVE_USER = HEAD_API + USER + "/active-through-email";

        public static final String GET_LIST_USER = HEAD_API + USER + "/list-user";

        public static final String DELETE_USER = HEAD_API + USER + "/delete-user";

        public static final String CHANGE_PASSWORD = HEAD_API + USER + "/change-password";

        public static final String DETAIL_USER = HEAD_API + USER + "/detail-user";

        public static final String PROFILE_USER = HEAD_API + USER + "/profile-user";
        public static final String UPDATE_PROFILE = HEAD_API + USER + "/update-profile-user";
    }

    public static class PLAYER_API {
        public static final String PLAYER = "/player";
        public static final String LIST_PLAYER = HEAD_API + PLAYER + "/list-player";
        public static final String DETAIL_PLAYER = HEAD_API + PLAYER + "/detail-player/{id}";

    }

    public static class NEWS_API {
        public static final String NEWS = "/news";
        public static final String LIST_NEWS = HEAD_API + NEWS + "/list-news";
        public static final String DETAIL_NEWS = HEAD_API + NEWS + "/news-detail/{id}";

    }


}




