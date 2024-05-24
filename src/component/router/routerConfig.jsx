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
import ResetPass from "../../page/resetpassword/resetSendOtp";
import ChangePassword from "../../page/changepass";
import DetailPlayer from "../../page/player/detail";
import DetailNews from "../../page/post/detail";
import useAuthStore from "../../zustand/authStore";
import { useEffect, useState } from "react";
import useUserStore from "../../zustand/userStore";
import { router } from "../../constants/router";
import ConfirmOTP from "../../page/resetpassword/confirmOtp";
import ResetPassword from "../../page/resetpassword/resetPass";
import ResetSendOTP from "../../page/resetpassword/resetSendOtp";
import { ROLE } from "../../constants/role";

const RouterConfig = () => {
  const isLogin = useAuthStore(state => state.isAuthenticated)
  console.log(isLogin)
  const user = useAuthStore(state => state.user);
  const [routesWithLayout,setrousWithLayout] = useState([]);
  const [normalLayout,setnormalLayout] = useState([]);
  let path = "/home"
  if(user?.authority === "Sale" ||user?.authority === ROLE.ADMIN ){
    path="/home"
  }
  if(user?.authority === ROLE.OPERATOR){
    path="/player/list"
  }
  if(user?.authority === ROLE.SHIPPER){
    path="/order"
  }
  
  useEffect(() => {
 if(user){
  const listRouteLayout = router.filter(i => ((!i.role ||  i.role.includes(user.authority)) && i.isProtected!==false ));
  if(isLogin){
    let listRoute = [];
    listRouteLayout.forEach(item => {
      if(!item.children){
        listRoute.push(item)
      }
      else{
        item.children.forEach(i => {
          listRoute.push(i)
        })
      }
    })
    setrousWithLayout(listRoute)
  }
  else{
    setrousWithLayout([])
  }
 }
  },[user,isLogin])
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to={isLogin ? path:"/login"}  />} />
        <Route path="/" element={<LayOutPage />}>
          {routesWithLayout.map(i => (
             <Route path={i.path} element={<i.component />} />
          ))}
          
        </Route>
        {!isLogin && <Route path="/login" element={<Login />} />}
        {!isLogin && <Route path="/register" element={<Register />} />}
        {!isLogin && <Route path="/reset-send-otp" element={<ResetSendOTP />} />}
        {!isLogin && <Route path="/otp" element={<ConfirmOTP />} />}
        {!isLogin && <Route path="/reset-pass" element={<ResetPassword />} />}
       {/* <Route path="*"element={<Navigate to={isLogin ? "/home":"/login"}  />}  /> */}

      </Routes>
    </>
  );
};
export default RouterConfig;
