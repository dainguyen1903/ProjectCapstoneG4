import { Routes, Route } from "react-router-dom";
import Login from "../../page/login/login";
import Register from "../../page/register/register";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={ <Home/> } /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
export default RouterConfig;
