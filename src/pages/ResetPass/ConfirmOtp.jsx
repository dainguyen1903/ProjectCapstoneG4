import { Card, Input, Row, Button, Form, Col, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Reset.scss";
import { useState } from "react";
import { userApi } from "../../api/user.api";
import { useSelector } from "react-redux";
import { emailReset } from "../../store/authSlice";
const ConfirmOTP = () => {
  const navgate = useNavigate();
 
  const [otp, setOtp] = useState("");
  const [regen, setRegen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const emailRe = useSelector(emailReset)
  const handleConfirmOTP = async () => {
  
    if (!otp.trim()) {
      setErr("Vui lòng nhập otp");
      return;
    }
    setLoading(true);
    const res = await userApi.verifyOTP({
      email: emailRe,
      otp,
    });
    if (res.data.status === 200) {
    
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