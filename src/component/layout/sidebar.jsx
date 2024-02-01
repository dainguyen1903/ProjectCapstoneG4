import { Button, Menu } from "antd";
import { HomeOutlined  } from '@ant-design/icons';
import "./layout.css"
const SideBar = () => {
  return (
    
      <Menu selectedKeys={["1"]}>
        <Menu.Item key={"1"} icon={<HomeOutlined />}>Trang chủ</Menu.Item>
      </Menu>
    
  );
};
export default SideBar;
