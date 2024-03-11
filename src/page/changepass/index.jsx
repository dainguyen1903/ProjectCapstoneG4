import { Card, Input, Row, Button, Form, Col, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../login/login.css";
import { useState } from "react";
import useAuthStore from "../../zustand/authStore";
import useUserStore from "../../zustand/userStore";
import { userApi } from "../../api/user.api";
const ChangePassword = () => {
  const navgate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [err, setErr] = useState("");
  const handleChangePass =async () => {
    if (!newPassword) {
      setErr("Vui lòng nhập mật khẩu");
    }
   
    else if (!newPassword !== !confirmNewPassword) {
      setErr("Xác nhận mật khẩu không khớp");
    } else {
      Modal.confirm({
        title: "Xác nhận",
        content: "Xác nhận cập nhật mật khẩu mới",
        onOk:async() => {
          await userApi.changePassword({
            newPassword,
            reNewPassword:confirmNewPassword
          })
          Modal.success({
            title: "Thành công",
            content: "Cập nhật mật khẩu thành công",
          });
        }
      })
    
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
            Thay đổi mật khẩu
          </p>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mật khẩu mới"
            type="password"
            className="Input"
          />
          <input
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu mới"
            type="password"
            className="Input"
          />
          {err && <span style={{ color: "red", marginBottom: 5 }}>{err}</span>}
          <button
            onClick={handleChangePass}
            style={{
              width: "100%",
            }}
            className="Button"
          >
            Xác nhận
          </button>
        </div>
      </div>
      <div className="OverlayContainer">
        <div className="Overlay">
          <div className="RightOverlayPanel">
            <h2 className="Title">Thay đổi mật khẩu</h2>

            <p className="Paragraph"></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
