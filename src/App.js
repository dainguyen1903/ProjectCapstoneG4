import "./App.scss";
// react router v6
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import {
  Home,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search,
} from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider, useDispatch } from "react-redux";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";

import LoginAuth from "./pages/components/Login";

import ChatRoom from "./pages/components/ChatRoom";
import AuthProvider from "./pages/Context/AuthProvider";
import AppProvider from "./pages/Context/AppProvider";
import AddRoomModal from "./pages/components/Modals/AddRoomModal";
import InviteMemberModal from "./pages/components/Modals/InviteMemberModal";

import Profile from "./pages/UpdateProfiles/Profile";
import HomePage2 from "./pages/HomePage/Hompage2";
import HomePage from "./pages/HomePage/HomePage";
import LayOut from "./layout/layout";
import PrivateRouter from "./router/privateRouter";
import { useEffect } from "react";
import { logout, setCurrentUser, setLogin } from "./store/authSlice";
import { LOCAL_STORAGE_KEY } from "./constants/common";
import RouterWithoutLogin from "./router/routerWithOutLogin";
import ResetSendOTP from "./pages/ResetPass/ResetSendOtp";
import ConfirmOTP from "./pages/ResetPass/ConfirmOtp";
import ResetPassword from "./pages/ResetPass/ResetPass";
import BlogDetail from "./pages/Blog/BlogDetail";
import CheckOutPage from "./pages/CheckOut/CheckOut";
import OrderPage from "./pages/order/Order";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY.user);
    if (user) {
      const userObj = JSON.parse(user);
      dispatch(setCurrentUser(userObj));
      dispatch(setLogin());
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
              {/* <Route path="/auth" element={<LoginAuth />} /> */}
              <Route path="/chat" element={<ChatRoom />} />
            </Routes>
            <AddRoomModal />
            <InviteMemberModal />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<LayOut />}>
            <Route path="/" element={<HomePage2 />} />
            <Route
              path="/shop"
              element={
                <>
                  <HomePage />
                </>
              }
            />
            {/* Single product route */}
            <Route
              path="/product/:id"
              element={
                <>
                  <ProductSingle />
                </>
              }
            />

            {/* Category wise product listing route */}
            <Route
              path="/category/:category"
              element={
                <>
                  <CategoryProduct />
                </>
              }
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={
                <PrivateRouter>
                  <Cart />
                </PrivateRouter>
              }
            />
              <Route
              path="/order"
              element={
               
                  <OrderPage />
                
              }
            />
            {/* Cart */}
            <Route
              path="/checkout"
              element={
                <PrivateRouter>
                  <CheckOutPage />
                </PrivateRouter>
              }
            />


            <Route
              path="/profile"
              element={
                <>
                  <PrivateRouter>
                    <Profile />
                  </PrivateRouter>
                </>
              }
            />

            <Route
              path="/blog"
              element={
                <>
                  <Blog />
                </>
              }
            />
             <Route
              path="/blog/:id"
              element={
                <>
                  <BlogDetail />
                </>
              }
            />
          </Route>
          {/* Login route */}
          <Route
            path="/login"
            element={
              <RouterWithoutLogin>
                <Login />
              </RouterWithoutLogin>
            }
          />
          <Route
            path="/send-otp"
            element={
              <RouterWithoutLogin>
                <ResetSendOTP />
              </RouterWithoutLogin>
            }
          />

          <Route
            path="/otp"
            element={
              <RouterWithoutLogin>
                <ConfirmOTP />
              </RouterWithoutLogin>
            }
          />

          <Route
            path="/reset-pass"
            element={
              <RouterWithoutLogin>
                <ResetPassword />
              </RouterWithoutLogin>
            }
          />

          <Route
            path="/chatapp"
            element={
              <>
                <LoginAuth>
                  <AuthProvider>
                    <AppProvider>
                      <Routes>
                        <Route path="/auth" element={<LoginAuth />} />
                        <Route path="/chat" element={<ChatRoom />} />
                      </Routes>
                      <AddRoomModal />
                      <InviteMemberModal />
                    </AppProvider>
                  </AuthProvider>
                </LoginAuth>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
