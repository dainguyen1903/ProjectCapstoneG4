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

const RouterConfig = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/" element={<LayOutPage />}>
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/user/add" element={<AddUserForm />} />
          <Route path="/user/edit/:id" element={<AddUserForm />} />
          <Route path="/player/list" element={<ManagePlayer />} />
          <Route path="/player/add" element={<AddPlayerForm />} />
          <Route path="/player/edit/:id" element={<AddPlayerForm />} />
          <Route path="/player/detail/:id" element={<ManageUser />} />
          <Route path="/manageproduct" element={<Products />} />
          <Route path="/news/list" element={<PostMange />} />
          <Route path="/news/add" element={<AddNewsForm />} />
          <Route path="/news/edit/:id" element={<AddNewsForm />} />
          <Route path="/news/detail/:id" element={<PostMange />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
export default RouterConfig;
