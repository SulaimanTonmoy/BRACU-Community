import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MiddleBox from "../MiddleBox/MiddleBox";
import axios from "axios";
import "./Login.css";

function Login() {
  const input_box = {
    width: "80%",
    height: "50px",
    flexShrink: "0",
    borderRadius: "25px",
    background: "rgba(52, 100, 157, 0.4)",
    border: "1px solid rgba(52, 100, 157, 1)",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    margin: "auto",
    padding: "0 20px",
    "&::placeholder": {
      color: "#FFF",
    },
  };

  const button_style = {
    display: "block",
    margin: "auto",
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: "3vh",
    fontStyle: "normal",
    fontWeight: 700,
    width: "250px",
    flexShrink: "0",
    borderRadius: "40px",
    background: "rgba(42, 95, 172, 0.60)",
    marginTop: "2vh",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
  };

  const signup_text = {
    color: "#000",
    fontFamily: "Inter",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: "normal",
    margin: "auto",
    marginTop: "10vh",
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erromsg, setErrormsg] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if email and password are correct, navigate to newsfeed with correct user profile
    axios
      .get(`http://localhost:3000/user/getuser/${email}/${password}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.length == 1) {
          navigate("/home", { state: res.data[0] });
        } else {
          setErrormsg("Invalid credentials");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <MiddleBox logo="src/assets/Logo.png" logo_name="Logo">
      <form className="login_form" onSubmit={handleSubmit}>
        <p className="text-center section_text">Login</p>
        {/* User name or email field */}
        <input
          type="email"
          className="form-control mb-3"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Username or Email"
          style={{ ...input_box, marginTop: "5vh" }}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {/* Password field */}
        <input
          type="password"
          className="form-control mb-3"
          id="exampleInputPassword1"
          placeholder="Password"
          style={{ ...input_box, marginTop: "4vh" }}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {/* Forgot password link */}
        <p style={{ color: "red", margin: "auto", textAlign: "center" }}>
          {erromsg}
        </p>
        <a href="#" className="forgot_password">
          Forgot Password?
        </a>
        {/* Login button */}
        <button type="submit" className="btn" style={{ ...button_style }}>
          Let's go
        </button>
      </form>

      {/* Signup section */}
      <p className="text-center" style={{ ...signup_text }}>
        Do not have an account?
      </p>
      <Link to="/signup"
        type="submit"
        className="btn"
        style={{
          ...button_style,
          color: "rgba(42, 95, 172)",
          background: "rgba(255, 255, 255, 0.60)",
        }}
      >
        Sign Up
      </Link>
    </MiddleBox>
  );
}

export default Login;
