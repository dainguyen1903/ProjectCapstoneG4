import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../page/login/login";
import Register from "../../page/register/register";
import LayOutPage from "../layout";
import ManageUser from "../../page/manage-user";
import Products from "../../page/products";
import PostMange from "../../page/post";
import Home from "../../page/home/home";
import AddUserForm from "../../page/manage-user/add";
import ManagePlayer from "../../page/player/player";
import AddPlayerForm from "../../page/player/add";
import AddNewsForm from "../../page/post/add";
import ResetPass from "../../page/resetpassword";
import ChangePassword from "../../page/changepass";
import DetailPlayer from "../../page/player/detail";
import DetailNews from "../../page/post/detail";
import useAuthStore from "../../zustand/authStore";

const RouterConfig = () => {
  const isLogin = useAuthStore(state => state.isAuthenticated)
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to={isLogin ? "/home":"/login"}  />} />
        <Route path="/" element={<LayOutPage />}>
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/user/add" element={<AddUserForm />} />
          <Route path="/user/edit/:id" element={<AddUserForm />} />
          <Route path="/player/list" element={<ManagePlayer />} />
          <Route path="/player/add" element={<AddPlayerForm />} />
          <Route path="/player/edit/:id" element={<AddPlayerForm />} />
          <Route path="/player/detail/:id" element={<DetailPlayer />} />
          <Route path="/manageproduct" element={<Products />} />
          <Route path="/news/list" element={<PostMange />} />
          <Route path="/news/add" element={<AddNewsForm />} />
          <Route path="/news/edit/:id" element={<AddNewsForm />} />
          <Route path="/news/detail/:id" element={<DetailNews />} />
          <Route path="/home" element={<Home />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/reset" element={<ResetPass />} />
      </Routes>
    </>
  );
};
export default RouterConfig;
