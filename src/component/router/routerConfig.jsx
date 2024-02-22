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
import { useEffect, useState } from "react";
import useUserStore from "../../zustand/userStore";
import { router } from "../../constants/router";

const RouterConfig = () => {
  const isLogin = useAuthStore(state => state.isAuthenticated)
  const user = useAuthStore(state => state.user)
  const [routesWithLayout,setrousWithLayout] = useState([]);
  const [normalLayout,setnormalLayout] = useState([]);
  useEffect(() => {
 if(user){
  const listRouteLayout = router.filter(i => ((!i.role ||  i.role.includes(user.role_id)) && i.isProtected!==false ));
  if(isLogin){
    setrousWithLayout(listRouteLayout)
  }
  else{
    setrousWithLayout([])
  }
 }
  },[user,isLogin])
console.log(routesWithLayout)
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to={isLogin ? "/home":"/login"}  />} />
        <Route path="/" element={<LayOutPage />}>
          {routesWithLayout.map(i => (
             <Route path={i.path} element={<i.component />} />
          ))}
          
        </Route>
        {!isLogin && <Route path="/login" element={<Login />} />}
        {isLogin && <Route path="/register" element={<Register />} />}
        <Route path="/password/reset" element={<ResetPass />} />
        {/* <Route path="*"element={<Navigate to={isLogin ? "/home":"/login"}  />}  /> */}

      </Routes>
    </>
  );
};
export default RouterConfig;
