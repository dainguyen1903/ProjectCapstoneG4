import { useNavigate } from "react-router"
import "./../login/login.css"
const Register = () => {
    const navigate = useNavigate()
    return <div className="Container">
      <div className="SignInContainer">
        <div className="Form">
          <p
            style={{
              color: "red",
            }}
            className="Title"
          >
            Create Account
          </p>
          <input placeholder="Email" className="Input" />
          <input placeholder="Password" type="password" className="Input" />
          <p className="Anchor">Forgot password?</p>
          <button
            style={{
              width: "100%",
            }}
            className="Button"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="OverlayContainer">
        <div className="Overlay">
          <div className="RightOverlayPanel">
            <h2 className="Title">Welcome Back!</h2>
            <p className="Paragraph">
              {" "}
              To keep connected with us please login with your personal info
            </p>
            <p className="Paragraph">
              <button onClick={() => navigate("/login")} className="Button GhostButton">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
}
export default Register