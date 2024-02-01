import { Card, Layout } from "antd";
import RouterConfig from "../router/routerConfig";
import HeaderPage from "./header";
import SideBar from "./sidebar";

const { Header, Content, Sider } = Layout;

const LayOutPage = () => {
  const siderBarStyle = {
    height: "100vh",
    position: "fixed",
    left: 0,
    top:0,
    background: "rgb(180, 235, 235)",
    borderRight: "1px solid rgba(5, 5, 5, 0.06)",
    borderRadius: 0,
    zIndex:2
  };
  return (
   
      <Layout>
        <Header>
          <HeaderPage />
        </Header>
        <Sider collapsed={false} style={siderBarStyle} collapsedWidth={60}>
          <SideBar  />
        </Sider>
        <div style={{
            position:"fixed",
            top:80,
            left:210,
            width:"100%",
            height:"100%",
            

        }}>
            <Card style={{
                width:"100%",
                height:"100%",
                
            }}>
                <RouterConfig />

            </Card>
        </div>
      </Layout>
    
  );
};
export default LayOutPage;
