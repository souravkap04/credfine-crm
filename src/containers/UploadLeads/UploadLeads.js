import React,{useState} from 'react';
import axios from 'axios';
import baseUrl from '../../global/api';
import style from './UploadLeads.module.css';
import { Form, Card, Button, Row, Col ,Alert} from "react-bootstrap";
// import * as ReactBootstrap from "react-bootstrap";
import SampleData from './SampleData';
export default function UploadLeads() {
  const [loanType,setLoanType] = useState('');
  const [errors,setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [file,setFile] = useState('');
  const [alertMessage,setAlertMessage] = useState('');
  const [isDisplay,setIsDisplay] = useState(false);
  const leadsSubmitHandler =async (event)=>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    
    const fromData= new FormData();
    fromData.append('file',file);
    console.log("file:"+file)
    let headers = {
      'Authorization': 'Token 0cf9265a842c788ffaf98cdb9279d82b290bdb45',
      'Content-Type': 'multipart/form-data'
    }
    
     await axios.post(`${baseUrl}/leads/lead_bulk_upload/PL`,fromData,{headers})
     .then((response)=>{
       console.log(response.data);
       setAlertMessage('File Successfully uploaded')
       setIsDisplay(true);
     }).catch(error =>{
       console.log(error);
       setAlertMessage('wrong File Was choosen')
       setIsDisplay(true);
     })
       
     
    // const newErrors = findErrors();
    // setErrors(newErrors);
    

  }
  const findErrors = ()=>{
    const newErrors = {};
    if(!loanType || loanType === ''){
      newErrors.loanType = 'This is required field'
    }
    return newErrors;
    
}
    return (
      <div >
        <Form noValidate validated={validated} onSubmit={leadsSubmitHandler}>
          <Card className={style.Card}>
          {isDisplay ? <Alert variant="primary">{alertMessage}</Alert> : null}
            <Form.Group>
              <Form.Label>Loan Type</Form.Label>
              <Form.Control required as="select" 
              value={loanType} onChange={(e)=>setLoanType(e.target.value)}>
                <option value=''>Select One</option>
                <option value="personal loan">Personal Loan</option>
                <option value="business loan">Business Loan</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid"> This is required field</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.File
              disabled={!loanType}
                id="exampleFormControlFile1"
                label="Upload Leads"
                accept=" application/vnd.ms-excel , application/vnd.openxmlformats-officedocument.spreadsheetml.sheet "
                onChange={(e)=>setFile(e.target.files[0])}
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
