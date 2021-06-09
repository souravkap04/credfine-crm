import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import baseUrl from '../../global/api'
import style from "./Login.module.css";
import { Form, Card, Button, Image ,Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import crmLogo from "../../images/loginImage.svg";
import {getProfileData} from '../../global/leadsGlobalData'
export default function Login() {
 // const profileData = getProfileData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');
  const [isDisplay,setIsDisplay] = useState(false);
  let history = useHistory();
  
  const loginFormSubmitHandler = async (event) =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
   setValidated(true);
    event.preventDefault();
    let item ={username:email,password};
  await axios.post(`${baseUrl}/user/login/`,item)
  .then((response)=>{
    localStorage.setItem('user_info',JSON.stringify(response.data));
    const profileData = JSON.parse(localStorage.getItem('user_info'));
    console.log('userInfo:'+profileData);
    console.log('token'+profileData.token);
    if(profileData.is_admin_verified){
      history.push("/dashboard");
      console.log("status_info:"+`Token ${profileData.token}`);
      let headers = {'Authorization':`Token ${profileData.token}`};
       axios.get(`${baseUrl}/leads/fetchAllLeads/`,{headers})
      .then((response)=>{
        localStorage.setItem('status_info',JSON.stringify(response.data));
        console.log('statusinfo');
      }).catch((error)=>{
        console.log(error);
      })
    }
  }).catch(error=>{
    console.log(error);
       setAlertMessage('Wrong Password')
       setIsDisplay(true);
  })
  
    
  }
  return (
    <div className={style.Login}>
      <Form noValidate validated={validated} onSubmit={loginFormSubmitHandler}>
        <Card className={style.Card}>
          {isDisplay ? <Alert variant="primary">{alertMessage}</Alert>:null}
          <Form.Group>
            <Form.Label >
              <img src={crmLogo} alt="CRM Logo"style={{height:'10vh',marginBottom:'20px'}}/>
            </Form.Label>
            <Form.Label className={style.TextLogin}>
              Login
              <hr className={style.HorizontlaBar}/>
            </Form.Label>
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label style={{color:"#313F80",fontFamily: "Lato"}}>Email Id / Emp Code</Form.Label>
            <Form.Control
              autoFocus
              required
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label style={{color:"#313F80",fontFamily: "Lato"}}>Password</Form.Label>
            <Form.Control
            required
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="success"
            type="submit" >
            LOGIN
          </Button>
        </Card>
      </Form>
    </div>
  );
}
