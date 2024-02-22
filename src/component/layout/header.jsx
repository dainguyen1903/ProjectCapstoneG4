import { Avatar, Breadcrumb, Col, Layout, Menu, Popover, Row, theme } from "antd";
import './layout.css'
const { Header, Content, Sider } = Layout;
import { Button, Divider, Flex, Radio } from 'antd';
import {UserOutlined }from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";

const HeaderPage = () => {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()
  const content = <di>
     <Link  to="/changepassword">
       <div className="flex-center" style={{marginRight:10,color:"black",fontWeight:"bold"}}  shape="round">
            Thay đổi mật khẩu
        </div></Link>
        <hr/>
        <div onClick={() => {
          logout()
          navigate("/")
        }} className="flex-center" style={{marginRight:10,color:"black",cursor:"pointer",fontWeight:"bold"}}>Đăng xuất</div>
  </di>
  return (
    <div className="header">
      <Row justify={"end"} style={{marginRight:20}}>
        <Col>
      
       {/* <Link to="/login">
       <Button className="Button-no-paading" style={{marginRight:10}}  shape="round" icon={<UserOutlined />}>
            Login
        </Button></Link>
        </Col>
        <Col>
        <Link to={"/register"}>
        <Button type="default" shape="round" icon={<UserOutlined />}  >Register</Button></Link> */}
       
        <Popover content={content}  trigger="hover">
        <Avatar style={{marginRight:10}} src={user.image_url}>{user.first_name[0].toUpperCase()}</Avatar>
        {user.first_name +" "+ user.last_name}
    </Popover>
        </Col>
       <Col style={{marginLeft:15}}></Col>
      </Row>
    </div>
  );
};
export default HeaderPage;
