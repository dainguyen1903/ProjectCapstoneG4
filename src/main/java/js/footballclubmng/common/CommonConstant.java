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
    }

    public static class COMMON_MESSAGE {
        public static String NOT_CONVERT = "CAN_NOT_CONVERT";
        public static String OK = "OK";
        public static String USER_NOT_LOGIN = "USER_NOT_LOGIN";
        public static String USER_NOT_LOGIN_OR_QUALIFIED = "USER NOT QUALIFIED TO STAMP";
        public static String PASSWORD_INCORRECT = "USERNAME_OR_PASSWORD_INCORRECT";
        public static String INVALID_PARAMETER = "INVALID_DATA";
        public static String EXIST_USERNAME = "USERNAME_EXIST";
        public static String EXIST_EMAIL = "EMAIL_EXIST";
        public static String EXIST_KEY = "KEY_EXIST";
        public static String EXIST_TOKEN = "TOKEN_IS_EXIST";
        public static String EMPTY = "EMPTY";
        public static String EXCEPTION = "EXCEPTION";


    }


    public static class USER_API {

        public static final String USER = "/user";
        public static final String REGISTER = HEAD_API + USER + "/register";
        public static final String VERIFY_OTP = HEAD_API + USER + "/verify-otp";
        public static final String GENERATE_OTP = HEAD_API + USER + "/generrate-otp";
        public static final String RESET_PASSWORD = HEAD_API + USER + "/reset-password";
        public static final String UPDATE_PASSWORD = HEAD_API + USER + "/update-password";


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