import api from ".";
const baseURLCart = "api/cart/";
export const cartAPI = {
  addCartItem: (productId) => {
    return api.post(baseURLCart+`add-cart-item/${productId}`,{});
  },
  updateCartQuantity: (cartItemId,quantity) => {
    return api.put(baseURLCart+`update-quantity-cart-item/${cartItemId}`,{},{
        params:{
            quantity
        }
    });
  },
  removeCartItem : (id) => {
    return api.delete(baseURLCart+`remove-cart-item/${id}`);
  },
  getListCart : () => {
  return api.get(baseURLCart+"view-cart")
  }
};
