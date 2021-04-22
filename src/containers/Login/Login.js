import React, { useState } from "react";
import "./Login.css";
import { Form, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import crmLogo from "../../images/loginImage.svg";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function submitHandler(event) {
    event.preventDefault();
  }
  return (
    <div className="Login">
      <Form onSubmit={submitHandler}>
        <Card className="Card">
          <Form.Group>
            <Form.Label >
              <img src={crmLogo} style={{height:'10vh',marginBottom:'20px'}}/>
            </Form.Label>
            <Form.Label className="TextLogin">
              Login
            </Form.Label>
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label style={{color:"#313F80",fontFamily: "Lato"}}>Email Id / Emp Code</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label style={{color:"#313F80",fontFamily: "Lato"}}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="success"
            size="sm"
            type="submit"
            disabled={!validateForm}
          >
            LOGIN
          </Button>
          {/* <Link to="/userCreate">Create User</Link> */}
        </Card>
      </Form>
    </div>
  );
}
