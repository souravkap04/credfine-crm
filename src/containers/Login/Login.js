import React, { useState } from "react";
import { useHistory ,Redirect} from "react-router-dom";
import axios from 'axios'
import baseUrl from '../../global/api'
import style from "./Login.module.css";
import { Form, Card, Button,Alert} from "react-bootstrap";
import { Link } from "react-router-dom";
import crmLogo from "../../images/loginImage.svg";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [campaign,setCampaign] = useState("");
  const [validated, setValidated] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');
  const [isDisplay,setIsDisplay] = useState(false);
  const [errors,setErrors] = useState({});
  const [isTimeout, setIsTimeout] = useState(false);
  let history = useHistory();

  const loginFormSubmitHandler = async (event) =>{
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      let item ={username:email, password ,campaign_category:campaign };
      await axios.post(`${baseUrl}/user/login/`,item)
      .then((response)=>{
        localStorage.setItem('user_info',JSON.stringify(response.data));
        const profileData = JSON.parse(localStorage.getItem('user_info'));
        if(profileData.is_admin_verified){
          history.push("/dashboard");
          let headers = {'Authorization':`Token ${profileData.token}`};
           axios.get(`${baseUrl}/leads/fetchAllLeads/`,{headers})
          .then((response)=>{
            localStorage.setItem('status_info',JSON.stringify(response.data));
          }).catch((error)=>{
            console.log(error);
          })
        }
      }).catch(error=>{
           setAlertMessage('Wrong Password')
           setIsDisplay(true);
      })
    }else{
      event.preventDefault();
      setValidated(true);
    }
  
}
    
  return (
    <div className={style.Login}>
      <Form noValidate validated={validated}  onSubmit={loginFormSubmitHandler}>
        <Card className={style.Card}>
          {isDisplay ? <Alert className={style.alertBox}>{alertMessage}</Alert>:null}
          <Form.Group>
            <img src={crmLogo} alt="CRM Logo"style={{height:'10vh',marginBottom:'20px'}}/>
            <Form.Label className={style.TextLogin}>
              Login
              <hr className={style.HorizontlaBar}/>
            </Form.Label>
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label style={{color:"#313F80",fontFamily: "Lato"}}>Email Id / Emp Code</Form.Label>
            <Form.Control
            required
              autoFocus
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid"> This field is required </Form.Control.Feedback>
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
          <Form.Group controlId="campaign">
            <Form.Label style={{color:"#313F80",fontFamily: "Lato"}}>Campaign</Form.Label>
            <Form.Control
            required
            as="select"
            value={campaign}
            onChange={(e)=>setCampaign(e.target.value)}
            >
              <option value=''>Select One</option>
              <option value='FRESH_PL_OD'>FRESH_PL_OD</option>
              <option value='BT_PL_OD'>BT_PL_OD</option>
              <option value='PL_OD_TOP_UP'>PL_OD_TOP_UP</option>
              <option value='PRE_APPROVED'>PRE_APPROVED</option>
              <option value='HOT_LEAD'>HOT_LEAD</option>
              <option value='WEBSITE_LEAD'>WEBSITE_LEAD</option>
              <option value='OTHER'>OTHER</option>
              {/* <option value='Low_credit'>Low Credit</option> */}
            </Form.Control>
            <Form.Control.Feedback type='invalid'> This field is required </Form.Control.Feedback>
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
