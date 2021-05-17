import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import {
  getBank,
  getResidentType,
  getSalaryModeType,
} from "../../global/leadsGlobalData";
import style from "./LeadDetails.module.css";
import baseUrl from "../../global/api";
function LeadDetails() {
  const banks = getBank();
  const residentType = getResidentType();
  const salaryMode = getSalaryModeType();
  const [loanAmount, setLoanAmount] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [date, setDate] = useState(new Date());
  const [mobileNo, setMobileNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [name, setname] = useState("");
  const [companyName, setCompanyName] = useState("");
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
  useEffect(() => {
    const fetchLeadDetaile = async () => {
      try {
        await axios
          .get(`${baseUrl}/leads/lead_detail/LD00000001`)
          .then((response) => {
            console.log(response.data.eligibility_data);
            setLoanAmount(response.data.lead_data.loan_amount);
            setMonthlyIncome(response.data.lead_data["data"].monthly_income);
            setDate(response.data.lead_data["data"].dob);
            setMobileNo(response.data.lead_data.phone_no);
            setPincode(response.data.lead_data["data"].residential_pincode);
            setname(response.data.lead_data.name);
            setCompanyName(response.data.lead_data["data"].current_company_name);
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
    fetchLeadDetaile();
  }, []);
  const editControlHandler = ()=>{
    setIsEditable(true);
  }
  const updateLeadDetails = ()=>{
     const item = {loanAmount,monthlyIncome,date,mobileNo,pincode,name,companyName,pancardNo,totalWorkExp,
    currentWorkExp,email,designation,currentEMI,creditCardOutstanding,salaryCreditMode,salaryBankAcc,
  setCurrentResidentType,yearsInCurrentCity};
     console.log(item);
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Row>
          <Col md={8}>
            <Navbar.Brand>Lead Details</Navbar.Brand>
          </Col>
          <Col md={4}>
            <Form>
              <FormControl type="text" placeholder="Search" />
            </Form>
          </Col>
        </Row>
      </Navbar>
      <div className={style.LeadDetails}>
        <div>
          <Form>
            <Card className={style.Card}>
              <Form.Row>
                <Col>
                  <Button disabled={isEditable} onClick={editControlHandler}>Edit</Button>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select">
                      <option value="">Select One</option>
                      <option>Open</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Button disabled={!isEditable} onClick={updateLeadDetails} >Submit</Button>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Lead View</Form.Label>
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
                    <Form.Control />
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
                      onChange={(e) => setCompanyName(e.target.value)}
                    /> : <Form.Control
                    type="text"
                    value={companyName}
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
                      onChange={(e) => setPancardNo(e.target.value)}
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
                        <option value={index}>{mode}</option>
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
                        <option value={index}>{bank}</option>
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
                        <option value={index}>{resident}</option>
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
            </Card>
          </Form>
        </div>
        <div>
          <Row>
            <Col md={11}>
              <InputGroup className={style.Remarks}>
                <InputGroup.Prepend>
                  <InputGroup.Text>Add Remarks</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Col>
            <Col md={1}>
            <Button>Submit</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
