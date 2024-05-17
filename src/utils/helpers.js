import moment from "moment";
import { LOCAL_STORAGE_KEY } from "../constants/common";
import { message } from "antd";
import axios from "axios";
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "VND"
    }).format(price);
}


export const  getQueryParams =() =>  {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams = {};
  
    // Lặp qua các query string và thêm vào object queryParams
    for (const [key, value] of searchParams.entries()) {
      queryParams[key] = value;
    }
  
    return queryParams;
  }

  function parseBearerToken(bearerToken) {
    // Tách phần "Bearer" ra khỏi token
    const [, token] = bearerToken.match(/Bearer (.+)/) || [];
    return token;
}

export function isTokenExpired(token) {
  // token = parseBearerToken(token);
    // Giả sử token đã được tách ra từ "Bearer"
    const payloadBase64Url = token.split('.')[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const currentTime = Date.now() / 1000;

    if (payload.exp && payload.exp < currentTime) {
        return true;
    }
    return false;
}

export const handleLoggout = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.token);
  localStorage.removeItem(LOCAL_STORAGE_KEY.user);
  localStorage.removeItem(LOCAL_STORAGE_KEY.userId)
  
}

//
export const listMatchByDate = (listMatch) => {
  let result = {};
  listMatch.forEach(item =>{
    const dateTime = item.dateTime;
    const key = moment(dateTime).format("MM/YYYY");
    if(key in result){
      result[key].push(item);
    }
    else{
      result[key] = [item]
    }
  })
  return result;
}

// 
export const sortObjtDate = (arr) => {
  return arr.sort((a,b) => {
    const date1 = new Date("01/"+a);
    const date2 = new Date("01/"+b);
    return date1 - date2;
  })
}

// Show messs error
export const showMessErr = (res) => {
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