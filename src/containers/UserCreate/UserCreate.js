import React, { useState } from "react";
import { Form ,Button, Card} from "react-bootstrap";
import "./UserCreate.css";

export default function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  function submitHandler(event){
    event.preventDefault();
  }
  return (
    <div className="CreateUser">
      <Form onSubmit={submitHandler}>
        <Card className="UserCreateCard">
        <Form.Label className="UserCreateText">
          User Create
          <hr className="UserCreateBar"/>
          </Form.Label>
        <Form.Group size="lg" controlId="name">
         <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Name</Form.Label>
         <Form.Control 
         autoFocus
         type="text"
         value={name}
         onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Email Id</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="phoneNo">
          <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Phone No</Form.Label>
          <Form.Control
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
      <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Password</Form.Label>
      <Form.Control 
      type="password"
      value={password}
      onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group  controlId="role">
      <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Role</Form.Label>
      <Form.Control as="select" defaultValue="Caller">
      <option>Caller</option>
        <option>Admin</option>
        <option>Manager</option>
      </Form.Control>
    </Form.Group>
    <Button variant="success"  type="submit" >CREATE</Button>
    </Card>
      </Form>
      
    </div>
  );
}
