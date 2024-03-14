import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { isLogin } from "../store/authSlice";
import { LOCAL_STORAGE_KEY } from "../constants/common";

  function PrivateRouter({ children }) {
    const login = useSelector(isLogin)
    const user = localStorage.getItem(LOCAL_STORAGE_KEY.user)
 const location = useLocation()
    if (!user
        ) {
      return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return children;
  }

export default PrivateRouter;
