import { LOCAL_STORAGE_KEY } from "../constants/common";
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
  token = parseBearerToken(token);
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