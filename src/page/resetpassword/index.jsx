import { Card, Input, Row, Button, Form, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../login/login.css";
const ResetPass = () => {
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
            Reset Password
          </p>
          <input placeholder="Email" className="Input" />
          
          <button
          onClick={()=> navgate("/manageuser")}
            style={{
              width: "100%",
            }}
            className="Button"
          >
            Confirm
          </button>
        </div>
      </div>
      <div className="OverlayContainer">
        <div className="Overlay">
          <div className="RightOverlayPanel">
            <h2 className="Title">Hello, Friend!</h2>
            <p className="Paragraph">
              {" "}
              Enter Your personal details and start journey with us
            </p>
            <p className="Paragraph">
              <button onClick={() => navgate("/register")} className="Button GhostButton">Sigin Up</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPass;
