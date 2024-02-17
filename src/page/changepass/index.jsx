import { Card, Input, Row, Button, Form, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../login/login.css";
const ChangePassword = () => {
    const navgate = useNavigate()
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
            Change Password
          </p>
          <input placeholder="New password" type="password" className="Input" />
          <input placeholder="Confirm new password" type="password" className="Input" />
         
          <button
          onClick={()=> navgate("/manageuser")}
            style={{
              width: "100%",
            }}
            className="Button"
          >
           Submit
          </button>
        </div>
      </div>
      <div className="OverlayContainer">
        <div className="Overlay">
          <div className="RightOverlayPanel">
            <h2 className="Title">Change pass word!</h2>
           
            <p className="Paragraph">
             
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
