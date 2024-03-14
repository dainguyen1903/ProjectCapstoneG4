import { Navigate, useLocation } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/common";
import { useSelector } from "react-redux";
import { isLogin } from "../store/authSlice";

function RouterWithoutLogin({ children }) {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY.user);
  const login = useSelector(isLogin)
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RouterWithoutLogin;
