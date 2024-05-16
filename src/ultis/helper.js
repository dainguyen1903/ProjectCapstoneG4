import { Modal } from "antd";
import moment from "moment";

export const showMessErr = (data) => {
  const mess = data.message || data.data ? data.data.message:"" || "Đã có lỗi xảy ra";
  Modal.error({
    title: "Lỗi",
    content: mess,
  });
};

export const dateFormat = (date) =>
  date ? moment(date).format("DD/MM/YYYY") : "";
export const dateFormat2 = (date) =>
  date ? moment(date).format("YYYY-MM-DD") : "";
  export const dateFormat3 = (date) => {
    if (!date) return "";
  
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
    const seconds = formattedDate.getSeconds().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };