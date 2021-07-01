import React,{useState}from "react";
import axios from 'axios';
import style from './PlForm.module.css';
import { Form, Card, Button, Row, Col,Alert,ListGroup} from "react-bootstrap";
import baseUrl from "../../global/api";
import {getProfileData} from '../../global/leadsGlobalData'
export default function PlForm() {
  const profileData = getProfileData();
  const [loanAmount,setLoanAmount] = useState('');
  const [employmentType,setEmploymentType] = useState('');
  const [monthlyIncome,setMonthlyIncome] = useState('');
  const [date,setDate] = useState(new Date());
  const [mobileNo,setMobileNo] = useState('');
  const [pincode,setPincode] = useState('');
  const [fullName,setFullName] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [searchCompany,setSearchCompany] = useState([]);
  const [showCompany,setShowCompany] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');
  const [isDisplay,setIsDisplay] = useState(false);
 
  const personalLoanSubmitHandler = async (event) =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    let item = {loan_amount:loanAmount,monthly_income:monthlyIncome,dob:date,phone_no:mobileNo,
      residential_pincode:pincode,current_company_name:companyName,name:fullName,
      current_company:employmentType,loan_type:"PL"};
    let headers = {
      'Authorization': `Token ${profileData.token}` ,
      'Content-Type' : 'application/json'
    }  
      await axios.post(`${baseUrl}/leads/lead_create/`,item,{headers})
      .then((response)=>{
        setAlertMessage(response.data.message);
        setIsDisplay(true);
      }).catch((error)=>{
        alertMessage("Something wrong");
        isDisplay(true)
      })

  }
  const searchCompanyHandler = async (e)=>{
    setCompanyName(e.target.value);
    setShowCompany(true);
    const searchCompanyUrl = "https://backend.credfine.com/common/search_company";
    let item = {company:companyName};
    const header = {'Content-Type':'application/json'}
    if(companyName.length >=2){
     await axios.post(`${searchCompanyUrl}`,item , {header})
     .then((response)=>{
       setSearchCompany(response.data);
     }).catch((error)=>{
       console.log(error)
     })
  
    }
  }
  const selectCompany = (company)=>{
    setCompanyName(company);
    setShowCompany(false);
  }
  return (
    <div >
       <Form noValidate validated={validated} onSubmit={personalLoanSubmitHandler}>
        <Card className={style.Card}>
        {isDisplay ?<Alert variant="primary">{alertMessage}</Alert>:null}
          <Form.Label className={style.Heading}>Personal Loan</Form.Label>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control
                required
                type="number"
                value={loanAmount}
                onChange={(e)=>setLoanAmount(e.target.value)}
              />
              <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
             
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Employment Type</Form.Label>
                <Form.Control 
                required
                as="select" 
                value={employmentType} onChange={(e)=>setEmploymentType(e.target.value)}>
                  <option value='' >Select One</option>
                <option value="1">Salaried</option>
                <option value="2">Self-Employed</option>
               <option value="3">Self-Employed Professional</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Net Monthly Income</Form.Label>
                <Form.Control 
                required
                type="number"
                value={monthlyIncome}
                onChange={(e)=>setMonthlyIncome(e.target.value)}/>
                <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
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
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control 
                required
                type="number"
                value={mobileNo}
                onChange={(e)=>setMobileNo(e.target.value)}/>
                <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
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
                <Form.Label>Company Name</Form.Label>
                <Form.Control 
                required
                type="text"
                value={companyName}
                onChange={(e)=>searchCompanyHandler(e)}/>
                <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
                <ListGroup>
                    {showCompany ? searchCompany.map((company)=>(
                      <ListGroup.Item key={company.id}
                      onClick={()=>selectCompany(company.name)}
                      >{company.name}</ListGroup.Item>
                    )) : null}
                  </ListGroup>
              </Form.Group>
            </Col>
          </Form.Row>
          <Button className={style.Button}
              variant="success"  type="submit">CONTINUE</Button>
          
        </Card>
      </Form>
    </div>
  );
}
