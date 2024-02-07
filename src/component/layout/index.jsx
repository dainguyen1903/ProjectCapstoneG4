import { Card, Layout } from "antd";
import RouterConfig from "../router/routerConfig";
import HeaderPage from "./header";
import SideBar from "./sidebar";
import { Outlet } from "react-router";

const { Header, Content, Sider } = Layout;

const LayOutPage = () => {
  const siderBarStyle = {
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
   
    borderRadius: 0,
    zIndex: 2,
  };
  return (
    <Layout>
      <Header>
        <HeaderPage />
      </Header>
      <Sider collapsed={false} style={siderBarStyle} collapsedWidth={60}>
        <SideBar />
      </Sider>
      <div
        style={{
          position: "fixed",
          top: 80,
          left: 210,
          width: "100%",
          height: "100%",
        }}
      >
        <Card
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Outlet />
        </Card>
      </div>
    </Layout>
  );
};
export default LayOutPage;
