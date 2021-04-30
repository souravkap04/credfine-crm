import React,{useState} from 'react'
import './UploadLeads.css';
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import SampleData from './SampleData';
export default function UploadLeads() {
  const [loanType,setLoanType] = useState('');
  const [validated, setValidated] = useState(false);
  const leadsSubmitHandler = (event)=>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }
    return (
      <div className="UploadLeads">
        <Form noValidate validated={validated} onSubmit={leadsSubmitHandler}>
          <Card className="Card">
            <Form.Group>
              <Form.Control required as="select" defaultValue="Select One"
              value={loanType} onChange={(e)=>setLoanType(e.target.value)}>
                <option value=''>Select One</option>
                <option value="personal loan">Personal Loan</option>
                <option value="business loan">Business Loan</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Upload Leads"
              />
            </Form.Group>
            <Form.Group>
            <Button 
              variant="success" size="sm" type="submit">Submit</Button>
              </Form.Group>
              <Form.Group>
                <SampleData loanType={loanType}/> 
                </Form.Group>
          </Card>
        </Form>
      </div>
    );
}
