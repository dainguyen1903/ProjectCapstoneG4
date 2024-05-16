export  const MATCH_STATUS = {
    "0":"Chưa diễn ra",
    "1":"Đang diễn ra",
    "2":"Đã kết thúc",

}
export const LOCAL_STORAGE_KEY = {
    token:"token-footbal",
    CURRENT_MENU:"current-menu"
}
export const POSITION_PLAYER = [
    "Thủ môn",
    "Hậu vệ trái",
    "Hậu vệ phải",
    "Trung vệ",
    "Hậu vệ trung tâm",
    "Tiền vệ phòng ngự",
    "Tiền vệ trung tâm",
    "Tiền vệ tấn công",
    "Tiền đạo",
    "Tiền đạo cánh trái",
    "Tiền đạo cánh phải",
    "Tiền đạo trung tâm"
];
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