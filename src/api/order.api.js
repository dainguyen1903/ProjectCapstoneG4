import api from ".";
const baseURLOrder = "api/order/";
export const orrderApi = {
  getListOrder: (data) => {
    return api.get(
      baseURLOrder + `list-order`,data)
  },
  getListOrderByShipper: (data) => {
    return api.get(
      baseURLOrder + `list-order-by-shipper`,data)
  },
  getListShipperDistrict: (shippingId) => {
    return api.get(
      `api/shipping/${shippingId}/shippers`)
  },
  assignShipper: (shippingId,shipperId) => {
    return api.post(
      `api/shipping/assign-shipper/${shippingId}/${shipperId}`)
  },
  getListAllShipper: (shippingId,shipperId) => {
    return api.get(
      `api/shipping/list-all-shipper`)
  },
  changStatusOrder:(orderid,status) =>{
    return api.put(
      baseURLOrder + `update-status-order-by-shipper/${orderid}`,{},{
        params:{
          status
        }
      })
  },
  getOrderDetailById:(id) => {
    return api.get("api/" + `order-details/${id}`)
 },
 confirmOrder:(id) => {
  return api.post("api/" + `order/confirm-order/${id}`)
},

  
};
