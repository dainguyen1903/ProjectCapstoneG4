import { Modal, message } from "antd";
import axios from "axios";
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

  // Show messs error
export const showMessErr400 = (res) => {
  let mess = "";
  const messErr = res?.data?.message
if(messErr){
  if(typeof messErr === "string"){
    mess= messErr
  }
}
message.error(mess || "Có lỗi xảy ra")
}

// handleErr
export const handleError = (error, isshowToast = true) => {
  let mess = "";
  if (axios.isAxiosError(error)) {
    const dataValidate = error.response?.data || null;
    if(isObject(dataValidate)){
      Object.values(dataValidate).forEach(v => message.error(v))
      return ;
    }
    mess = error.response?.data?.Message || "Có lỗi xảy ra";
    const errorObj = error.response?.data?.errors;
    if (errorObj) {
      const listKey = Object.keys(errorObj);
      const key = listKey.find((i) => !i.includes("$"));

      if (key) {
        const listErr = errorObj[key];
        mess = listErr.join("\n");
      }
    }
  } else {
    mess = error.message || "Có lỗi xảy ra";
  }
  if (isshowToast) {
    message.error("Có lỗi xảy ra");
  }
  return mess;
};

//
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: "VND"
  }).format(price);
}