import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartAPI } from "../api/cart.api";
import { ticketApi } from "../api/ticket.api";
import {Modal} from "antd"
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

const cartTicketSlice = createSlice({
  name: "cartticket",
  initialState,
  reducers: {
    setCartTicket: (state, { payload }) => {
      console.log(payload);
      if (payload) {
        state.carts = payload;
      } else {
        state.carts = [];
      }
    },
  },
});
export const getListCartTicketAction = createAsyncThunk(
  "listCartTickert/action",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await ticketApi.getListCartTicket();
      const data = res.data;
      if (data.status === 200 || data.status === 204) {
        dispatch(setCartTicket(res.data.data));
        return data.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const removeCartTicketAction = createAsyncThunk(
  "removeCarsssst/action",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await ticketApi.deleteTicket(id);
      const data = res.data;
      if (data.status === 200) {
        dispatch(getListCartTicketAction());
        return data.data;
      } else {
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const updateQuantityCartTicket = createAsyncThunk(
  "removeCartTicket/action",
  async ({ id, quantity }, { dispatch, rejectWithValue }) => {
    try {

      const res = await ticketApi.changeQuantityTicket(id, {
        quantity
      });
      const data = res.data;
      if (data.status === 200 || data.status === 204) {
        dispatch(getListCartTicketAction());
        return data.data;
      } else {
        Modal.error({
          title:"Error",
          content:data.message,
          centered:true
        })
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue("Error");
    }
  }
);

export const addCartTicketAction= createAsyncThunk(
  "addCartTicket/action",
  async ({ quantity, id }, { dispatch, rejectWithValue, getState }) => {
    try {
      const res = await ticketApi.addCartTicket(id, {
        quantity,
      });
      const data = res.data;
      if (res.data.status !== 200 && res.data.status !== 204) {
        return rejectWithValue(data.message || "Error");
      } else {
        dispatch(getListCartTicketAction());
        return data.data;
      }
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
export const { setCartTicket } = cartTicketSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;

export default cartTicketSlice.reducer;
