import api from ".";
const baseURLUser = "api/user/";
export const userApi = {
  login: (data) => {
    return api.post(baseURLUser + "login", data);
  },
  getListuser: (params) => {
    return api.get(baseURLUser + "list-user", { params });
  },
  createrUser: (data) => {
    return api.post(baseURLUser + "create-user", data, {
    });
  },
  updateUser: (data,id) => {
    return api.post(baseURLUser + "update-user/"+id, data, {
      
    });
  },
  deleteUser: (data) => {
    return api.post(baseURLUser + "delete-user", data);
  },
  changePassword: (data) => {
    return api.put(baseURLUser + "change-password", data);
  },
  detailUser: (params) => {
    return api.get(baseURLUser + "detail-user", {
      params,
    });
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
  updateDeleteUser: (id) => {
    return api.post(baseURLUser + "update-delete-user", {id}, {
      
    });
  },
};
