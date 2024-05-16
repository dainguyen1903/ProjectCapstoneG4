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
      `api/shiping/${shippingId}/shippers`)
  },
  assignShipper: (shippingId,shipperId) => {
    return api.post(
      `api/shiping/assign-shipper/${shippingId}/${shipperId}`)
  },
  changStatusOrder:(orderid,status) =>{
    return api.put(
      baseURLOrder + `update-status-order-by-shipper/${orderid}`,{
        params:{
          status
        }
      })
  },
  
};
