import api from ".";
const baseURLCart = "api/cart/";
export const cartAPI = {
  addCartItem: (productId, size,quantity) => {
    return api.post(
      baseURLCart + `add-cart-item/${productId}`,
      {},
      {
        params: {
          size,
          quantity:quantity
        },
      }
    );
  },

  addCartItemCustom: (productId, body) => {
    return api.post(baseURLCart + `customise-add-cart-item/${productId}`, body);
  },
  updateCartQuantity: (cartItemId, quantity) => {
    return api.put(
      baseURLCart + `update-quantity-cart-item/${cartItemId}`,
      {},
      {
        params: {
          quantity,
        },
      }
    );
  },
  removeCartItem: (id) => {
    return api.delete(baseURLCart + `remove-cart-item/${id}`);
  },
  getListCart: () => {
    return api.get(baseURLCart + "view-cart");
  },
};
