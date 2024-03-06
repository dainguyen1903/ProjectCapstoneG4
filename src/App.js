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
import { Provider } from "react-redux";
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
function App() {
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

      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* Home page route */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Sidebar />
                  <HomePage2 />
                  <Footer />
                </>
              }
            />

            {/* Single product route */}
            <Route
              path="/product/:id"
              element={
                <>
                  <Header />
                  <Sidebar />
                  <ProductSingle />
                  <Footer />
                </>
              }
            />

            {/* Category wise product listing route */}
            <Route
              path="/category/:category"
              element={
                <>
                  <Header />
                  <Sidebar />
                  <CategoryProduct />
                  <Footer />
                </>
              }
            />

            {/* Cart */}
            <Route
              path="/cart"
              element={
                <>
                  <Header />
                  <Sidebar />
                  <Cart />
                  <Footer />
                </>
              }
            />

          
            

            <Route
              path="/profile"
              element={
                <>
                  <Header />
                  <Sidebar />
                  <Profile />
                  <Footer />
                </>
              }
            />

            <Route
              path="/blog"
              element={
                <>
                  <Header />
                  <Sidebar />
                  <Blog />
                  <Footer />
                </>
              }
            />
            {/* Login route */}
            <Route path="/login" element={<Login />} />

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

      </Provider>

    </div>
  );
}

export default App;
