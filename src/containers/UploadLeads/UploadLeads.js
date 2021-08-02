import React,{useState} from 'react';
import axios from 'axios';
import baseUrl from '../../global/api';
import style from './UploadLeads.module.css';
import { Form, Card, Button, Row, Col ,Alert} from "react-bootstrap";
import {getProfileData} from '../../global/leadsGlobalData'
import SampleData from './SampleData';
export default function UploadLeads() {
  const profileData = getProfileData();
  const [loanType,setLoanType] = useState('');
  const [validated, setValidated] = useState(false);
  const [file,setFile] = useState('');
  const [alertMessage,setAlertMessage] = useState('');
  const [isDisplay,setIsDisplay] = useState(false);
  const leadsSubmitHandler =async (event)=>{
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      const fromData= new FormData();
      fromData.append('file',file);
      let headers = {
        'Authorization': `Token ${profileData.token}`,
        'Content-Type': 'multipart/form-data'
      }
      
      await axios.post(`${baseUrl}/leads/lead_bulk_upload/PL`,fromData,{headers})
      .then((response)=>{
        setAlertMessage(`${response.data.created_count} Leads Successfully uploaded and
         ${response.data.duplicated_count} Was Duplicated`)
        setIsDisplay(true);
      }).catch(error =>{
        setAlertMessage('wrong File Was choosen')
        setIsDisplay(true);
      })
    }else{
      setValidated(true);
      event.preventDefault();
    }
  }
   return (
      <div >
        <Form noValidate validated={validated} onSubmit={leadsSubmitHandler}>
          <Card className={style.Card}>
          {isDisplay && <Alert className={style.alertBox}>{alertMessage}</Alert>}
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
                accept="application/vnd.ms-excel"
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
