import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  ListGroup,
} from "react-bootstrap";
import {
  getBank,
  getResidentType,
  getSalaryModeType,
} from "../../global/leadsGlobalData";
import style from "./LeadDetails.module.css";
import baseUrl from "../../global/api";
import RemarkForm from "./Remarks/RemarkForm";
function LeadDetails(props) {
  const banks = getBank();
  const residentType = getResidentType();
  const salaryMode = getSalaryModeType();
  const [loanAmount, setLoanAmount] = useState("");
  const [leadId,setLeadId] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [ currentCompany , setCurrentCompany] = useState("");
  const [date, setDate] = useState(new Date());
  const [mobileNo, setMobileNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [name, setname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [searchCompany, setSearchCompany] = useState([]);
  const [pancardNo, setPancardNo] = useState("");
  const [totalWorkExp, setTotalWorkExp] = useState("");
  const [currentWorkExp, setCurrentWorkExp] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [currentEMI, setCurrentEMI] = useState("");
  const [creditCardOutstanding, setCreditCardOutstanding] = useState("");
  const [salaryCreditMode, setSalaryCreditMode] = useState("");
  const [salaryBankAcc, setSalaryBankAcc] = useState("");
  const [currentResidentType, setCurrentResidentType] = useState("");
  const [yearsInCurrentCity, setYearsInCurrentCity] = useState("");
  const [isEditable,setIsEditable] = useState(false);
  const [status,setStatus] = useState('');
  const [subStatus,setSubStatus] = useState([]);
  const [leadStatus,setLeadStatus] = useState("");
  const [leadSubStatus,setLeadSubStatus] = useState("");
  const [loanType,setLoanType] = useState("");
  const [source,setSource] = useState("");
  const [alertMessage, setAlertMessage] = useState({leadDetails:'',status:'',error:''});
  const [isStatus, setIsStatus] = useState(false);
  const [isLeadDetails, setIsLeadDetails] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  let statusData = JSON.parse(localStorage.getItem('status_info'));
  
  
  useEffect(() => {
    const fetchLeadDetaile = async (leadId) => {
      let headers = {'Authorization':'Token e9f8746ae94a00aa6526122f2db67e081ca10f54'}
      try {
        await axios
          .get(`${baseUrl}/leads/lead_detail/${leadId}`,{headers})
          .then((response) => {
            console.log(response.data);
            setLeadId(response.data.lead_data.lead_crm_id);
            setLoanAmount(response.data.lead_data.loan_amount);
            setMonthlyIncome(response.data.lead_data["data"].monthly_income);
            setCurrentCompany(response.data.lead_data['data'].current_company);
            setDate(response.data.lead_data["data"].dob);
            setMobileNo(response.data.lead_data.phone_no);
            setPincode(response.data.lead_data["data"].residential_pincode);
            setname(response.data.lead_data.name);
            setCompanyName(response.data.lead_data["data"].current_company_name);
            setLeadStatus(response.data.lead_data.status);
            setLoanType(response.data.lead_data.loan_type);
            setSource(response.data.lead_data.source);
            setPancardNo(response.data.eligibility_data.pan_no);
            setTotalWorkExp(response.data.eligibility_data.total_work_exp);
            setCurrentWorkExp(response.data.eligibility_data.current_work_exp);
            setEmail(response.data.eligibility_data.email_id);
            setDesignation(response.data.eligibility_data.designation);
            setCurrentEMI(response.data.eligibility_data.current_emi);
            setCreditCardOutstanding(response.data.eligibility_data.credit_card_outstanding);
            setSalaryCreditMode(response.data.eligibility_data.salary_mode);
            setSalaryBankAcc(response.data.eligibility_data.salary_bank);
            setCurrentResidentType(response.data.eligibility_data.residence_type);
            setYearsInCurrentCity(response.data.eligibility_data.no_of_years_current_city);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeadDetaile(props.leadId);
  }, []);
  const editControlHandler = ()=>{
    setIsEditable(true);
  }
  const updateLeadDetails = async (id)=>{
    let data = {dob:date,monthly_income:monthlyIncome,current_company_name:companyName,
      residential_pincode:pincode,current_company:currentCompany};
    let lead_data = {lead_crm_id:leadId,loan_amount:loanAmount,
      phone_no:mobileNo,name:name,data,status:leadStatus,loan_type:loanType,source:source,};
    let eligibility_data = {pan_no:pancardNo,total_work_exp:JSON.parse(totalWorkExp),current_work_exp:JSON.parse(currentWorkExp),email_id:email,
      designation:designation,current_emi:JSON.parse(currentEMI),credit_card_outstanding:JSON.parse(creditCardOutstanding),
      salary_mode:JSON.parse(salaryCreditMode),salary_bank:JSON.parse(salaryBankAcc),residence_type:JSON.parse(currentResidentType),
      no_of_years_current_city:JSON.parse(yearsInCurrentCity)} 
     let items = {lead_data,eligibility_data };
     console.log(items);
     let headers = {'Authorization':'Token e9f8746ae94a00aa6526122f2db67e081ca10f54'}
     await axios.put(`${baseUrl}/leads/lead_detail/${id}`,items,{headers})
     .then((response)=>{
       console.log(response);
       setAlertMessage({leadDetails:'Lead Data Successfully Updated'})
       setIsLeadDetails(true);
     }).catch((error)=>{
       console.log(error);
       setAlertMessage({error:'Something Wrong'})
       setIsLeadDetails(true);
     })
  }
  const subStatusHandler = ()=>{
    let subStatusoptions = [];
    statusData.forEach((item,index)=>{
      if(item.status === status){
        subStatusoptions.push(item.sub_status);
      }
    })
    return subStatusoptions;
  }
const options = subStatusHandler();
const statusUpdateHandler = async (id)=>{
  let items = {status:status,sub_status:subStatus}
  console.log("uuu:"+items)
  let headers = {'Authorization':'Token e9f8746ae94a00aa6526122f2db67e081ca10f54'}
  if(status!== '' && subStatus.length>0){
    await axios.put(`${baseUrl}/leads/lead_status/${id}`,items,{headers})
  .then((response)=>{
    console.log(response)
    setAlertMessage({status:response.data['data']})
    setIsStatus(true);
  }).catch((error)=>{
    setAlertMessage({error:'Something Wrong'});
    setIsStatus(true);
  })
  }
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
     console.log(response.data);
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
      <div className={style.LeadDetails}>
        <div>
          <Form>
            <Card className={style.Card}>
            {isStatus ? <Alert variant="primary">{alertMessage.status}</Alert> : null}
            {isLeadDetails? <Alert variant="primary">{alertMessage.leadDetails}</Alert> : null}
              <Form.Row>
                <Col lg={5}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}>
                      <option value="">Select One</option>
                      {statusData.map((item,index)=>(
                        <option key={index} value={item.status}>{item.status}</option>
                      ))}
                       </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={5}>
                  <Form.Group>
                    <Form.Label>Sub Status</Form.Label>
                    <Form.Control as="select"
                    value={subStatus}
                    onChange={(e)=>{setSubStatus(e.target.value)}}>
                    <option value="">Select One</option>
                      {options.map((item,index)=>(
                        <option key={index} value={item}>{item}</option>
                      ))}
                       </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Button className={style.StatusSubmit}
                  onClick={()=>statusUpdateHandler(props.leadId)} >Submit</Button>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Lead View</Form.Label>
                  <Form.Group>
                    <Form.Label>Lead Id</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                    type="text"
                    value={leadId}
                    onChange={(e)=>setLeadId(e.target.value)}
                    /> : <Form.Control
                    disabled={true}
                    type="text"
                    value={leadId}/>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="text"
                      value={name}
                     onChange={(e) => setname(e.target.value)}
                    /> : <Form.Control
                    disabled={true}
                      type="text"
                      value={name}
                    />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone No</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="number"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                    /> : <Form.Control
                    disabled={true}
                      type="number"
                      value={mobileNo}
                    />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Loan Amount</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    /> : <Form.Control
                    disabled={true}
                    type="number"
                    value={loanAmount}
                    
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    /> : <Form.Control
                    type="date"
                    value={date}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Monthly Income</Form.Label>
                   {isEditable ?  <Form.Control
                     disabled={false}
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                    /> :  <Form.Control
                    type="number"
                    value={monthlyIncome}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Current Company</Form.Label>
                    {isEditable ? <Form.Control 
                    disabled={false}
                    type="number"
                    value={currentCompany}
                    onChange={(e)=>setCurrentCompany(e.target.value)}/> : <Form.Control 
                    type="number"
                    value={currentCompany}
                    disabled={true}/>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Pin Code</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="number"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    /> : <Form.Control
                    type="number"
                    value={pincode}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Company Name</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="text"
                      value={companyName}
                      onChange={(e)=>searchCompanyHandler(e)}
                    /> 
                    : <Form.Control
                    type="text"
                    value={companyName}
                    disabled={true}
                  />}
                  <ListGroup>
                    {showCompany ? searchCompany.map((company)=>(
                      <ListGroup.Item key={company.id}
                      onClick={()=>selectCompany(company.name)}
                      >{company.name}</ListGroup.Item>
                    )) : null}
                  </ListGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    {isEditable ? <Form.Control as="select"
                    disabled={false}
                    value={leadStatus}
                    onChange={(e)=>setLeadStatus(e.target.value)}>
                      <option value="">select One</option>
                      <option value="open">Open</option>
                    </Form.Control> : <Form.Control as="select"
                    value={leadStatus}
                    disabled={true}/>
                      }
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Loan Type</Form.Label>
                    {isEditable ? <Form.Control as="select"
                    disabled={false}
                    value={loanType}
                    onChange={(e)=>setLoanType(e.target.value)}>
                      <option value="">select One</option>
                      <option value="PL">Personal Loan </option>
                      <option value="BL">Business Loan </option>
                    </Form.Control> : <Form.Control as="select"
                    value={loanType}
                    disabled={true}/>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Source</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                    type="number"
                    value={source}
                    onChange={(e)=>setSource(e.target.value)}/> :<Form.Control
                    type="number"
                    value={source}
                    disabled={true}
                    />}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Eligibility Data</Form.Label>
                  <Form.Group>
                    <Form.Label>Pan Card No</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="text"
                      value={pancardNo}
                      onChange={(e) => setPancardNo(e.target.value.toUpperCase())}
                    /> : <Form.Control
                    type="test"
                    value={pancardNo}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Work Experience</Form.Label>
                   {isEditable ?  <Form.Control
                   disabled={false}
                      type="number"
                      value={totalWorkExp}
                      onChange={(e) => setTotalWorkExp(e.target.value)}
                    /> :  <Form.Control
                    type="number"
                    value={totalWorkExp}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Current Work Experience</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="number"
                      value={currentWorkExp}
                      onChange={(e) => setCurrentWorkExp(e.target.value)}
                    /> : <Form.Control
                    type="number"
                    value={currentWorkExp}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email ID</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    /> : <Form.Control
                    type="email"
                    value={email}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Designation</Form.Label>
                   {isEditable ?  <Form.Control
                   disabled={false}
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    /> :  <Form.Control
                    type="text"
                    value={designation}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Current / Active EMI</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="number"
                      value={currentEMI}
                      onChange={(e) => setCurrentEMI(e.target.value)}
                    />: <Form.Control
                    type="number"
                    value={currentEMI}
                    disabled={true}
                    />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Credit Card Outstanding</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="number"
                      value={creditCardOutstanding}
                      onChange={(e) => setCreditCardOutstanding(e.target.value)}
                    /> : <Form.Control
                    type="number"
                    value={creditCardOutstanding}
                    disabled={true}
                  />}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Mode Of Salary Credit</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      as="select"
                      value={salaryCreditMode}
                      onChange={(e) => setSalaryCreditMode(e.target.value)}
                    >
                      <option value="">Select One</option>
                      {salaryMode.map((mode, index) => (
                        <option value={index+1}>{mode}</option>
                      ))}
                    </Form.Control> : <Form.Control
                      as="select"
                      value={salaryCreditMode}
                      disabled={true}
                    >
                    </Form.Control>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Salary Account Bank</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      as="select"
                      value={salaryBankAcc}
                      onChange={(e) => setSalaryBankAcc(e.target.value)}
                    >
                      <option value="">Select One</option>
                      {banks.map((bank, index) => (
                        <option value={1}>{bank}</option>
                      ))}
                    </Form.Control> : <Form.Control
                      as="select"
                      value={salaryBankAcc}
                      disabled={true}
                    >
                      </Form.Control>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Current Resident Type</Form.Label>
                   {isEditable ?  <Form.Control
                   disabled={false}
                      as="select"
                      value={currentResidentType}
                      onChange={(e) => setCurrentResidentType(e.target.value)}
                    >
                      <option value="">Select One</option>
                      {residentType.map((resident, index) => (
                        <option value={1}>{resident}</option>
                      ))}
                    </Form.Control> :  <Form.Control
                      as="select"
                      value={currentResidentType}
                      disabled={true}
                    >
                    </Form.Control>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>No Of years in current City</Form.Label>
                    {isEditable ? <Form.Control
                    disabled={false}
                      type="number"
                      value={yearsInCurrentCity}
                      onChange={(e) => setYearsInCurrentCity(e.target.value)}
                    /> : <Form.Control
                    type="number"
                    value={yearsInCurrentCity}
                    disabled={true}
                  />}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
              <Col>
                  <Button disabled={isEditable} onClick={editControlHandler}>Edit</Button>
                </Col>
                <Col>
                <Button disabled={!isEditable} onClick={()=>updateLeadDetails(props.leadId)} >Submit</Button>
                </Col>
              </Form.Row>
            </Card>
          </Form>
        </div>
        <div>
          <RemarkForm 
          leadId={props.leadId}/>
        </div>
      </div>
  );
}

export default LeadDetails;
