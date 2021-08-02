import React,{useState} from 'react'
import style from './Report.module.css';
import moment from 'moment';
import axios from 'axios';
import baseUrl from '../../global/api'
import {getProfileData,getStatusData} from '../../global/leadsGlobalData';
import { Form, Card, Button, Row, Col, FormControl,Alert} from "react-bootstrap";
export default function Report() {
    const [startDate , setStartDate] = useState("");
    const [endDate , setEndDate] = useState("");
    const [status , setStatus] = useState("");
    const [productType , setProductType] = useState("");
    const [alertMessage,setAlertMessage] = useState('');
    const [isDisplay,setIsDisplay] = useState(false);
    const [errors,setErrors] = useState({});
    const profileData = getProfileData();
    const statusData = getStatusData();
    
    const findErrors = (sDate,eDate)=>{
      let newErrors = {};
      let selectedStartDate = moment(sDate,'YYYY-MM-DD');
      let selectedEndDate = moment(eDate,'YYYY-MM-DD');
      let dateDiff = selectedEndDate.diff(selectedStartDate , 'days')
      
      if(!startDate || startDate === ''){
        newErrors.startDate = 'This is requires field'
      }
      if(!endDate || endDate === ''){
        newErrors.endDate = 'This is required field'
      }
      if(dateDiff>30){
        newErrors.endDate = 'Start Date and End Date should be with in 30 days'
      }
      return newErrors;
    }
    const removeDuplicateStatus = (data)=>{
      let unique = [];
      data.forEach((element)=>{
        if(!unique.includes(element.status)){
          unique.push(element.status)
        }
      })
      return unique;
    }
    const uniqueStatus = removeDuplicateStatus(statusData);
    
    const reportSubmit = async (event)=>{
      const newErrors = findErrors(startDate,endDate);
      setErrors(newErrors);
      event.preventDefault()
      if(Object.keys(newErrors).length === 0){
        const headers = {'Authorization':`Token ${profileData.token}`}
        let item = {start_date:startDate,end_date:endDate}
        await axios.post(`${baseUrl}/leads/lead_report/`,item ,{headers})
        .then((response)=>{
          setAlertMessage(response.data.msg);
          setIsDisplay(true)
        }).catch((error)=>{
            setAlertMessage("Something Wrong");
            setIsDisplay(true);
        })
      }
  }

    return (
        <div>
            <Form onSubmit={reportSubmit}>
              <Card className={style.card}>
              {isDisplay ?<Alert className={style.alertBox}>{alertMessage}</Alert>:null}
              <Form.Label className={style.Heading}>Report</Form.Label>
                 <Row>
                     <Col>
                     <Form.Group>
                       <Form.Label>Start Date</Form.Label>
                       <FormControl
                       type="date"
                       max={moment().format('YYYY-MM-DD')}
                       onChange={(e)=>setStartDate(e.target.value)}
                       isInvalid={!!errors.startDate}/>
                       <Form.Control.Feedback type="invalid"> {errors.startDate}</Form.Control.Feedback>
                       </Form.Group>
                     </Col>
                     <Col>
                     <Form.Group>
                       <Form.Label>End Date</Form.Label>
                       <FormControl
                       type="date"
                       min={startDate}
                       max={moment().format('YYYY-MM-DD')}
                       onChange={(e)=>setEndDate(e.target.value)}
                       isInvalid={!!errors.endDate}/> 
                       <Form.Control.Feedback type="invalid"> {errors.endDate}</Form.Control.Feedback>
                       </Form.Group>
                     </Col>
                 </Row>
                 <Row>
                     <Col>
                     <Form.Group>
                       <Form.Label>Status</Form.Label>
                       <FormControl
                       as="select"
                       value={status}
                       onChange={(e)=>setStatus(e.target.value)}
                       >
                          <option value="">Select One</option> 
                          {uniqueStatus.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                          ))}
                       </FormControl>
                       </Form.Group>
                     </Col>
                     <Col>
                     <Form.Group>
                       <Form.Label>Product Type</Form.Label>
                       <FormControl
                       as="select"
                       value={productType}
                       onChange={(e)=>setProductType(e.target.value)}
                       >
                         <option value="">Select One</option>
                         <option value="PL">Personal Loan</option>
                         <option value="BL">Business Loan</option>
                       </FormControl>
                       </Form.Group>
                     </Col>
                 </Row>
                 <Button className={style.button} type="submit"
                 variant="success">SUBMIT</Button>
              </Card>
            </Form>
        </div>
    )
}
