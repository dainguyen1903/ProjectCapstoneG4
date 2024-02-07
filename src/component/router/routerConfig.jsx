import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../page/login/login";
import Register from "../../page/register/register";
import LayOutPage from "../layout";
import ManageUser from "../../page/manage-user";
import Products from "../../page/products";
import PostMange from "../../page/post";

const RouterConfig = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/manageuser" />} />
        <Route path="/" element={<LayOutPage />}>
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/manageproduct" element={<Products />} />
          <Route path="/managepost" element={<PostMange />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
export default RouterConfig;
