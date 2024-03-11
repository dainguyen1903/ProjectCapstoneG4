import api from ".";
const baseURLUser ="api/user/"
export const userApi = {
    login:(data) => {
        return api.post(baseURLUser + "login",data)
    },
    getListuser:(params) => {
        return api.get(baseURLUser + "list-user",{params})
    },
    createrUser:(data) => {
        return api.post(baseURLUser + "create-user",data)
    },
    updateUser:(data) => {
        return api.put(baseURLUser + "update-user",data)
    },
    deleteUser:(data) => {
        return api.post(baseURLUser + "delete-user",data)
    },
    changePassword:(data) => {
        return api.post(baseURLUser + "change-password",data)
    },
    detailUser:(params) => {
        return api.get(baseURLUser + "detail-user",{
            params
        })
    },
    getProfileUser:() => {
        return api.get(baseURLUser + "profile-user")
    },
    udpateProfileUser:(data) => {
        return api.put(baseURLUser + "update-profile-user",data)
    },
    

}