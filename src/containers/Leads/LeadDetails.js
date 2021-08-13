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
  getProfileData,
  getStatusData
} from "../../global/leadsGlobalData";
import style from "./LeadDetails.module.css";
import baseUrl from "../../global/api";
import RemarkForm from "./Remarks/RemarkForm";
import { useParams, useHistory } from 'react-router-dom';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import { vertageDialerApi } from "../../global/callApi";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './leadDetailsAdjust.css';
function LeadDetails(props) {
  const profileData = getProfileData();
  const banks = getBank();
  const residentType = getResidentType();
  const salaryMode = getSalaryModeType();
  const [loanAmount, setLoanAmount] = useState("");
  const [leadId, setLeadId] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
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
  const [isEditable, setIsEditable] = useState(false);
  const [status, setStatus] = useState('');
  const [subStatus, setSubStatus] = useState([]);
  const [loanType, setLoanType] = useState("");
  const [source, setSource] = useState("");
  const [alertMessage, setAlertMessage] = useState('');
  const [isStatus, setIsStatus] = useState(false);
  const [isLeadDetails, setIsLeadDetails] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [disableDisposeBtn, setDisableDisposeBtn] = useState(true);
  const [callHangUpState, setCallHangUpState] = useState(true);
  let statusData = getStatusData();
  let { leadid } = useParams();
  let history = useHistory();
  const maskPhoneNo = (phoneNo) => {
    let data = phoneNo;
    let unMaskdata = data.slice(-4);
    let maskData = '';
    for (let i = (data.length) - 4; i > 0; i--) {
      maskData += 'x';
    }
    let leadPhoneNo = maskData + unMaskdata;
    if (profileData.user_roles[0].user_type === 3) {
      return leadPhoneNo;
    } else {
      return data;
    }
  }
  useEffect(() => {
    const fetchLeadDetaile = async (leadId) => {
      let headers = { 'Authorization': `Token ${profileData.token}` }
      try {
        await axios
          .get(`${baseUrl}/leads/lead_detail/${leadId}`, { headers })
          .then((response) => {
            setMobileNo(response.data.lead_data.phone_no);
            setStatus(response.data.lead_data.status);
            setSubStatus(response.data.lead_data.sub_status);
            setLeadId(response.data.lead_data.lead_crm_id);
            setLoanAmount(response.data.lead_data.loan_amount);
            setMonthlyIncome(response.data.lead_data["data"].monthly_income);
            setCurrentCompany(response.data.lead_data['data'].current_company);
            setDate(response.data.lead_data["data"].dob);
            setPincode(response.data.lead_data["data"].residential_pincode);
            setname(response.data.lead_data.name);
            setCompanyName(response.data.lead_data["data"].current_company_name);
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
    fetchLeadDetaile(leadid);
  }, []);
  const editControlHandler = () => {
    setIsEditable(true);
  }
  const updateLeadDetails = async (id) => {
    let data = {
      dob: date, monthly_income: monthlyIncome, current_company_name: companyName,
      residential_pincode: pincode, current_company: currentCompany
    };
    let lead_data = {
      lead_crm_id: leadId, loan_amount: loanAmount,
      phone_no: mobileNo, name: name, data,
      status: status,
      loan_type: loanType, source: source,
    };
    let eligibility_data = {
      pan_no: pancardNo, total_work_exp: totalWorkExp, current_work_exp: currentWorkExp, email_id: email,
      designation: designation, current_emi: currentEMI, credit_card_outstanding: creditCardOutstanding,
      salary_mode: salaryCreditMode, salary_bank: salaryBankAcc, residence_type: currentResidentType,
      no_of_years_current_city: yearsInCurrentCity
    }
    let items = { lead_data, eligibility_data };
    let headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.put(`${baseUrl}/leads/lead_detail/${id}`, items, { headers })
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          toast("Lead Data Successfully Updated", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined
          });
        }
        // setAlertMessage('Lead Data Successfully Updated')
        // setIsLeadDetails(true);
        setIsEditable(false);
      }).catch((error) => {
        toast.error("Something Wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          transition: Slide,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined
        });
        // setAlertMessage('Something Wrong')
        // setIsLeadDetails(true);
      })
    // setTimeout(() => {
    //   setIsLeadDetails(false)
    // }, 2000)
  }
  const removeDuplicateStatus = (data) => {
    let unique = [];
    data.forEach((element) => {
      if (!unique.includes(element.status)) {
        unique.push(element.status)
      }
    })
    return unique;
  }
  const uniqueStatus = removeDuplicateStatus(statusData);
  const subStatusHandler = () => {
    let subStatusoptions = [];
    statusData.forEach((item, index) => {
      if (item.status === status) {
        subStatusoptions.push(item.sub_status);
      }
    })
    return subStatusoptions;
  }
  const options = subStatusHandler();

  const statusUpdateHandler = async (id) => {
    let items = { status: status, sub_status: subStatus }
    let headers = { 'Authorization': `Token ${profileData.token}` }
    if (status !== '' && subStatus.length > 0) {
      await axios.put(`${baseUrl}/leads/lead_status/${id}`, items, { headers })
        .then((response) => {
          // setAlertMessage(response.data['data'])
          // setIsStatus(true);
          if (response.status === 200) {
            toast("Status Successfully Updated", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
              transition: Slide,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined
            });
          }
          setTimeout(() => {
            history.push('/dashboards/leads')
          }, 1500)
          // props.mainMenuCallBack(false);
          // localStorage.removeItem('lead_allocate');
          // props.setIsFreshLead(false);
        }).catch((error) => {
          console.log(error.response.data.error)
          toast.error(error.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined
          });
          // setAlertMessage(error.response.data.error);
          // setIsStatus(true);
        })
    }
    // setTimeout(() => {
    //   setIsStatus(false)
    // }, 2000)
  }

  const searchCompanyHandler = async (e) => {
    setCompanyName(e.target.value);
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

  const hangupCallHandler = async () => {
    await axios.post(`${vertageDialerApi}&user=${profileData.vertage_id}&pass=${profileData.vertage_pass}&agent_user=${profileData.vertage_id}&function=external_hangup&value=1`)
      .then((response) => {
        // setDisableDisposeBtn(false);
        setCallHangUpState(false);
        if (response.status === 200) {
          localStorage.removeItem('callHangUp')
          return disposeCallHandler()
        }
        // setCallHangUpState(true);
      }).catch((error) => {
        console.log(error);
      })
  }
  const disposeCallHandler = async () => {
    await axios.post(`${vertageDialerApi}&user=${profileData.vertage_id}&pass=${profileData.vertage_pass}&agent_user=${profileData.vertage_id}&function=external_status&value=A`)
      .then((response) => {
        // setDisableDisposeBtn(true);
        setCallHangUpState(true);
      }).catch((error) => {
        console.log(error);
      })
  }
  return (
    <PageLayerSection>
      <ToastContainer />
      <div className={style.LeadDetails}>
        <div>
          <Form>
            <Card className={style.Card}>
              {/* {isStatus ? <Alert variant="primary">{alertMessage}</Alert> : null}
              {isLeadDetails ? <Alert variant="primary">{alertMessage}</Alert> : null} */}
              <Form.Row>
                {profileData.dialer === 'TATA' ? null : <Col lg={3}>
                  <Button className={style.StatusSubmit} disabled={localStorage.getItem("callHangUp") && localStorage.getItem("callHangUp") !== null ? false : callHangUpState}
                    onClick={hangupCallHandler}>Hang Up</Button>
                </Col>}
                <Col lg={profileData.dialer === 'TATA' ? 5 : 3}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Select One</option>
                      {uniqueStatus.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={profileData.dialer === 'TATA' ? 5 : 3}>
                  <Form.Group>
                    <Form.Label>Sub Status</Form.Label>
                    <Form.Control as="select"
                      value={subStatus}
                      onChange={(e) => { setSubStatus(e.target.value) }}>
                      <option value="">Select One</option>
                      {options.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col lg={2}>
                  <Button className={style.StatusSubmit}
                    onClick={() => statusUpdateHandler(leadid)} >Submit</Button>
                </Col>

                {/* <Col lg={2}>
                    <Button className={style.StatusSubmit} disabled={disableDisposeBtn}
                      onClick={disposeCallHandler} >Dispose</Button>
                  </Col> */}

              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Lead View</Form.Label>
                  <Form.Group>
                    <Form.Label>Lead Id</Form.Label>
                    <Form.Control
                      disabled={true}
                      type="text"
                      value={leadId}
                    />
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
                    <Form.Control
                      disabled={true}
                      type="text"
                      value={maskPhoneNo(mobileNo)}
                    />
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
                    {isEditable ? <Form.Control
                      disabled={false}
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                    /> : <Form.Control
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
                      onChange={(e) => setCurrentCompany(e.target.value)} /> : <Form.Control
                      type="number"
                      value={currentCompany}
                      disabled={true} />}
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
                      onChange={(e) => searchCompanyHandler(e)}
                    />
                      : <Form.Control
                        type="text"
                        value={companyName}
                        disabled={true}
                      />}
                    <ListGroup>
                      {showCompany ? searchCompany.map((company) => (
                        <ListGroup.Item key={company.id}
                          onClick={() => selectCompany(company.name)}
                        >{company.name}</ListGroup.Item>
                      )) : null}
                    </ListGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Loan Type</Form.Label>
                    {isEditable ? <Form.Control as="select"
                      disabled={false}
                      value={loanType}
                      onChange={(e) => setLoanType(e.target.value)}>
                      <option value="">select One</option>
                      <option value="PL">Personal Loan </option>
                      <option value="BL">Business Loan </option>
                    </Form.Control> : <Form.Control as="select"
                      value={loanType}
                      disabled={true}>
                      <option value="">select One</option>
                      <option value="PL">Personal Loan </option>
                      <option value="BL">Business Loan </option>
                    </Form.Control>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Source</Form.Label>
                    <Form.Control
                      disabled={true}
                      type="number"
                      value={source}
                    />
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
                    {isEditable ? <Form.Control
                      disabled={false}
                      type="number"
                      value={totalWorkExp}
                      onChange={(e) => setTotalWorkExp(e.target.value)}
                    /> : <Form.Control
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
                    {isEditable ? <Form.Control
                      disabled={false}
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    /> : <Form.Control
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
                    /> : <Form.Control
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
                      {salaryMode.map((mode) => (
                        <option value={mode}>{mode}</option>
                      ))}
                    </Form.Control> : <Form.Control
                      as="select"
                      value={salaryCreditMode}
                      disabled={true}
                    >
                      <option value="">Select One</option>
                      {salaryMode.map((mode) => (
                        <option value={mode}>{mode}</option>
                      ))}
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
                      {banks.map((bank) => (
                        <option value={bank}>{bank}</option>
                      ))}
                    </Form.Control> : <Form.Control
                      as="select"
                      value={salaryBankAcc}
                      disabled={true}
                    >
                      <option value="">Select One</option>
                      {banks.map((bank) => (
                        <option value={bank}>{bank}</option>
                      ))}
                    </Form.Control>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Current Resident Type</Form.Label>
                    {isEditable ? <Form.Control
                      disabled={false}
                      as="select"
                      value={currentResidentType}
                      onChange={(e) => setCurrentResidentType(e.target.value)}
                    >
                      <option value="">Select One</option>
                      {residentType.map((resident) => (
                        <option value={resident}>{resident}</option>
                      ))}
                    </Form.Control> : <Form.Control
                      as="select"
                      value={currentResidentType}
                      disabled={true}
                    >
                      <option value="">Select One</option>
                      {residentType.map((resident) => (
                        <option value={resident}>{resident}</option>
                      ))}
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
                  <Button disabled={!isEditable} onClick={() => updateLeadDetails(leadid)} >Submit</Button>
                </Col>
              </Form.Row>
            </Card>
          </Form>
        </div>
        <div>
          <RemarkForm
            leadId={leadid} />
        </div>
      </div>
    </PageLayerSection>
  );
}
export default LeadDetails;
