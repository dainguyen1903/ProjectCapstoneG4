import { Card, Input, Row, Button, Form, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import useUserStore from "../../zustand/userStore";
import useAuthStore from "../../zustand/authStore";
const Login = () => {
  const navgate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const users = useUserStore((state) => state.users);
  const login = useAuthStore((state) => state.login);
  const handleLogin = () => {
    
    const currentUser = users.find(
      (i) => i.email == email && i.password == password
    );
    if (!currentUser) {
      setErr(true);
    } else {
      setErr(false);
      setTimeout(() => {
        login(currentUser);
        navgate("/");
      }, 1000);
    }
  };
  return (
    <div className="Container">
      <div className="SignInContainer">
        <div className="Form">
          <p
            style={{
              color: "red",
            }}
            className="Title"
          >
            Đăng nhập
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="Input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            type="password"
            className="Input"
          />
          {err && (
            <span style={{ color: "red", textAlign: "start" }}>
              Sai email hoặc mật khẩu
            </span>
          )}

          <Link to="/password/reset" className="Anchor">
            Quên mật khẩu?
          </Link>
          <button
            onClick={() => handleLogin()}
            style={{
              width: "100%",
            }}
            className="Button"
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <div className="OverlayContainer">
        <div className="Overlay">
          <div className="RightOverlayPanel">
            <h2 className="Title">Hello, Friend!</h2>
            <p className="Paragraph">
              {" "}
              Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi
            </p>
         
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
