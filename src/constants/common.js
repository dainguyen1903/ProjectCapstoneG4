export const LOCAL_STORAGE_KEY = {
    token:"football-token1",
    userId:"userId",
    user:"userFootbal"
}
export const STATUS_MATCH = {
    END:"2",
    PENDING:"0",
    PLAYING:"1",
    "0":"Chưa diễn ra",
    "1":"Đang diễn ra",
    "2":"Đã kết thúc",

}
export const STATUS_ORDER= {
    
    "PENDING_CONFIRMATION" :"Chờ xác nhận", // Đơn hàng chờ xác nhận
    "CANCELLED":"Đã hủy",
    "IN_PROGRESS":"Đang giao", // Đơn hàng đang vận chuyển
    "DELIVERED":"Đã giao",
    "FAILED":"Giao thất bại",
    "CONFIRMED":"Đã xác nhận", // chờ shipper lấy hàng,
    "RETURNED":"Đơn hoàn trả",
    pending:"PENDING_CONFIRMATION",
    cancel:"CANCELLED",
    inprogress:"IN_PROGRESS",
    complete:"DELIVERED",
    fail:"FAILED",
    returned:"RETURNED",
    confirmed:"CONFIRMED"
}