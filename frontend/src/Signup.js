import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import jwt from "jwt-decode";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setAuthName] = useState("");
  const [nationality, setNationality] = useState("");
  const [authorImage, setAuthImage] = useState("");

  // const [bookImage, setBookImage] = useState("");
  // const [title, setBookTitle] = useState("");
  // const [pages, setPages] = useState();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  let navigate = useNavigate();

  function signupAuthor(e) {
    e.preventDefault();
    // setEmailError("");
    // setPasswordError("");
    axios.post("/signup", { email, password,name,nationality,authorImage }).then((res) => {
      console.log(res.data);
      if (res.data.errors) {
        console.log(res.data.errors)

        setEmailError(res.data.errors.email);
        setPasswordError(res.data.errors.password);
      }
      if (res.data.author) {
        const token = res.data.token;
        const authorSign = jwt(token); // decode your token here
        localStorage.setItem("token", token);
        navigate("/");
      }
    });
  }

  return (
    <>
    <Form>
        <h2>Sign up</h2>
        <Form.Control placeholder="author name" onChange={(e) => setAuthName(e.target.value)}></Form.Control>
        <Form.Control placeholder="author nationality" onChange={(e) => setNationality(e.target.value)}></Form.Control>
        <Form.Control placeholder="author image" onChange={(e) => setAuthImage(e.target.value)}></Form.Control>
        <Form.Control
          type="text"
          name="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
        <div className="email error">{emailError}</div>
        <Form.Control
          type="password"
          name="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        <div className="password error">{passwordError}</div>
        {/* <input placeholder="book title" onChange={(e) => setBookTitle(e.target.value)}></input>
        <input placeholder="book pages" onChange={(e) => setPages(e.target.value)}></input>
        <input placeholder="book image" onChange={(e) => setBookImage(e.target.value)}></input> */}
        <button className="btn btn-success" onClick={(e) => signupAuthor(e)}>Sign up</button>
        </Form>
    </>
  );
}

export default Signup;
