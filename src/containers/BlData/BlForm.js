import React,{useState} from 'react'
import './BlForm.css';
import { Form, Card, Button, Row, Col } from "react-bootstrap";
export default function BlForm() {
  const [loanAmount,setLoanAmount] = useState('');
  const [anualTurnover,setAnualTurnover] = useState('');
  const [anualProfit,setAnualProfit] = useState('');
  const [mobileNo,setMobileNo] = useState('');
  const [employmentType,setEmploymentType] = useState('');
  const [date,setDate] = useState(new Date());
  const [pancard,setPancard] = useState('');
  const [pincode,setPincode] = useState('');
  const [validated, setValidated] = useState(false);

  const businessLoanSubmitHandler = (event)=>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    
  }
    return (
        <div className="BlLoan">
      <Form noValidate validated={validated} onSubmit={businessLoanSubmitHandler}>
        <Card className="Card">
          <Form.Label className="Heading">Business Loan</Form.Label>
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
                <Form.Control required as="select" defaultValue="Select One"
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
                <Form.Control required as="select" defaultValue="Select One"
                value={employmentType} onChange={(e)=>setEmploymentType(e.target.value)}>
                <option value=''>Select One</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self-Employed</option>
               <option value="self-employes professional">Self-Employed Professional</option>
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
                 value={pancard}
                 onChange={(e)=>setPancard(e.target.value)}/>
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
              <Button 
              variant="success" size="sm" type="submit">Save</Button>
          
        </Card>
      </Form>
    </div>
  );
}
