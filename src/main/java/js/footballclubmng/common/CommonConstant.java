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
        public static String LOGIN_SUCCESSFULL = "Đăng nhập thành công";
        public static String USER_NOT_LOGIN = "USER_NOT_LOGIN";
        public static String USER_NOT_LOGIN_OR_QUALIFIED = "USER NOT QUALIFIED TO STAMP";
        public static String PASSWORD_INCORRECT = "Tài khoản hoặc mật khẩu không chính xác";
        public static String INVALID_PARAMETER = "Tài khoản hoặc mật khẩu không được trống";
        public static String CREATE_USER_FAIL = "Tạo tài khoản người dùng thất bại";
        public static String UPDATE_USER_FAIL = "Cập nhật thông tin người dùng thất bại";
        public static String DETAIL_USER_FAIL = "Không thể xem thông tin người dùng";
        public static String EXIST_USERNAME = "Tài khoản của bạn không tồn tại trong hệ thống";
        public static String EXIST_KEY = "KEY_EXIST";

        public static String EXIST_TOKEN = "TOKEN_IS_EXIST";

        public static String EMPTY = "EMPTY";
        public static String EXCEPTION = "EXCEPTION";

        public static final String NOT_FOUND_USER = "Không tìm thấy người dùng";


        //Message Register
        public static String EXIST_EMAIL = "Email đã tồn tại";
        public static String NOT_MATCH_PASSWORD = "Mật khẩu không khớp";
        public static String REGISTER_SUCCESS = "Đăng ký thành công.";
        public static String REGISTER_FAIL = "Đăng ký thất bại!";
        public static final String LOCKED_USER = "Tài khoản đã bị khóa. Không thể đăng ký bằng email này.";


        //Message Verify OTP
        public static String INVALID_EMAIL = "Email không hợp lệ";
        public static String NOT_FOUND_EMAIL = "Không tìm thấy email: ";
        public static String VERIFY_SUCCESS = "Xác minh OTP thành công";
        public static String VERIFY_FAIL = "Xác minh OTP thất bại, vui lòng tạo lại OTP và thử lại";
        public static String SEND_OTP_SUCCESS = "Mã OTP đã được gửi tới email của bạn, vui lòng xác minh OTP trong vòng 60 giây";
        public static String SEND_OTP_FAIL = "Không gửi được OTP";
        public static String RESET_PASSWORD_SUCCESS = "Mã OTP mới đã được gửi tới email của bạn, vui lòng xác minh OTP trong vòng 60 giây";


        //Message Update password
        public static String RESET_PASSWORD_FAIL = "Không thể tạo lại mật khẩu";
        public static String UPDATE_PASSWORD_SUCCESS = "Cập nhật mật khẩu thành công";
        public static String UPDATE_PASSWORD_FAIL = "Cập nhật mật khẩu thất bại";
        public static String INVALID_PASSWORD = "Mật khẩu không hợp lệ";


        //Message Player
        public static String NOT_FOUND_PLAYER = "Không tìm thấy cầu thủ";
        public static String NOT_FOUND_NEWS = "Không tìm thấy tin tức";
        public static String UPDATE_PROFILE_SUCCESS = "Cập nhật thành công";
        public static String UPDATE_PROFILE_FAIL = "Cập nhật thất bại";
        public static String EMPTY_TOKEN = "Đăng nhập để thực hiện chức năng này";
        public static String CREATE_PLAYER_SUCCESS = "Tạo cầu thủ thành công";
        public static String CREATE_PLAYER_FAIL = "Tạo cầu thủ thất bại";
        public static final String UPDATE_PLAYER_SUCCESS = "Cập nhật cầu thủ thành công";
        public static final String UPDATE_PLAYER_FAIL = "Cập nhật cầu thủ thất bại";
        public static final String DELETE_PLAYER_SUCCESS = "Xóa cầu thủ thành công";
        public static final String DELETE_PLAYER_FAIL = "Xóa cầu thủ thất bại";
        public static final String DATE_IN_THE_PAST = "Ngày sinh phải là một ngày trong quá khứ";


        //Message category
        public static final String CREATE_CATEGORY_FAIL = "Thêm danh mục thất bại";
        public static final String CREATE_CATEGORY_SUCCESS = "Thêm danh mục thành công";
        public static final String UPDATE_CATEGORY_FAIL = "Cập nhật danh mục thất bại";
        public static final String UPDATE_CATEGORY_SUCCESS = "Cập nhật danh mục thành công";
        public static final String NOT_FOUND_CATEGORY = "Không tìm thấy danh mục";
        public static final String CATEGORY_EXIST = "Danh mục đã tồn tại";


        //Message product
        public static final String CREATE_PRODUCT_SUCCESS = "Thêm sản phẩm thành công";
        public static final String CREATE_PRODUCT_FAIL = "Thêm sản phẩm thất bại";
        public static final String VALID_NUMBER_PRICE = "Giá của sản phẩm phải là số";
        public static final String VALID_NUMBER_DISCOUNT = "Chiết khấu của sản phẩm phải là số";
        public static String NOT_FOUND_PRODUCT = "Không tìm thấy sản phẩm";
        public static final String UPDATE_PRODUCT_SUCCESS = "Cập nhật sản phẩm thành công";
        public static final String UPDATE_PRODUCT_FAIL = "Cập nhật sản phẩm thất bại";
        public static final String DELETE_PRODUCT_SUCCESS = "Xóa sản phẩm thành công";
        public static final String DELETE_PRODUCT_FAIL = "Xóa sản phẩm thất bại";
        public static final String PRODUCT_NOT_FOUND = "Không tìm thấy sản phẩm";


        //Message news
        public static final String CREATE_NEWS_FAIL = "Tạo tin tức thất bại";
        public static final String CREATE_NEWS_SUCCESS = "Tạo tin tức thành công";
        public static final String UPDATE_NEWS_FAIL = "Cập nhật tin tức thất bại";
        public static final String UPDATE_NEWS_SUCCESS = "Cập nhật tin tức thành công";
        public static final String DELETE_NEWS_FAIL = "Xóa tin tức thất bại";
        public static final String DELETE_NEWS_SUCCESS = "Xóa tin tức thành công";


        //Message news type
        public static final String NOT_FOUND_NEWS_TYPE = "Không tìm thấy loại tin tức";
        public static final String EXIST_NEWS_TYPE = "Loại tin tức đã tồn tại";
        public static final String CREATE_NEWS_TYPE_FAIL = "Tạo loại tin tức thất bại";
        public static final String CREATE_NEWS_TYPE_SUCCESS = "Tạo loại tin tức thành công";
        public static final String DELETE_NEWS_TYPE_FAIL = "Xóa loại tin tức thất bại";
        public static final String DELETE_NEWS_TYPE_SUCCESS = "Xóa loại tin tức thành công";
        public static final String UPDATE_NEWS_TYPE_FAIL = "Cập nhật loại tin tức thất bại";
        public static final String UPDATE_NEWS_TYPE_SUCCESS = "Cập nhật loại tin tức thành công";


        //Message cart
        public static final String ADD_CART_ITEM_FAIL = "Thêm sản phẩm vào giỏ hàng thất bại";
        public static final String ADD_CART_ITEM_SUCCESS = "Thêm sản phẩm vào giỏ hàng thành công";
        public static final String OUT_OF_STOCK = "Sản phẩm đã hết hàng";
        public static final String REMOVE_CART_ITEM_FAIL = "Xóa sản phẩm thất bại";
        public static final String REMOVE_CART_ITEM_SUCCESS = "Xóa sản phẩm thành công";
        public static final String EMPTY_CART = "Giỏ hàng trống";
        public static final String UPDATE_QUANTITY_CART_ITEM_FAIL = "Cập nhật số lượng sản phẩm thất bại";
        public static final String UPDATE_QUANTITY_CART_ITEM_SUCCESS = "Cập nhật số lượng sản phẩm thành công";
        public static final String CART_ITEM_NOT_FOUND = "Không tìm thấy sản phẩm trong giỏ hàng";
        public static final String QUANTITY_MUST_GREATER_THAN_ZERO = "Số lượng sản phẩm phải lớn hơn 0";
        public static final String SIZE_REQUIRED = "Vui lòng chọn size";
        public static final String EXCEED_THE_QUANTITY_IN_STOCK = "Vượt quá số lượng sản phẩm cho phép";

        public static final String EXCEED_THE_QUANTITY_IN_STOCK_IN_CART = "Vượt quá số lượng sản phẩm cho phép! Kiểm tra giỏ hàng và thử lại";


        //Message fixtures
        public static final String NOT_FOUND_FIXTURES = "Không tìm thấy trận đấu";
        public static final String ADD_FIXTURES_FAIL = "Thêm trận đấu thất bại";
        public static final String ADD_FIXTURES_SUCCESS = "Thêm trận đấu thành công";
        public static final String UPDATE_FIXTURES_FAIL = "Cập nhật trận đấu thất bại";
        public static final String UPDATE_FIXTURES_SUCCESS = "Cập nhật trận đấu thành công";
        public static final String DELETE_FIXTURES_FAIL = "Xóa trận đấu thất bại";
        public static final String DELETE_FIXTURES_SUCCESS = "Xóa trận đấu thành công";



        //Message ticket
        public static final String ADD_TICKET_FAIL = "Mua vé thất bại";
        public static final String ADD_TICKET_SUCCESS = "Mua vé thành công";
        public static final String EMPTY_TOTAL_PRICE = "Tổng giá trị vé không được trống";


        //Message cart ticket
        public static final String ADD_CART_TICKET_ITEM_FAIL = "Thêm vé vào giỏ hàng thất bại";
        public static final String ADD_CART_TICKET_ITEM_SUCCESS = "Thêm vé vào giỏ hàng thành công";
        public static final String QUANTITY_LIMIT = "Tối đa 2 vé mỗi trận";
        public static final String NOT_ENOUGH_TICKET = "Số lượng vé không đủ";
        public static final String EMPTY_CART_TICKET = "Giỏ hàng vé trống";
        public static final String NOT_FOUND_CART_TICKET_ITEM = "Không tìm thấy vé trong giỏ hàng";
        public static final String REMOVE_CART_TICKET_ITEM_SUCCESS = "Xóa vé thành công";
        public static final String REMOVE_CART_TICKET_ITEM_FAIL = "Xóa vé thất bại";
        public static final String UPDATE_QUANTITY_CART_TICKET_ITEM_SUCCESS = "Cập nhật số lượng vé thành công";
        public static final String UPDATE_QUANTITY_CART_TICKET_ITEM_FAIL = "Cập nhật số lượng vé thất bại";
        public static final String QUANTITY_LIMIT_CART_TICKET_ITEM = "Số lượng vé vượt quá giới hạn! Kiểm tra giỏ hàng và thử lại";
        public static final String PLAYER_NUMBER_EXIST = "Số áo cầu thủ đã tồn tại";



        //Message order
        public static final String CREATE_ORDER_SUCCESS = "Tạo đơn hàng thành công";

        public static final String CREATE_ORDER_FAIL = "Tạo đơn hàng thất bại";

        public static final String CANCEL_ORDER = "Hủy đơn hàng thành công";

        public static final String CONFIRM_ORDER = "Xác nhận đơn hàng thành công";

        public static final String UPDATE_STATUS_ORDER_SUCCESS = "Cập nhật trạng thái đơn hàng thành công";

        public static final String ca = "Không tìm thấy chi tiết đơn hàng";


        //Message payment

        public static final String CREATE_PAYMENT_SUCCESS = "Tạo thanh toán thành công";

        public static final String CREATE_PAYMENT_FAIL = "Tạo thanh toán thất bại";

        public static final String ORDER_DETAILS_NOT_FOUND = "Không tìm thấy danh mục đơn hàng";


        //Message shipping
        public static final String ASSIGN_TO_SHIPPER = "Đã cập nhật shipper cho đơn hàng";

        public static final String ASSIGN_TO_SHIPPER_FAIL = "Shipper này đã có nhiều hơn 10 đơn hàng! Hãy cập nhật cho shipper khác";

        //Message statistic
        public static final String STATISTIC_QUANTITY_PRODUCT_SALE = "Số lượng sản phẩm bán ra trong thời gian này";

        public static final String STATISTIC_QUANTITY_BUYER = "Số lượng người mua trong thời gian này";

        public static final String STATISTIC_REVENUE = "Thống kê doanh thu trong thời gian này";

        public static final String STATISTIC_TOP_5_PRODUCT_SALES = "Top 5 sản phẩm bản chạy nhất";





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
        public static final String UPDATE_USER = HEAD_API + USER + "/update-user/{id}";
        public static final String ACTIVE_USER = HEAD_API + USER + "/active-through-email";
        public static final String GET_LIST_USER = HEAD_API + USER + "/list-user";
        public static final String UPDATE_DELETE_USER = HEAD_API + USER + "/update-delete-user";
        public static final String DELETE_USER = HEAD_API + USER + "/delete-user";
        public static final String CHANGE_PASSWORD = HEAD_API + USER + "/change-password";
        public static final String DETAIL_USER = HEAD_API + USER + "/detail-user";
        public static final String PROFILE_USER = HEAD_API + USER + "/profile-user";
        public static final String UPDATE_PROFILE = HEAD_API + USER + "/update-profile-user";
        public static final String LOGOUT = HEAD_API + USER + "/logout";

    }

    public static class PLAYER_API {
        public static final String PLAYER = "/player";
        public static final String LIST_PLAYER = HEAD_API + PLAYER + "/list-player";
        public static final String DETAIL_PLAYER = HEAD_API + PLAYER + "/detail-player/{id}";
        public static final String CREATE_PLAYER = HEAD_API + PLAYER + "/create-player";
        public static final String UPDATE_PLAYER = HEAD_API + PLAYER + "/update-player/{id}";
        public static final String DELETE_PLAYER = HEAD_API + PLAYER + "/delete-player/{id}";
        public static final String SEARCH_PLAYER = HEAD_API + PLAYER + "/search-player";
        public static final String VIEW_ALL_PLAYER = HEAD_API + PLAYER + "/view-all-player";
    }

    public static class NEWS_API {
        public static final String NEWS = "/news";
        public static final String LIST_NEWS = HEAD_API + NEWS + "/list-news";
        public static final String DETAIL_NEWS = HEAD_API + NEWS + "/news-detail/{id}";
        public static final String SEARCH_NEWS = HEAD_API + NEWS + "/search-news";
        public static final String CREATE_NEWS = HEAD_API + NEWS + "/create-news";
        public static final String UPDATE_NEWS = HEAD_API + NEWS + "/update-news/{id}";
        public static final String DELETE_NEWS = HEAD_API + NEWS + "/delete-news/{id}";
        public static final String LIST_NEWS_TYPE = HEAD_API + NEWS + "/list-news-type";
        public static final String DETAIL_NEWS_TYPE = HEAD_API + NEWS + "/detail-news-type/{id}";
        public static final String CREATE_NEWS_TYPE = HEAD_API + NEWS + "/create-news-type";
        public static final String UPDATE_NEWS_TYPE = HEAD_API + NEWS + "/update-news-type/{id}";
        public static final String LIST_TOP4_NEWS = HEAD_API + NEWS + "/list-top4-news";
        public static final String SEARCH_NEWS_TYPE = HEAD_API + NEWS + "/search-news-type";
        public static final String DELETE_NEWS_TYPE = HEAD_API + NEWS + "/delete-news-type/{id}";
    }

    public static class CATEGORY_API {
        public static final String CATEGORY = "/category";
        public static final String LIST_CATEGORY = HEAD_API + CATEGORY + "/list-category";
        public static final String CREATE_CATEGORY = HEAD_API + CATEGORY + "/create-category";
        public static final String UPDATE_CATEGORY = HEAD_API + CATEGORY + "/update-category/{id}";
        public static final String SEARCH_CATEGORY = HEAD_API + CATEGORY + "/search-category";
        public static final String DETAIL_CATEGORY = HEAD_API + CATEGORY + "/detail-category/{id}";
    }

    public static class PRODUCT_API {
        public static final String PRODUCT = "/product";

        public static final String LIST_PRODUCT = HEAD_API + PRODUCT + "/list-product";

        public static final String CREATE_PRODUCT = HEAD_API + PRODUCT + "/create-product";

        public static final String UPDATE_PRODUCT = HEAD_API + PRODUCT + "/update-product/{id}";

        public static final String DELETE_PRODUCT = HEAD_API + PRODUCT + "/delete-product/{id}";

        public static final String DETAILS_PRODUCT = HEAD_API + PRODUCT + "/details-product/{id}";

        public static final String SEARCH_PRODUCT = HEAD_API + PRODUCT + "/search-product";

        public static final String GET_IMAGE_PRODUCT_BY_PLAYER = HEAD_API + PRODUCT + "/product-with/{productId}";

        public static final String FILTER_PRODUCT_BY_CATEGORY = HEAD_API + PRODUCT + "/filter-product";
    }

    public static class ORDER_API {

        public static final String ORDER = "/order";

        public static final String ORDER_DETAIL = "/order-details";

        public static final String LIST_ORDER = HEAD_API + ORDER + "/list-order";

        public static final String VIEW_ORDER_DETAILS = HEAD_API + ORDER_DETAIL + "/{orderId}";

        public static final String CREATE_ORDER = HEAD_API + ORDER + "/create-order";

        public static final String HISTORY_ORDER = HEAD_API + ORDER + "/history-order";

        public static final String CANCEL_ORDER = HEAD_API + ORDER + "/cancel-order/{orderId}";

        public static final String CONFIRM_ORDER = HEAD_API + ORDER + "/confirm-order/{orderId}";

        public static final String LIST_ORDER_BY_SHIPPER = HEAD_API + ORDER + "/list-order-by-shipper";

        public static final String UPDATE_STATUS_ORDER_BY_SHIPPER = HEAD_API + ORDER + "/update-status-order-by-shipper/{orderId}";

    }

    public static class PAYMENT_API {
        public static final String PAYMENT = "/payment";

        public static final String CREATE_PAYMENT = HEAD_API + PAYMENT + "/create-payment";

        public static final String TRANSACTION_PAYMENT = HEAD_API + PAYMENT + "/transaction-payment";
    }

    public static class SHIPPING_API {
        public static final String SHIPPING = "/shipping";

        public static final String LIST_SHIP = HEAD_API + SHIPPING + "/list-shipping";

        public static final String LIST_SHIP_BY_SHIPPER = HEAD_API + SHIPPING + "/list-shipping-shipper";

        public static final String LIST_SHIPPER_BY_DISTRICT = HEAD_API + SHIPPING + "/{shippingId}/shippers";

        public static final String ASSIGN_SHIPPER = HEAD_API + SHIPPING + "/assign-shipper/{shippingId}/{shipperId}";

        public static final String LIST_ALL_SHIPPER = HEAD_API + SHIPPING + "/list-all-shipper";
    }

    public static class STATISTICS_API {
        public static final String STATISTIC = "/statistic";

        public static final String  STATISTIC_QUANTITY_PRODUCT_SALES = HEAD_API + STATISTIC + "/statistic-quantity-product";

        public static final String STATISTIC_QUANTITY_BUYER = HEAD_API + STATISTIC + "/statistic-buyer";

        public static final String STATISTIC_REVENUE = HEAD_API + STATISTIC + "/statistic-revenue";

        public static final String STATISTIC_TOP_5_PRODUCT_SALES = HEAD_API + STATISTIC + "top-5-product-sales";
    }
    public static class CART_API {
        public static final String CART = "/cart";
        public static final String ADD_CART_ITEM = HEAD_API + CART + "/add-cart-item/{productId}";
        public static final String REMOVE_CART_ITEM = HEAD_API + CART + "/remove-cart-item/{cartItemId}";
        public static final String VIEW_CART = HEAD_API + CART + "/view-cart";
        public static final String UPDATE_QUANTITY_CART_ITEM = HEAD_API + CART + "/update-quantity-cart-item/{cartItemId}";
        public static final String CUSTOMISE_ADD_CART_ITEM = HEAD_API + CART + "/customise-add-cart-item/{productId}";
    }

    public static class FIXTURES_API {
        public static final String FIXTURES = "/fixtures";
        public static final String FIXTURES_LIST = HEAD_API + FIXTURES + "/list-fixtures";
        public static final String FIXTURES_DETAIL = HEAD_API + FIXTURES + "/detail-fixtures/{id}";
        public static final String CREATE_FIXTURES = HEAD_API + FIXTURES + "/create-fixtures";
        public static final String UPDATE_FIXTURES = HEAD_API + FIXTURES + "/update-fixtures/{id}";
        public static final String DELETE_FIXTURES = HEAD_API + FIXTURES + "/delete-fixtures/{id}";
    }

    public static class TICKET_API {
        public static final String TICKET = "/ticket";
        public static final String ADD_ORDER_TICKET = HEAD_API + TICKET + "/add-order-ticket";
    }

    public static class CART_TICKET_API {
        public static final String CART_TICKET = "/cart-ticket";
        public static final String ADD_CART_TICKET_ITEM = HEAD_API + CART_TICKET + "/add-cart-ticket-item/{fixtureId}";
        public static final String REMOVE_CART_TICKET_ITEM = HEAD_API + CART_TICKET + "/remove-cart-ticket-item/{cartTicketItemId}";
        public static final String VIEW_CART_TICKET = HEAD_API + CART_TICKET + "/view-cart-ticket";
        public static final String UPDATE_QUANTITY_CART_TICKET_ITEM = HEAD_API + CART_TICKET + "/update-quantity-cart-ticket-item/{cartTicketItemId}";
    }

}




