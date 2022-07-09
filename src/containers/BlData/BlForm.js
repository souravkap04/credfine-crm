import React,{useState} from 'react'
import axios from 'axios';
import style from './BlForm.module.css';
import { Form, Card, Button, Row, Col, Alert } from "react-bootstrap";
import baseUrl from '../../global/api';
import {getProfileData} from "../../global/leadsGlobalData"
export default function BlForm() {
  const profileData = getProfileData();
  const [loanAmount,setLoanAmount] = useState('');
  const [anualTurnover,setAnualTurnover] = useState('');
  const [anualProfit,setAnualProfit] = useState('');
  const [mobileNo,setMobileNo] = useState('');
  const [employmentType,setEmploymentType] = useState('');
  const [date,setDate] = useState(new Date());
  const [fullName,setFullName] = useState('');
  const [pincode,setPincode] = useState('');
  const [campaign,setCampaign] = useState("");
  const [validated, setValidated] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');
  const [isDisplay,setIsDisplay] = useState(false);

  const businessLoanSubmitHandler = async (event)=>{
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      let item = {loan_amount:loanAmount,monthly_income:anualProfit,dob:date,phone_no:mobileNo,
        residential_pincode:pincode,name:fullName,
        current_company:employmentType,loan_type:"BL",campaign_category:campaign};
      let headers = {
        'Authorization': `Token ${profileData.token}`,
        'Content-Type' : 'application/json'
      }  
        await axios.post(`${baseUrl}/leads/lead_create/`,item,{headers})
        .then((response)=>{
          setAlertMessage(response.data.message);
          setIsDisplay(true);
        }).catch((error)=>{
          setAlertMessage("Something Wrong");
          setIsDisplay(true);
        })
    }else{
      setValidated(true);
      event.preventDefault();
    }
  }
    return (
        <div >
           <Form noValidate validated={validated} onSubmit={businessLoanSubmitHandler}>
        <Card className={style.Card}>
        {isDisplay ?<Alert className={style.alertBox}>{alertMessage}</Alert>:null}
          <Form.Label className={style.Heading}>Business Loan</Form.Label>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control 
                 required
                 type="number"
                 value={loanAmount}
                 onChange={(e)=>setLoanAmount(e.target.value)}/>
                  <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Gross Annual Turnover</Form.Label>
                <Form.Control required as="select"
                value={anualTurnover} onChange={(e)=>setAnualTurnover(e.target.value)}>
                    <option value=''>Select One</option>
                    <option value="upto 5lacs">Upto 5Lacs</option>
                    <option value="5-10lacs">5-10 Lacs</option>
                    <option value="10-25lacs">10-25 Lacs</option>
                    <option value="25-50lacs">25-50 Lacs</option>
                    <option value="50-75lacs">50-75 Lacs</option>
                    <option value="75-1cr">75-1 Cr</option>
                    <option value="1-3cr">1-3 Cr</option>
                    <option value="3-5cr">3-5 Cr</option>
                    <option value="5+cr">5+ Cr</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Net Annual Profit</Form.Label>
                <Form.Control 
                required
                 type="number"
                 value={anualProfit}
                 onChange={(e)=>setAnualProfit(e.target.value)}/>
                  <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control 
                required
                 type="number"
                 value={mobileNo}
                 onChange={(e)=>setMobileNo(e.target.value)}/>
                  <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Employment Type</Form.Label>
                <Form.Control required as="select" 
                value={employmentType} onChange={(e)=>setEmploymentType(e.target.value)}>
                  <option value=''>Select One</option>
                  <option value="1">Salaried</option>
                  <option value="2">Self-Employment Business</option>
                  <option value="3">Self-Employment Profetional</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                 <Form.Control required type="date" name="dob" placeholder="Date of Birth"
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}/>
                   <Form.Control.Feedback type="invalid"> Invalid Date of Birth</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Full Name As Per Pancard</Form.Label>
                <Form.Control 
                 type="text"
                 value={fullName}
                 onChange={(e)=>setFullName(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Current Residence Pincode</Form.Label>
                <Form.Control 
                required
                 type="number"
                 value={pincode}
                 onChange={(e)=>setPincode(e.target.value)}/>
                  <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="campaign">
            <Form.Label className={style.Input_lable}>Campaign</Form.Label>
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
              <option value='WEBSITE'>WEBSITE</option>
              <option value='OTHER'>OTHER</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'> This field is required </Form.Control.Feedback>
          </Form.Group>
            </Col>
          </Form.Row>
              <Button className={style.Button}
              variant="success" type="submit">CONTINUE</Button>
          
        </Card>
      </Form>
    </div>
  );
}
