import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { userApi } from "../api/user.api";
import { LOCAL_STORAGE_KEY } from "../constants/common";

const initialState = {
  currentUser: null,
  isLogin: false,
  error: null,
  emailReset:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setLogin:(state,{payload}) => {
        state.isLogin = true
    },
    logout:(state,{payload}) => {
        state.isLogin = false;
        state.currentUser = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY.token);
        localStorage.removeItem(LOCAL_STORAGE_KEY.user);
        localStorage.removeItem(LOCAL_STORAGE_KEY.userId)
    },
    setEmailReset:(state,{payload}) => {
      state.emailReset = payload;
    }
  },
  extraReducers: (builder) => {},
});

// Login
export const loginAction = createAsyncThunk(
  "login/action",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const res = await userApi.login({
      email,
      password,
    });
 console.log(res)
    const data = res.data;
    if (data.status === 200) {
      const token = data.data.accessToken;
      const userId = data.data.userId;
      localStorage.setItem(LOCAL_STORAGE_KEY.token, token);
      localStorage.setItem(LOCAL_STORAGE_KEY.userId, userId);
      dispatch(setLogin())
      dispatch(getDetailUserAction(userId));
      return data;
    } else {
      return rejectWithValue(res.data.message);
    }
  }
);
export const getDetailUserAction = createAsyncThunk(
  "detailUser/action",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await userApi.detailUser({
      id,
    });
    const data = res.data;
    if (data.status === 200) {
      dispatch(setCurrentUser(data.data));
      console.log(data.data)
      localStorage.setItem(LOCAL_STORAGE_KEY.user,JSON.stringify(data.data))
      return data.data;
    } else {
      return rejectWithValue(res.data.message);
    }
  }
);

export const getCurrentUser = (state) => state.auth.currentUser;
export const isLogin = (state) => state.auth.isLogin;
export const emailReset = state => state.auth.emailReset;

export default authSlice.reducer;
export const { setCurrentUser ,setLogin,logout,setEmailReset} = authSlice.actions;
