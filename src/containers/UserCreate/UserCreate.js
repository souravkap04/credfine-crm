import React, { useState } from "react";
import axios from 'axios';
import baseUrl from '../../global/api';
import { Form ,Button, Card} from "react-bootstrap";
import "./UserCreate.css";

export default function UserCreate() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role,setRole] = useState("");
  const [productType,setProductType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [validated, setValidated] = useState(false);

  const userCteateHandler = async (event)=>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
   setValidated(true);
    event.preventDefault();
    let item = {userName,firstName,lastName,email,role,productType,phoneNo,gender};
    console.log(item);
    let header={'Content-type': 'application/json; charset=UTF-8',}
    try{
     const response = await axios.post(`${baseUrl}/user/userRegistration/`,item ,header);
    console.log(response.data);
    }catch(error){
      console.error(error);
    }
   
  }
  return (
    <div className="CreateUser">
      <Form noValidate validated={validated} onSubmit={userCteateHandler}>
        <Card className="UserCreateCard">
        <Form.Label className="UserCreateText">
          User Create
          <hr className="UserCreateBar"/>
          </Form.Label>
        <Form.Group size="lg" controlId="userName">
         <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>User Name</Form.Label>
         <Form.Control 
         required
         autoFocus
         type="text"
         value={userName}
         onChange={(e)=>setUserName(e.target.value)}/>
         <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
        </Form.Group>
        <Form.Group size="lg" controlId="firstName">
      <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>First Name</Form.Label>
      <Form.Control 
      required
      type="text"
      value={firstName}
      onChange={(e)=> setFirstName(e.target.value)}/>
      <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
      </Form.Group>
      <Form.Group size="lg" controlId="lastName">
      <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Last Name</Form.Label>
      <Form.Control 
      required
      type="text"
      value={lastName}
      onChange={(e)=> setLastName(e.target.value)}/>
      <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
      </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Email Id</Form.Label>
          <Form.Control
          required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="role">
      <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Role</Form.Label>
      <Form.Control required as="select" 
      value={role} onChange={(e)=>setRole(e.target.value)}>
      <option value=''>Select One</option>
        <option value="1">Admin</option>
        <option value="2">Manager</option>
        <option value="3">Agent</option>
      </Form.Control>
      <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
    </Form.Group>
    <Form.Group  controlId="productType">
      <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Product Type</Form.Label>
      <Form.Control required as="select" 
      value={productType} onChange={(e)=>setProductType(e.target.value)}>
      <option value=''>Select One</option>
        <option value="PL">Personal Loan</option>
        <option value="BL">Business Loan</option>
      </Form.Control>
      <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
    </Form.Group>
    <Form.Group size="lg" controlId="phoneNo">
          <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Phone No</Form.Label>
          <Form.Control
          required
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="gender">
      <Form.Label  style={{color:"#313F80",fontFamily: "Lato"}}>Gender</Form.Label>
      <Form.Control required as="select" 
      value={gender} onChange={(e)=>setGender(e.target.value)}>
      <option value=''>Select One</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </Form.Control>
      <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
    </Form.Group>
     <Button variant="success"  type="submit" >CREATE</Button>
    </Card>
      </Form>
      
    </div>
  );
}
