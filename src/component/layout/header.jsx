import { Breadcrumb, Col, Layout, Menu, Row, theme } from "antd";
import './layout.css'
const { Header, Content, Sider } = Layout;
import { Button, Divider, Flex, Radio } from 'antd';
import {UserOutlined }from '@ant-design/icons';
import { Link } from "react-router-dom";

const HeaderPage = () => {
  return (
    <div className="header">
      <Row justify={"end"} style={{marginRight:20}}>
        <Col>
        <Link to="/changepassword">
       <Button style={{marginRight:10}} type="primary" shape="round">
            Change Password
        </Button></Link>
       <Link to="/login">
       <Button style={{marginRight:10}} type="primary" shape="round" icon={<UserOutlined />}>
            Login
        </Button></Link>
        </Col>
        <Col>
        <Link to={"/register"}>
        <Button type="default" shape="round" icon={<UserOutlined />}  >Register</Button></Link>
        </Col>
      </Row>
    </div>
  );
};
export default HeaderPage;
