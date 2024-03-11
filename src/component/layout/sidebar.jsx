import { Button, Divider, Menu } from "antd";
import { UserOutlined,ProductOutlined  ,EditOutlined ,HomeOutlined,DribbbleOutlined } from '@ant-design/icons';
import "./layout.css"
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { router } from "../../constants/router";
import useUserStore from "../../zustand/userStore";
import useAuthStore from "../../zustand/authStore";
const SideBar = () => {
  const location = useLocation();
const [activeKey,setActiveKey] = useState("");
const user = useAuthStore(state => state.user);
console.log(user.role)
useEffect(() => {
const currentRoute = router.find(i => location.pathname.includes(i.key));
if(currentRoute){
  setActiveKey(currentRoute.key)
}
},[location.pathname])
  const navigate = useNavigate()
  return (
    
      user ? <Menu selectedKeys={[activeKey]} style={{
        height:"100vh",
        background:"#ff416c",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        color:"white",
        fontWeight:"bold"
      }} >
        {router.filter(i => i.show && (!i.role || (i.role && i.role.includes(user.authority)))).map(item => (
          <Menu.Item onClick={() => {
            navigate(item.path)
            setActiveKey(item.key)
          }} key={item.key} icon={<item.icon style={{
            fontSize:20
          }} />}>{item.menuName}</Menu.Item>
        ))}
      </Menu>
    :<></>
  );
};
export default SideBar;
