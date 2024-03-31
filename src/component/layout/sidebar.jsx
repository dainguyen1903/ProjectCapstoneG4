import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { LOCAL_STORAGE_KEY } from "../../constants/common";
import { router } from "../../constants/router";
import useAuthStore from "../../zustand/authStore";
import "./layout.css";
const SideBar = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("");
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const currenMenu = localStorage.getItem(LOCAL_STORAGE_KEY.CURRENT_MENU);
    if (currenMenu) {
      setActiveKey(JSON.parse(currenMenu));
    } else {
      const currentRoute = router.find((i) =>
        location.pathname.includes(i.key)
      );
      if (currentRoute) {
        setActiveKey([currentRoute.key]);
      }
    }
  }, [location.pathname]);
  const navigate = useNavigate();
  return user ? (
    <Menu
      selectedKeys={activeKey}
      style={{
        height: "100vh",
        background: "rgb(31, 167, 167)",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {router
        .filter(
          (i) =>
            i.show && (!i.role || (i.role && i.role.includes(user.authority)))
        )
        .map((item) => {
          if (!item.children) {
            return (
              <Menu.Item
                onClick={() => {
                  navigate(item.path);
                  setActiveKey(item.key);
                  localStorage.removeItem(LOCAL_STORAGE_KEY.CURRENT_MENU);
                  localStorage.setItem(
                    LOCAL_STORAGE_KEY,
                    JSON.stringify([item.key])
                  );
                }}
                key={item.key}
                icon={
                  <item.icon
                    style={{
                      fontSize: 20,
                    }}
                  />
                }
              >
                {item.menuName}
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu
                style={{
                  backgroundColor: activeKey.includes(item.key)
                    ? "#e6f4ff"
                    : "",
                  width: "calc(100% - 8px)",
                  marginInline: 4,
                  marginBlock: 4,
                }}
                icon={
                  <item.icon
                    style={{
                      fontSize: 20,
                    }}
                  />
                }
                key={item.key}
                title={item.menuName}
              >
                {item.children
                  .filter(
                    (i) =>
                      i.show &&
                      (!i.role || (i.role && i.role.includes(user.authority)))
                  )
                  .map((i) => {
                    if (!i.children) {
                      return (
                        <Menu.Item
                          onClick={() => {
                            navigate(i.path);
                            setActiveKey([item.key, i.key]);
                            localStorage.removeItem(
                              LOCAL_STORAGE_KEY.CURRENT_MENU
                            );
                            localStorage.setItem(
                              LOCAL_STORAGE_KEY.CURRENT_MENU,
                              JSON.stringify([item.key, i.key])
                            );
                          }}
                          key={i.key}
                          icon={
                            <i.icon
                              style={{
                                fontSize: 20,
                              }}
                            />
                          }
                        >
                          {i.menuName}
                        </Menu.Item>
                      );
                    }
                  })}
              </SubMenu>
            );
          }
        })}
    </Menu>
  ) : (
    <></>
  );
};
export default SideBar;
