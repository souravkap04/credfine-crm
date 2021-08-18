import React, { useState } from "react";
import axios from 'axios';
import style from './PlForm.module.css';
import { Form, Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import baseUrl from "../../global/api";
import { getProfileData } from '../../global/leadsGlobalData'
import { RemoveFromQueue } from "@material-ui/icons";
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function PlForm() {
  const profileData = getProfileData();
  const [loanAmount, setLoanAmount] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [date, setDate] = useState(new Date());
  const [mobileNo, setMobileNo] = useState('');
  const [pincode, setPincode] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [campaign, setCampaign] = useState("");
  const [searchCompany, setSearchCompany] = useState([]);
  const [showCompany, setShowCompany] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);
  const [isError, setIsError] = useState(false);
  let history = useHistory();
  const personalLoanSubmitHandler = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      let item = {
        loan_amount: loanAmount, monthly_income: monthlyIncome, dob: date, phone_no: mobileNo,
        residential_pincode: pincode, current_company_name: companyName, name: fullName, loan_type: "PL",
        current_company: currentCompany, employment_type: employmentType, campaign_category: campaign
      };
      let headers = {
        'Authorization': `Token ${profileData.token}`,
        'Content-Type': 'application/json'
      }
      await axios.post(`${baseUrl}/leads/lead_create/`, item, { headers })
        .then((response) => {
          if (response.status === 201) {
            setAlertMessage(response.data.message)
            setIsDisplay(true);
          }
          setTimeout(() => {
            history.push('/dashboards/leads')
          }, 1500)
        }).catch((error) => {
          if (error.response.status === 400) {
            setAlertMessage("Mobile Number Already Exist")
            setIsError(true);
          } else {
            setAlertMessage("Something wrong")
            setIsError(true);
          }
        })
    } else {
      setValidated(true);
      event.preventDefault();
    }
  }
  const searchCompanyHandler = async (e) => {
    setCompanyName((e.target.value).trim());
    setShowCompany(true);
    const searchCompanyUrl = "https://backend.credfine.com/common/search_company";
    let item = { company: companyName };
    const header = { 'Content-Type': 'application/json' }
    if (companyName.length >= 2) {
      await axios.post(`${searchCompanyUrl}`, item, { header })
        .then((response) => {
          setSearchCompany(response.data);
        }).catch((error) => {
          console.log(error)
        })

    }
  }
  const selectCompany = (company) => {
    setCompanyName(company);
    setShowCompany(false);
  }
  const closeSnankBar = () => {
    setIsDisplay(false);
    setIsError(false);
  }
  return (
    <PageLayerSection>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isDisplay} autoHideDuration={1500} onClose={closeSnankBar}>
        <Alert onClose={closeSnankBar} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isError} autoHideDuration={1500} onClose={closeSnankBar}>
        <Alert onClose={closeSnankBar} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Form noValidate validated={validated} onSubmit={personalLoanSubmitHandler}>
        <Card className={style.Card}>
          {/* {isDisplay ? <Alert className={style.alertBox}>{alertMessage}</Alert> : null} */}
          <Form.Label className={style.Heading}>Personal Loan</Form.Label>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Full Name As Per Pancard<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName((e.target.value))} />
                <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Mobile Number<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)} />
                <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Net Monthly Income<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)} />
                <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dob" placeholder="Date of Birth"
                  value={date}
                  onChange={(e) => setDate(e.target.value)} />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Employment Type</Form.Label>
                <Form.Control
                  as="select"
                  value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
                  <option value='Salaried' >Salaried</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Current Residence Pincode</Form.Label>
                <Form.Control
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)} />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </Form.Group>

            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={companyName}
                  onChange={(e) => searchCompanyHandler(e)} />
                <ListGroup>
                  {showCompany ? searchCompany.map((company) => (
                    <ListGroup.Item style={{ cursor: 'pointer' }} key={company.id}
                      onClick={() => selectCompany(company.name)}
                    >{company.name}</ListGroup.Item>
                  )) : null}
                </ListGroup>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="campaign">
                <Form.Label className={style.Input_lable}>Campaign</Form.Label>
                <Form.Control
                  as="select"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                >
                  <option value=''>Select One</option>
                  <option value='FRESH_PL_OD'>FRESH_PL_OD</option>
                  <option value='BT_PL_OD'>BT_PL_OD</option>
                  <option value='PL_OD_TOP_UP'>PL_OD_TOP_UP</option>
                  <option value='PRE_APPROVED'>PRE_APPROVED</option>
                  <option value='HOT_LEAD'>HOT_LEAD</option>
                  <option value='WEBSITE_LEAD'>WEBSITE_LEAD</option>
                  <option value='OTHER'>OTHER</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Current Work Experience</Form.Label>
                <Form.Control
                  type="number"
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Button className={style.Button}
            variant="success" type="submit">CONTINUE</Button>

        </Card>
      </Form>
    </PageLayerSection>
  );
}
