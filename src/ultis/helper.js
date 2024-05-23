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
      // Object.values(dataValidate).forEach(v => message.error(v))
      message.error(Object.values(dataValidate)?.length > 0?  Object.values(dataValidate)[0] : "Thất bại")
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


export const ERROR_KEY = {
  NUMER:"number",
  NUMBER_UNSIGN:"number_unsign",
  EMAIL:"email",
  PASSWORD:"password",
  PHONE_NUMBER:"phone_number",
  BLANK:"blank",
  NUMBER_DISCOUNT:"discount"
}
function validateEmail(email) {
  // Biểu thức chính quy để kiểm tra email hợp lệ
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !re.test(email) ? "Email không hợp lệ" :null ;
}
function validateBlank(value,prefix) {
  if(typeof value === "string" && value?.trim() === ""){
    return prefix + " không được để trống"
  }
  return null;
}
function validateNumber(value,prefix) {
  if(isNaN(value)){
    return prefix + " phải là một số"
  }
  return null;
}
function validateNumberUnsign(value,prefix) {
  if(!isNaN(value) && Number(value) < 0){
    return prefix + " phải là một số không âm"
  }
  return null;
}
function validateNumberDiscount(value,prefix) {
  if(!isNaN(value) && (Number(value) > 100 ||Number(value) < 0 )){
    return prefix + " phải nằm trong khoảng 0 đến 100"
  }
  return null;
}

export  const objectCheckErrorInput = {
[ERROR_KEY.EMAIL]:(email) => validateEmail(email),
[ERROR_KEY.BLANK]:(value,prefix) => validateBlank(value,prefix),
[ERROR_KEY.NUMER]:(value,prefix) => validateNumber(value,prefix),
[ERROR_KEY.NUMBER_UNSIGN]:(value,prefix) => validateNumberUnsign(value,prefix),
[ERROR_KEY.NUMBER_DISCOUNT]:(value,prefix) => validateNumberDiscount(value,prefix)

}