import { Card, Input, Row, Button, Form, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";
const Home = () => {
    const {user} = useAuthStore()
    console.log(user)
  return (
   <div>Home</div>
  );
};
export default Home;
