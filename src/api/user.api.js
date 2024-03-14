import api from ".";
const baseURLUser = "api/user/";
export const userApi = {
  login: (data) => {
    return api.post(baseURLUser + "login", data);
  },
  
  changePassword: (data) => {
    return api.put(baseURLUser + "change-password", data);
  },
  getProfileUser: () => {
    return api.get(baseURLUser + "profile-user");
  },
  udpateProfileUser: (data) => {
    return api.put(baseURLUser + "update-profile-user", data);
  },
  genOtp: (params) => {
    return api.put(baseURLUser + "generrate-otp", null, {
      params,
    });
  },
  verifyOTP: (params) => {
    return api.put(baseURLUser + "verify-otp", null, {
      params,
    });
  },
  // parrams email, body:newPassword, reNewPassword;
  resetPassword: (data, params) => {
    return api.put(baseURLUser + "update-password", data, {
      params,
    });
  },
  detailUser: (params) => {
    return api.get(baseURLUser + "detail-user", {
      params,
    });
  },
  register: (data) => {
    return api.post(baseURLUser + "register",data);
  },
};