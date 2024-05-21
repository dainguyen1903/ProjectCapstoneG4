import React from "react";
import * as Components from "./Components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation, useNavigate } from "react-router-dom";
import { userApi } from "../../api/user.api";
import { Spin } from "antd";
export const TxtErr = ({ txt }) => {
  return (
    <div
      style={{
        color: "red",
        width: "100%",
        textAlign: "start",
        marginTop: -5,
        fontSize: 13,
      }}
    >
      {txt}
    </div>
  );
};
function Login() {
  const [signIn, toggle] = React.useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  // register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [rePasswordReg, setrePasswordReg] = useState("");
  const [errReg, setErrReg] = useState("");

  //
  const [isOpt, setIsOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [errOtp, setErrOtp] = useState("");
  const redirectpath = location.state?.from || "/";
  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        loginAction({
          email,
          password,
        })
      );

      const originResult = unwrapResult(result);
      setLoading(false);
      navigate(redirectpath, { replace: true });
    } catch (error) {
      console.log(error)
      if(typeof error === "string"){
        setErr(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // register
  const handleRegister = async () => {
    try {
      setLoading(true);
      const dataPost = {
        firstName,
        lastName,
        email: emailReg,
        password: passwordReg,
        repassword: rePasswordReg,
      };
      const res = await userApi.register(dataPost);
      if (res?.data.status === 200) {
        setIsOtp(true);
      } else {
        setErrReg(res?.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      const errObj = error?.response?.data;
      const messArr = Object.values(errObj);
      setErrReg(messArr[0]);
    }
  };

  // reset
  const resetRegister = () => {
    setFirstName("");
    setLastName("");
    setPasswordReg("");
    setrePasswordReg("");
    setEmailReg("");
    setIsOtp(false);
  };
  const handleConfirmOTP = async () => {
    setLoading(true);
    const res = await userApi.verifyOTP({
      email: emailReg,
      otp,
    });
    if (res.data.status === 200) {
      const currentEmail = emailReg;
      const currentPass = passwordReg;
      setErrReg("");
      setEmail(currentEmail);
      setPassword(currentPass);
      resetRegister();
      toggle(true);
    } else {
      setErrOtp(res.data.message);
    }
    setLoading(false);
  };

   const handleReOTP = async() => {
    setOtp("")
    setLoading(true)
     const res = await userApi.genOtp({
        email:emailReg
     })
     if(res.data.status ===200){
        setErrOtp("");
     }
     setLoading(false)
   }
  return (
    <Components.BodyLogin>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          {!isOpt && (
            <Components.Form>
              <Components.Title>Tạo tài khoản</Components.Title>
              <Components.Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Họ và tên đệm"
              />
              <Components.Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Tên"
              />
              <Components.Input
                value={emailReg}
                onChange={(e) => setEmailReg(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <Components.Input
                value={passwordReg}
                onChange={(e) => setPasswordReg(e.target.value)}
                type="password"
                placeholder="Mật khẩu"
              />
              <Components.Input
                value={rePasswordReg}
                onChange={(e) => setrePasswordReg(e.target.value)}
                type="password"
                placeholder="Xác nhận mật khẩu"
              />
              <TxtErr txt={errReg} />
              <Components.Button
                disabled={loading}
                style={{
                  marginTop:5,
                  marginBottom:5,
                  background: loading && "gray",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                {loading && (
                  <Spin
                    size="small"
                    style={{
                      color: "white",
                    }}
                  />
                )}{" "}
               Đăng ký
              </Components.Button>
            </Components.Form>
          )}
          {isOpt && (
            <Components.Form>
              <Components.Title>NHẬP OTP</Components.Title>
              <Components.Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="OTP"
              />
              <TxtErr txt={errOtp} />
              {errOtp && (
                <Components.Button
                  disabled={loading}
                  style={{
                    background: loading && "gray",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleReOTP();
                  }}
                >
                  {loading && (
                    <Spin
                      size="small"
                      style={{
                        color: "white",
                      }}
                    />
                  )}{" "}
                  Tạo lại
                </Components.Button>
              )}
              {!errOtp && (
                <Components.Button
                  disabled={loading}
                  style={{
                    background: loading && "gray",
                    marginTop:5
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirmOTP();
                  }}
                >
                  {loading && (
                    <Spin
                      size="small"
                      style={{
                        color: "white",
                      }}
                    />
                  )}{" "}
                  Xác nhận
                </Components.Button>
              )}
            </Components.Form>
          )}
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Đăng nhập</Components.Title>
            <Components.Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <Components.Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <div
              style={{
                color: "red",
                fontSize: 13,
                textAlign: "start",
                width: "100%",
              }}
            >
              {err}
            </div>
            <Components.Anchor
              onClick={(e) => {
                e.preventDefault();
                navigate("/send-otp");
              }}
            >
             Quên mật khẩu?
            </Components.Anchor>

            <Components.Button
              disabled={loading}
              style={{
                background: loading && "gray",
              }}
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {loading && (
                <Spin
                  size="small"
                  style={{
                    color: "white",
                  }}
                />
              )}{" "}
              Đăng nhập
            </Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Mừng trở lại!</Components.Title>
              <Components.Paragraph>
              Để duy trì kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn.
              </Components.Paragraph>
              <Components.GhostButton
                onClick={(e) => {
                  e.preventDefault("");
                  resetRegister();
                  toggle(true);
                }}
              >
                Đăng nhập
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Chào bạn!</Components.Title>
              <Components.Paragraph>
              Nhập thông tin cá nhân của bạn và bắt đầu hành trình cùng chúng tôi.
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Đăng ký
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Components.BodyLogin>
  );
}

export default Login;
