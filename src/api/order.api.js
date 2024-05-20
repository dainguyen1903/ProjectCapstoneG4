import api from ".";
const baseURLOrder = "api/order/";
export const orrderApi = {
  addOrder: (data) => {
    return api.post(
      baseURLOrder + `create-order`,data)
  },
 getListOrderByUserId : (userId) => {
    return api.get(baseURLOrder + `list-order-by-user/${userId}`)
 },
 getOrderDetailById:(id) => {
    return api.get("api/" + `order-details/${id}`)
 },
 getHistoryOrder : () => {
   return api.get("api/" + "order/history-order")
 },
 cancelOder : (id) => {
  return api.post("api/" + "order/cancel-order/"+id)
}
  
};
