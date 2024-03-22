import { Avatar, Breadcrumb, Col, Layout, Menu, Popover, Row, theme } from "antd";
import './layout.css'
const { Header, Content, Sider } = Layout;
import { Button, Divider, Flex, Radio } from 'antd';
import {UserOutlined }from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";

const HeaderPage = () => {
  const user = useAuthStore(state => state.user)
  console.log(user)
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()
  const content = <div>
    <Link  to="/profile">
       <div className="flex-center" style={{marginRight:10,color:"black",fontWeight:"bold"}}  shape="round">
            Thông tin cá nhân
        </div></Link>
        <hr/>
     <Link  to="/changepassword">
       <div className="flex-center" style={{marginRight:10,color:"black",fontWeight:"bold"}}  shape="round">
            Thay đổi mật khẩu
        </div></Link>
        <hr/>
        <div onClick={() => {
          logout()
          navigate("/")
        }} className="flex-center" style={{marginRight:10,color:"black",cursor:"pointer",fontWeight:"bold"}}>Đăng xuất</div>
  </div>
  return (
    user ? <div className="header">
    <Row justify={"end"} style={{marginRight:20}}>
      <Col>
     
      <Popover content={content}  trigger="hover">
      <Avatar style={{marginRight:10}} src={user.imageUrl}>{user.fullname.toUpperCase()}</Avatar>
      {user.fullname}
  </Popover>
      </Col>
     <Col style={{marginLeft:15}}></Col>
    </Row>
  </div>:<></>
  );
};
export default HeaderPage;
