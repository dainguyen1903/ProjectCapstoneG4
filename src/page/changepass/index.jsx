import { Card, Input, Row, Button, Form, Col, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../login/login.css";
import { useState } from "react";
import useAuthStore from "../../zustand/authStore";
import useUserStore from "../../zustand/userStore";
const ChangePassword = () => {
    const navgate = useNavigate()
    const [newPassword,setNewPassword] = useState("");
    const [confirmNewPassword,setConfirmNewPassword] = useState("");
    const user = useAuthStore(state => state.user);
    const updateuser = useUserStore(state => state.updateuser)
    const [err,setErr] = useState("")
    const handleChangePass = () => {
      if(!newPassword){
        setErr("Vui lòng nhập mật khẩu")
      }
      else if(newPassword.trim().length < 6){
        setErr("Mật khẩu ít nhất 6 kí tự")

      }
      else if(!newPassword !== !confirmNewPassword){
        setErr("Xác nhận mật khẩu không khớp")
      }
      else{
        setErr("")
       const idUser = user.id;
      new Promise((resolve) => {
        setTimeout(() => {
          updateuser(idUser,{
            password:newPassword
           })
           resolve()
        },1000)
      }).then(v => {
        Modal.success({
          title:"Thành công",
          content:"Cập nhật mật khẩu thành công"
        })
      })
      }

    }
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
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mật khẩu mới" type="password" className="Input" />
          <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Xác nhận mật khẩu mới" type="password" className="Input" />
         {err && <span style={{color:"red",marginBottom:5}}>{err}</span>}
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
           
            <p className="Paragraph">
             
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
