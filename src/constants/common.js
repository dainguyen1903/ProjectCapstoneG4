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
    
    "PENDING" :"Chờ xác nhận", // Đơn hàng chờ xác nhận
    "CANCELLED":"Đã hủy",
    "IN_PROGRESS":"Đang giao", // Đơn hàng đang vận chuyển
    "COMPLETE":"Đã giao",
    "FAILED":"Giao thất bại",
    pending:"PENDING",
    cancel:"CANCELLED",
    inprogress:"IN_PROGRESS",
    complete:"COMPLETE",
    fail:"FAILED"
}