package js.footballclubmng.enums;

public enum EOrderStatus {

    PENDING_CONFIRMATION, // Đơn hàng chờ xác nhận
    CANCELLED, // Đơn hàng đã hủy
    FAILED, //Xác nhận thanh toán thất bại
    CONFIRMED, // Đơn hàng đã xác nhận chờ shipper lấy hàng
    IN_PROGRESS, //Đang giao hàng
    RETURNED, //Đơn hàng hoàn trả
    DELIVERED, //Giao hàng thành công

}
