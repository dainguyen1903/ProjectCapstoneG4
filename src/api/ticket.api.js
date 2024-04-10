import api from ".";
const baseCartTicket = "api/cart-ticket/";
export const ticketApi = {
  addCartTicket: (id,params) => {
    return api.post(baseCartTicket + `add-cart-ticket-item/${id}`,{},{
        params
    });
  },
  getListCartTicket: (id,params) => {
    return api.get(baseCartTicket + `view-cart-ticket`,{},{
        params
    });
  },
  changeQuantityTicket:(id,params) => {
    return api.put(baseCartTicket + `update-quantity-cart-ticket-item/${id}`,{},{
      params
    })
},
deleteTicket:(id) => {
  return api.delete(baseCartTicket + `remove-cart-ticket-item/${id}`)
}
}
