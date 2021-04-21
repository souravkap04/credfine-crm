import React,{useState} from 'react'
import "./Login.css";
import {Form, Card , Button } from 'react-bootstrap';
import {Link} from "react-router-dom"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function submitHandler(event){
    event.preventDefault();
    
  }
  return (
    <div className="Login">
      <Card className="Card">
      <Form onSubmit={submitHandler}>
      <Form.Label style={{fontWeight:"bold"}}>Login</Form.Label>
      <Form.Group size="lg" controlId="email">
      <Form.Label>Email Id / Emp Code</Form.Label>
      <Form.Control 
      autoFocus
      type="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group size="lg" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control 

      type="password"
      value={password}
      onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
     <Button variant="success" block size="md" type="submit" disabled={!validateForm}>LOGIN</Button>
     <Link to="/userCreate">Create User</Link>
      </Form>
      </Card>
    </div>
  )
}
