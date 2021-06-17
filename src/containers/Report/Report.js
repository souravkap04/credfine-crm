import React,{useState} from 'react'
import style from './Report.module.css';
import moment from 'moment';
import { Form, Card, Button, Row, Col, FormControl} from "react-bootstrap";
export default function Report() {
    const [startDate , setStartDate] = useState(new Date());
    const [endDate , setEndDate] = useState("");
    const [status , setStatus] = useState("");
    const [productType , setProductType] = useState("");
    const [errors,setErrors] = useState({});
    
    const findErrors = ()=>{
      let newErrors = {};
      if(!startDate || startDate === ''){
        newErrors.startDate = 'This is requires field'
      }
      if(!endDate || endDate === ''){
        newErrors.endDate = 'This is required field'
      }
      if(!status || status === ''){
        newErrors.status = 'This is required field'
      }
      if(!productType || productType === ''){
        newErrors.productType = 'This is required field'
      }
      return newErrors;
    }
    
    const reportSubmit = (event)=>{
      const newErrors = findErrors();
      setErrors(newErrors);
      event.preventDefault()
  }
    return (
        <div>
            <Form onSubmit={reportSubmit}>
              <Card className={style.card}>
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
                       isInvalid={!!errors.status}>
                          <option value="">Select One</option> 
                          <option value="open">Open</option>
                       </FormControl>
                       <Form.Control.Feedback type="invalid"> {errors.status}</Form.Control.Feedback>
                       </Form.Group>
                     </Col>
                     <Col>
                     <Form.Group>
                       <Form.Label>Product Type</Form.Label>
                       <FormControl
                       as="select"
                       value={productType}
                       onChange={(e)=>setProductType(e.target.value)}
                       isInvalid={!!errors.productType}>
                         <option value="">Select One</option>
                         <option value="PL">Personal Loan</option>
                         <option value="BL">Business Loan</option>
                       </FormControl>
                       <Form.Control.Feedback type="invalid"> {errors.productType}</Form.Control.Feedback>
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
