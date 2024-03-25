import { Card, Input, Row, Button, Form, Col, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../login/login.css";
import { useState } from "react";
import { userApi } from "../../api/user.api";
import useAuthStore from "../../zustand/authStore";
const ResetSendOTP = () => {
  const navgate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const setEmailReset = useAuthStore((state) => state.setEmailReset);
  const handleSendOTP = async () => {
    if (!email.trim()) {
      setErr("Vui lòng nhập email");
      return;
    }
    setLoading(true);

    const res = await userApi.genOtp({
      email,
    });
    if (res.data.status === 200 || res.data.status === 204) {
      setEmailReset(email);
      navgate("/otp");
    } else {
      setErr(res.data.message);
    }
    setLoading(false);
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
            Nhập email xác nhận
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="Input"
          />
          {err && (
            <div
              style={{
                marginTop: -5,
                color: "red",
                marginBottom: 10,
                textAlign: "start",
                width: "100%",
                marginLeft: -20,
              }}
            >
              {err}
            </div>
          )}
          <button
            disabled={loading}
            onClick={() => handleSendOTP()}
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
            <h2 className="Title">Hello, Friend!</h2>
            <p className="Paragraph"> </p>
            <p className="Paragraph">
              <button
                onClick={() => navgate("/register")}
                className="Button GhostButton"
              >
                Sigin Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetSendOTP;
