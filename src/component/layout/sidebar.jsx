import { Button, Menu } from "antd";
import { UserOutlined,ProductOutlined  ,EditOutlined ,HomeOutlined,DribbbleOutlined } from '@ant-design/icons';
import "./layout.css"
import { useNavigate } from "react-router";

const SideBar = () => {
  const navigate = useNavigate()
  return (
    
      <Menu defaultSelectedKeys={["1"]} style={{
        height:"100vh",
        background:"#ff416c",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
      }} >
         <Menu.Item onClick={() => navigate("home")} key={"1"} icon={<HomeOutlined />}>Trang chủ</Menu.Item>
        <Menu.Item onClick={() => navigate("manageuser")} key={"2"} icon={<UserOutlined />}>Quản lí user</Menu.Item>
        <Menu.Item onClick={() => navigate("player/list")} key={"5"} icon={<DribbbleOutlined />}>Quản lí cầu thủ</Menu.Item>
        <Menu.Item onClick={() => navigate("manageproduct")} key={"3"} icon={<ProductOutlined />}>Quản lí Sản phẩm </Menu.Item>
        <Menu.Item onClick={() => navigate("news/list")} key={"4"} icon={<EditOutlined />}>Quản lí bài viết </Menu.Item>
      </Menu>
    
  );
};
export default SideBar;
