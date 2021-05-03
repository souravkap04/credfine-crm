import React,{useState}from "react";
import './PlForm.css';
import { Form, Card, Button, Row, Col } from "react-bootstrap";
export default function PlForm() {
  const [loanAmount,setLoanAmount] = useState('');
  const [employmentType,setEmploymentType] = useState('');
  const [monthlyIncome,setMonthlyIncome] = useState('');
  const [date,setDate] = useState(new Date());
  const [mobileNo,setMobileNo] = useState('');
  const [pincode,setPincode] = useState('');
  const [pancard,setPancard] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [validated, setValidated] = useState(false);

 
  const personalLoanSubmitHandle = (event) =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }
  return (
    <div >
      <Form noValidate validated={validated} onSubmit={personalLoanSubmitHandle}>
        <Card className="Card">
          <Form.Label className="Heading">Personal Loan</Form.Label>
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
                defaultValue="Select One" 
                value={employmentType} onChange={(e)=>setEmploymentType(e.target.value)}>
                  <option value='' >Select One</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self-Employed</option>
               <option value="self-employes professional">Self-Employed Professional</option>
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
                value={pancard}
                onChange={(e)=>setPancard(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control 
                required
                type="text"
                value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}/>
                <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Button className="Button"
              variant="success"  type="submit">Save</Button>
          
        </Card>
      </Form>
    </div>
  );
}
