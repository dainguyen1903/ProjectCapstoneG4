import { Button, Menu } from "antd";
import { UserOutlined,ProductOutlined  ,EditOutlined  } from '@ant-design/icons';
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
        <Menu.Item onClick={() => navigate("manageuser")} key={"1"} icon={<UserOutlined />}>Quản lí user</Menu.Item>
        <Menu.Item onClick={() => navigate("manageproduct")} key={"2"} icon={<ProductOutlined />}>Quản lí Sản phẩm </Menu.Item>
        <Menu.Item onClick={() => navigate("managepost")} key={"3"} icon={<EditOutlined />}>Quản lí bài viết </Menu.Item>
      </Menu>
    
  );
};
export default SideBar;
