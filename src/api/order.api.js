import api from ".";
const baseURLOrder = "api/order/";
export const orrderApi = {
  getListOrder: (data) => {
    return api.get(
      baseURLOrder + `list-order`,data)
  },


};
