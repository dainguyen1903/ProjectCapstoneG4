import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartAPI } from "../api/cart.api";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  carts: [],
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      if (payload) {
        let { cartItems } = payload;
        cartItems = cartItems.map(({ product, id, quantity }) => {
          let discountedPrice =
            product?.price - product?.price * (product?.discount / 100);
          let totalPrice = quantity * discountedPrice;
          return {
            ...product,
            totalPrice,
            discountedPrice,
            price: discountedPrice,
            title: product.productName,
            cartItemId: id,
            quantity,
          };
        });
        state.totalAmount = cartItems.reduce((cartTotal, cartItem) => {
          return (cartTotal += cartItem.totalPrice);
        }, 0);
        state.carts = cartItems;
      } else {
        state.carts = [];
      }
    },
    addToCart: (state, action) => {
      const isItemInCart = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;

            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return item;
          }
        });

        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },

    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },

    getCartTotal: (state) => {
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);

      state.itemsCount = state.carts.length;
    },

    toggleCartQty: (state, action) => {
      const tempCart = state.carts.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;

          if (action.payload.type === "INC") {
            tempQty++;
            if (tempQty === item.stock) tempQty = item.stock;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    setCartMessageOn: (state) => {
      state.isCartMessageOn = true;
    },

    setCartMessageOff: (state) => {
      state.isCartMessageOn = false;
    },
    setCartOrder: (state, { payload }) => {
      const { id, isOrder } = payload;
      const index = state.carts.findIndex((i) => i.id === id);
      if (index >= 0) {
        state.carts[index].isOrder = isOrder;
        storeInLocalStorage(state.carts);
      }
    },
  },
});
export const getListCart = createAsyncThunk(
  "listCart/action",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await cartAPI.getListCart();
      const data = res.data;
      if (data.status === 200) {
        dispatch(setCart(res.data.data));
        return data.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const removeCartAction = createAsyncThunk(
  "removeCart/action",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await cartAPI.removeCartItem(id);
      const data = res.data;
      if (data.status === 200) {
        dispatch(getListCart());
        return data.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const updateQuantity = createAsyncThunk(
  "removeCart/action",
  async ({ id, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const res = await cartAPI.updateCartQuantity(id, quantity);
      const data = res.data;
      if (data.status === 200) {
        dispatch(getListCart());
        return data.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const addCartAction = createAsyncThunk(
  "addCart/action",
  async (
    { productId, quantity, size },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      let newQuantity = 0;
      const listCart = getState().cart.carts;
      const prevListId = listCart.map((i) => i.cartItemId);
      const item = listCart.find((i) => i.id === productId);
      if (item) {
        newQuantity = item.quantity + quantity;
      }
      const res = await cartAPI.addCartItem(productId, size);
      await dispatch(getListCart());
      const newListCartId = getState().cart.carts.map((i) => i.cartItemId);
      const data = res.data;
      if (data.status === 200) {
        if (quantity > 1) {
          let idCartUpdate;
          if (item) {
            idCartUpdate = item.cartItemId;
          } else {
            const arr = newListCartId.filter((i) => !prevListId.includes(i));
            if (arr.length === 1) {
              idCartUpdate = arr[0];
            }
          }
          if (idCartUpdate) {
            dispatch(
              updateQuantity({
                id: idCartUpdate,
                quantity: item ? newQuantity : quantity,
              })
            );
          }
        }
        dispatch(setCartMessageOn());
        return data.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const addCartActionCustom = createAsyncThunk(
  "addCart/action",
  async (
    { productId, quantity, size, playerNumber, playerName },
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      let newQuantity = 0;
      const listCart = getState().cart.carts;
      const prevListId = listCart.map((i) => i.cartItemId);
      const item = listCart.find((i) => i.id === productId);

      const res = await cartAPI.addCartItemCustom(productId, {
        playerNumber,
        playerName,
        size,
      });
      const data = res.data;
      if (data.status === 200) {
        dispatch(getListCart());
        return data.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const {
  setCart,
  addToCart,
  setCartMessageOff,
  setCartMessageOn,
  getCartTotal,
  toggleCartQty,
  clearCart,
  removeFromCart,
  setCartOrder,
} = cartSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;

export default cartSlice.reducer;
