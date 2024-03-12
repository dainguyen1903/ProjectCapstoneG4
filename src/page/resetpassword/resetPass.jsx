import { Card, Input, Row, Button, Form, Col, Modal, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../login/login.css";
import { useState } from "react";
import useAuthStore from "../../zustand/authStore";
import useUserStore from "../../zustand/userStore";
import { userApi } from "../../api/user.api";
const ResetPassword = () => {
  const navgate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [err, setErr] = useState("");
  const emailReset = useAuthStore((state) => state.emailReset);
  const setEmailReset = useAuthStore(state => state.setEmailReset)
  const [loading, setLoading] = useState(false);
  const handleChangePass = async () => {
    if (!newPassword) {
      setErr("Vui lòng nhập mật khẩu");
    } else if (newPassword !== confirmNewPassword) {
      setErr("Xác nhận mật khẩu không khớp");
    } else {
     try {
        const data = {
            newPassword: newPassword,
            reNewPassword: confirmNewPassword,
          };
          setLoading(true);
          const res = await userApi.resetPassword(data, {
            email: emailReset,
          });
          if (res.data.status === 200) {
            setEmailReset(null);
            setErr(null);
            Modal.success({
              title: "Thành công",
              content: "Reset mật khẩu thành công",
              onOk:() => {
                navgate("/login");
              }
            });
           
          } else {
            setErr(res.data.message || "Đã có lỗi xảy ra");
          }
          setLoading(false);
     } catch (error) {
        setErr("Đã có lỗi xảy ra")
        setLoading(false)
     }
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
            Reset mật khẩu
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
            disabled={loading}
            onClick={() => handleChangePass()}
            style={{
              width: "100%",
              background: loading && "gray",
            }}
            className="Button"
          >
            {loading && <Spin style={{ marginRight: 5 }} />}
            Xác nhận
          </button>
        </div>
      </div>
      <div className="OverlayContainer">
        <div className="Overlay">
          <div className="RightOverlayPanel">
            <h2 className="Title">Reset mật khẩu</h2>

            <p className="Paragraph"></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
