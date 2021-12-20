import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import jwt from "jwt-decode";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  let navigate = useNavigate();

  function signinAuthor(e) {
    e.preventDefault();
    // setEmailError("");
    // setPasswordError("");
    axios.post("/signin", { email, password }).then((res) => {
      console.log(res.data);
      if (res.data.errors) {
        console.log(res.data.errors)
        setEmailError(res.data.errors.email);
        setPasswordError(res.data.errors.password);
      }
      if (res.data.author) {
        console.log(res.data)
        const token = res.data.token;
        const authorSign = jwt(token); // decode your token here
        console.log(token)
        console.log(authorSign)
        localStorage.setItem("token", token);
        navigate("/");
      }
    });
  }

  return (
    <>
      <Form>
        <h2>Sign in</h2>
        <Form.Control
          type="text"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
        <div className="email error">{emailError}</div>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        <div className="password error">{passwordError}</div>
        <button className="btn btn-success" onClick={(e) => signinAuthor(e)}>Sign in</button>
      </Form>
    </>
  );
}

export default Signin;
