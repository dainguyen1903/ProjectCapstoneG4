import { Card, Input, Row, Button, Form, Col, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../login/login.css";
import { useState } from "react";
import { userApi } from "../../api/user.api";
import useAuthStore from "../../zustand/authStore";
const ConfirmOTP = () => {
  const navgate = useNavigate();

  const [otp, setOtp] = useState("");
  const [regen, setRegen] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailReset = useAuthStore((state) => state.emailReset);
  const [err, setErr] = useState("");
  const handleConfirmOTP = async () => {
  
    if (!otp.trim()) {
      setErr("Vui lòng nhập otp");
      return;
    }
    setLoading(true);
    const res = await userApi.verifyOTP({
      email: emailReset,
      otp,
    });
    if (res.data.status === 200 || res.data.status === 204) {
    
      navgate("/reset-pass");
    } else {
      setErr(res.data.message);
      setRegen(true)
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
            Xác nhận OTP
          </p>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Otp"
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
         {!regen ?  <button
            disabled={loading}
            onClick={() => handleConfirmOTP()}
            style={{
              width: "100%",
              background: loading && "gray",
            }}
            className="Button"
          >
              {loading && <Spin style={{ marginRight: 5 }} />}
            Xác nhận
          </button>: <button
            
            onClick={() => navgate(-1)}
            style={{
              width: "100%",
            }}
            className="Button"
          >
           Quay về
          </button>}
        </div>
      </div>
      <div className="OverlayContainer">
        <div className="Overlay">
          <div className="RightOverlayPanel">
            <h2 className="Title">Nhập OTP</h2>
            <p className="Paragraph"> </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmOTP;
