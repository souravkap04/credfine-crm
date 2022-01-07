import React, { useState, useEffect } from 'react';
import './personalform.css';
import logo from '../../images/forms/logo.svg';
import back from '../../images/forms/back.svg';
import TextField from '@material-ui/core/TextField';
import Slider from "@mui/material/Slider";
import FormContainer from '../FormContainer/FormContainer';
import { NavLink } from 'react-router-dom';
import phoneCall from '../../images/forms/phoneCall.svg';
import list from '../../images/forms/list.svg';
import grid from '../../images/forms/grid.svg';
import HDFC from '../../images/forms/HDFCAgain.svg';
import ICICI from '../../images/forms/ICICI.svg';
import SC from '../../images/forms/SC.svg';
import IDFC from '../../images/forms/IDFC.svg';
import kotak from '../../images/forms/kotak.svg';
import ABC from '../../images/forms/ABC.svg';
import PL from '../../images/newIcons/PL.svg';
import { useParams, useHistory } from 'react-router-dom';
import {
    getBank,
    getResidentType,
    getSalaryModeType,
    getProfileData
} from "../../global/leadsGlobalData";
import {hdfcBankApi} from "../../global/bankingApis";
import { ListGroup } from 'react-bootstrap';
import axios from "axios";
import baseUrl from "../../global/api";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function PersonalLoanForm() {
    const [isPersonalDetail, setisPersonalDetail] = useState(true);
    const [isPersonalProgress, setisPersonalProgress] = useState(false);
    const [isCurrentResidentialDetail, setisCurrentResidentialDetail] = useState(false);
    const [isCurrentProgress, setisCurrentProgress] = useState(false);
    const [isEmploymentIncomeDetail, setisEmploymentIncomeDetail] = useState(false);
    const [isEmployementProgress, setisEmployementProgress] = useState(false);
    const [isObligation, setisObligation] = useState(false);
    const [isObligationProgress, setisObligationProgress] = useState(false);
    const [isExclusiveOffers, setisExclusiveOffers] = useState(false);
    const [isExclusiveOffersProgress, setisExclusiveOffersProgress] = useState(false);
    const [isEApproval, setisEApproval] = useState(false);
    const [isEApprovalProgress, setisEApprovalProgress] = useState(false);
    const [loanCard, setloanCard] = useState(10.35);
    const [loanMonth, setloanMonth] = useState(12);
    const [isList, setisList] = useState(true);
    const [isGrid, setisGrid] = useState(false);
    const [Offers] = useState([
        {
            img: HDFC,
            interest: '10.25%',
            PFee: '1999',
            MaxTenure: '72',
            PartPayment: '12',
            Forclosure: '18',
            url: '/dashboards/HDFCForm'
        },
        // {
        //     img: ICICI,
        //     interest: '10.25%',
        //     PFee: '2999',
        //     MaxTenure: '72',
        //     PartPayment: '12',
        //     Forclosure: '18',
        //     url: '/'
        // },
        // {
        //     img: SC,
        //     interest: '10.25%',
        //     PFee: '2999',
        //     MaxTenure: '72',
        //     PartPayment: '12',
        //     Forclosure: '18',
        //     url: '/'
        // },
        // {
        //     img: IDFC,
        //     interest: '10.25%',
        //     PFee: '10000',
        //     MaxTenure: '72',
        //     PartPayment: '12',
        //     Forclosure: '18',
        //     url: '/'
        // },
        // {
        //     img: kotak,
        //     interest: '10.25%',
        //     PFee: '10000',
        //     MaxTenure: '72',
        //     PartPayment: '12',
        //     Forclosure: '18',
        //     url: '/'
        // },
        // {
        //     img: ABC,
        //     interest: '10.25%',
        //     PFee: '10000',
        //     MaxTenure: '72',
        //     PartPayment: '12',
        //     Forclosure: '18',
        //     url: '/'
        // }
    ]);
    // Lead Fetch Details 
    const history = useHistory();
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
    const [city, setcity] = useState("");
    const [states, setstates] = useState("");
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
    const [creditCardbalanceTransfer, setcreditCardbalanceTransfer] = useState("");
    const [salaryCreditMode, setSalaryCreditMode] = useState("");
    const [salaryBankAcc, setSalaryBankAcc] = useState("");
    const [currentResidentType, setCurrentResidentType] = useState("");
    const [yearsInCurrentCity, setYearsInCurrentCity] = useState("");
    const [status, setStatus] = useState('');
    const [loanType, setLoanType] = useState("");
    const [source, setSource] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [isStatus, setIsStatus] = useState(false);
    const [isLeadDetails, setIsLeadDetails] = useState(false);
    const [isLeadError, setIsLeadError] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    const [hangUpSnacks, sethangUpSnacks] = useState(false);
    const [callHangUpState, setCallHangUpState] = useState(true);
    const [callInProgress, setcallInProgress] = useState(false);
    const [submitFalse, setsubmitFalse] = useState(true);
    const [isDisplay, setIsDisplay] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [appID, setappID] = useState('');
    const [bankNBFC, setbankNBFC] = useState('');
    const [scheme, setscheme] = useState('');
    let { leadid } = useParams();
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
            setisLoading(true)
            let headers = { 'Authorization': `Token ${profileData.token}` }
            try {
                await axios
                    .get(`${baseUrl}/leads/lead_detail/${leadId}`, { headers })
                    .then((response) => {
                        setMobileNo(response.data.lead_data.phone_no);
                        setLeadId(response.data.lead_data.lead_crm_id);
                        setLoanAmount(response.data.lead_data.loan_amount);
                        setMonthlyIncome(response.data.lead_data["data"].monthly_income);
                        setCurrentCompany(response.data.lead_data['data'].current_company);
                        setDate(response.data.lead_data["data"].dob);
                        setPincode(response.data.lead_data["data"].residential_pincode);
                        setcity(response.data.lead_data["data"].city);
                        setstates(response.data.lead_data["data"].state);
                        setname(response.data.lead_data.name);
                        setCompanyName(response.data.lead_data["data"].current_company_name);
                        setLoanType(response.data.lead_data.loan_type);
                        setSource(response.data.lead_data.source);
                        setPancardNo(response.data.eligibility_data.pan_no);
                        setEmploymentType(response.data.lead_data["data"].employment_type)
                        setTotalWorkExp(response.data.eligibility_data.total_work_exp);
                        setCurrentWorkExp(response.data.eligibility_data.current_work_exp);
                        setEmail(response.data.eligibility_data.email_id);
                        setDesignation(response.data.eligibility_data.designation);
                        setCurrentEMI(response.data.eligibility_data.current_emi);
                        setCreditCardOutstanding(response.data.eligibility_data.credit_card_outstanding);
                        setcreditCardbalanceTransfer(response.data.lead_data["data"].credi_card_balance_transfer)
                        setSalaryCreditMode(response.data.eligibility_data.salary_mode);
                        setSalaryBankAcc(response.data.eligibility_data.salary_bank);
                        setCurrentResidentType(response.data.eligibility_data.residence_type);
                        setYearsInCurrentCity(response.data.eligibility_data.no_of_years_current_city);
                        setisLoading(false)
                    });
            } catch (error) {
                console.log(error);
            }
        };
        fetchLeadDetaile(leadid);
    }, []);
    const updateLeadDetails = async (id) => {
        let data = {
            dob: date, monthly_income: monthlyIncome, current_company_name: companyName,
            residential_pincode: pincode, city: city, state: states, current_company: currentCompany, employment_type: employmentType, credi_card_balance_transfer: creditCardbalanceTransfer
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
        let lead_extra_details = {
            app_id: appID, bank: bankNBFC, scheme: scheme
        }

        let items = { lead_data, eligibility_data, lead_extra_details };
        let headers = { 'Authorization': `Token ${profileData.token}` }
        await axios.put(`${baseUrl}/leads/lead_detail/${id}`, items, { headers })
            .then((response) => {
                if (response.status === 200) {
                    setIsLeadDetails(true);
                }
            }).catch((error) => {
                setAlertMessage('Something Wrong');
                setIsLeadError(true);
            })
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
    const getPincodeHandler = async (e) => {
        setPincode(e.target.value)
        let item = { pincode: e.target.value };
        const header = { 'Content-Type': 'application/json' }
        if (e.target.value >= 6) {
            await axios.post(`${baseUrl}/common/fetchPincode/`, item, { header })
                .then((response) => {
                    if (response.data[0].pin === e.target.value) {
                        setcity(response.data[0].city_name)
                        setstates(response.data[0].state_name)
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const selectCompany = (company) => {
        setCompanyName(company);
        setShowCompany(false);
    }
    const disableHangUpSnacks = () => {
        sethangUpSnacks(false);
        setIsLeadError(false);
        setIsLeadDetails(false);
    }
    const applyNowBtnHandler = async () => {
        let item = {};
        await axios.post(`${hdfcBankApi}/${leadId}/1`, item)
            .then((response) => {
                console.log(response.data)
                if(response.data.status){
                    history.push(`/dashboards/HDFCForm/${leadid}`);
                }
            }).catch((error)=>{
                console.log(error);
            })
    }
    return (
        <div className="personalFormContainer">
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isLeadDetails} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Lead Data Successfully Updated
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isLeadError} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="error">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <div className="leftSection">
                <div className="logoContainer">
                    <div className="logoImage">
                        <NavLink to="/"><img src={logo} alt="" /></NavLink>
                    </div>
                </div>
                <div className="mobileBarsContainer">
                    <i class="fas fa-bars hambars"></i>
                    <div className="mobileTitleText">Personal Loan Application</div>
                </div>
                <div className="progressContainer">
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isPersonalProgress ? "fas fa-check-circle activeiconBar" : isPersonalDetail ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isPersonalProgress ? "bottomProgress activebottomProgress" : "bottomProgress"}></div>
                        </div>
                        <div className={isPersonalProgress ? "iconText activeiconText" : "iconText"}>Personal Details</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isCurrentProgress ? "fas fa-check-circle activeiconBar" : isCurrentResidentialDetail ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isCurrentProgress ? "bottomProgress activebottomProgress" : "bottomProgress"}></div>
                        </div>
                        <div className={isCurrentProgress ? "iconText activeiconText" : "iconText"}>Current Residential</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isEmployementProgress ? "fas fa-check-circle activeiconBar" : isEmploymentIncomeDetail ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isEmployementProgress ? "bottomProgress activebottomProgress" : "bottomProgress"}></div>
                        </div>
                        <div className={isEmployementProgress ? "iconText activeiconText" : "iconText"}>Employment &amp; Income</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isObligationProgress ? "fas fa-check-circle activeiconBar" : isObligation ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isObligationProgress ? "bottomProgress activebottomProgress" : "bottomProgress"}></div>
                        </div>
                        <div className={isObligationProgress ? "iconText activeiconText" : "iconText"}>Obligation</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isExclusiveOffersProgress ? "fas fa-check-circle activeiconBar" : isExclusiveOffers ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                        </div>
                        <div className={isExclusiveOffersProgress ? "iconText activeiconText" : "iconText"}>Exclusive Offers</div>
                    </div>
                </div>
                <div className="mobileProgressContainer">
                    <div className="mobileProgressBox">
                        <div className="mobileProgressIconBox">
                            <i class="fas fa-check-circle activeiconBar"></i>
                            <div className="iconText activeiconText">Verified</div>
                        </div>
                        <div className="bottomProgress activebottomProgress"></div>
                    </div>
                    <div className="mobileProgressBox">
                        <div className="mobileProgressIconBox mobileProgressIconBoxAdjust">
                            <div className={isPersonalProgress ? "fas fa-check-circle activeiconBar" : isPersonalDetail ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isPersonalProgress ? "iconText activeiconText" : "iconText"}>Personal</div>
                        </div>
                        <div className={isPersonalProgress ? "bottomProgress activebottomProgress bottomProgressAdjust2" : "bottomProgress bottomProgressAdjust2"}></div>
                    </div>
                    <div className="mobileProgressBox">
                        <div className="mobileProgressIconBox mobileProgressIconBoxAdjust">
                            <div className={isCurrentProgress ? "fas fa-check-circle activeiconBar" : isCurrentResidentialDetail ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isCurrentProgress ? "iconText activeiconText" : "iconText"}>Resident</div>
                        </div>
                        <div className={isCurrentProgress ? "bottomProgress activebottomProgress bottomProgressAdjust3" : "bottomProgress bottomProgressAdjust3"}></div>
                    </div>
                    <div className="mobileProgressBox">
                        <div className="mobileProgressIconBox mobileProgressIconBoxAdjust">
                            <div className={isEmployementProgress ? "fas fa-check-circle activeiconBar" : isEmploymentIncomeDetail ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isEmployementProgress ? "iconText activeiconText" : "iconText"}>Income</div>
                        </div>
                        <div className={isEmployementProgress ? "bottomProgress activebottomProgress bottomProgressAdjust4" : "bottomProgress bottomProgressAdjust4"}></div>
                    </div>
                    <div className="mobileProgressBox">
                        <div className="mobileProgressIconBox mobileProgressIconBoxAdjust">
                            <div className={isObligationProgress ? "fas fa-check-circle activeiconBar" : isObligation ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isObligationProgress ? "iconText activeiconText" : "iconText"}>Obligation</div>
                        </div>
                        <div className={isObligationProgress ? "bottomProgress activebottomProgress bottomProgressAdjust5" : "bottomProgress bottomProgressAdjust5"}></div>
                    </div>
                    <div className="mobileProgressBox">
                        <div className="mobileProgressIconBox mobileProgressIconBoxAdjust">
                            <div className={isExclusiveOffersProgress ? "fas fa-check-circle activeiconBar" : isExclusiveOffers ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isExclusiveOffersProgress ? "iconText activeiconText" : "iconText"}>Offers</div>
                        </div>
                        <div className={isExclusiveOffersProgress ? "bottomProgress activebottomProgress bottomProgressAdjust6" : "bottomProgress bottomProgressAdjust6"}></div>
                    </div>
                    <div className="mobileProgressBox">
                        <div className="mobileProgressIconBox">
                            <div className={isEApprovalProgress ? "fas fa-check-circle activeiconBar" : isEApproval ? "fas fa-circle activeBar" : "fas fa-circle iconBar"}></div>
                            <div className={isEApprovalProgress ? "iconText activeiconText" : "iconText"}>e-Approval</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightSection">
                {isPersonalDetail ? <div className="adjustBackground">
                    <div className="headerContainer">
                        <div className="backButton" onClick={() => history.goBack()}>
                            <img src={back} alt="" />
                        </div>
                        <div className="needHelpContainer">
                            <div className="needHelpText">Need Help?</div>
                            <div className="rightPart">
                                <div className="phoneCall">
                                    <img src={phoneCall} alt="" />
                                </div>
                                <div className="numberText">7045330702</div>
                            </div>
                        </div>
                    </div>
                    <FormContainer isSaveNextButton={true} TitleText="Personal Loan Application" Name="Loan Amt &amp; Personal Details" iconImage={PL} onClick={() => {
                        let regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pancardNo);
                        if (pancardNo !== '' && !regex) {
                            setAlertMessage('Inavlid PAN Number')
                            setIsLeadError(true);
                            return;
                        }
                        updateLeadDetails(leadid)
                        setisPersonalDetail(false)
                        setisCurrentResidentialDetail(true)
                        setisPersonalProgress(true)
                    }}>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Loan Amount"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={loanAmount}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setLoanAmount(e.target.value)
                                }
                            }}
                        />
                        <TextField
                            className="textField fullName"
                            id="outlined-full-width"
                            label="First Name"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <TextField
                            className="textField fullName"
                            id="outlined-full-width"
                            label="Last Name"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={name}
                        // onChange={(e) => setname(e.target.value)}
                        />
                        <TextField
                            type="date"
                            className="textField"
                            placeholder="DD / MM / YYYY"
                            id="outlined-full-width"
                            label="Date of Birth"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <TextField
                            // error
                            className="textField"
                            id="outlined-full-width"
                            label="Personal PAN Number"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            // helperText="Invalid PAN"
                            variant="outlined"
                            size="small"
                            maxLength="10"
                            value={pancardNo}
                            onChange={(e) => setPancardNo(e.target.value.toUpperCase())}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Email ID"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Mobile Number"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={maskPhoneNo(mobileNo)}
                            disabled
                        />
                    </FormContainer>
                </div> : ''}
                {isCurrentResidentialDetail ? <div className="adjustBackground">
                    <div className="headerContainer">
                        <div className="backButton" onClick={() => {
                            setisPersonalDetail(true)
                            setisCurrentResidentialDetail(false)
                            setisPersonalProgress(false)
                        }}>
                            <img src={back} alt="" />
                        </div>
                        <div className="needHelpContainer">
                            <div className="needHelpText">Need Help?</div>
                            <div className="rightPart">
                                <div className="phoneCall">
                                    <img src={phoneCall} alt="" />
                                </div>
                                <div className="numberText">7045330702</div>
                            </div>
                        </div>
                    </div>
                    <FormContainer isSaveNextButton={true} TitleText="Personal Loan Application" Name="Loan Amt &amp; Personal Details" iconImage={PL} onClick={() => {
                        updateLeadDetails(leadid)
                        setisCurrentResidentialDetail(false)
                        setisEmploymentIncomeDetail(true)
                        setisCurrentProgress(true)
                    }}>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Pincode"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 6
                            }}
                            variant="outlined"
                            size="small"
                            value={pincode}
                            onChange={(e) => getPincodeHandler(e)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="City"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={city}
                            disabled
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="State"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={states}
                            disabled
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            select
                            label="Resident Type"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={currentResidentType}
                            onChange={(e) => setCurrentResidentType(e.target.value)}
                        >
                            <option key="" value="">
                                Select
                            </option>
                            {residentType.map((resident) => (
                                <option value={resident}>{resident}</option>
                            ))}
                        </TextField>
                    </FormContainer>
                </div> : ''}
                {isEmploymentIncomeDetail ? <div className="adjustBackground">
                    <div className="headerContainer">
                        <div className="backButton" onClick={() => {
                            setisCurrentResidentialDetail(true)
                            setisEmploymentIncomeDetail(false)
                            setisCurrentProgress(false)
                        }}>
                            <img src={back} alt="" />
                        </div>
                        <div className="needHelpContainer">
                            <div className="needHelpText">Need Help?</div>
                            <div className="rightPart">
                                <div className="phoneCall">
                                    <img src={phoneCall} alt="" />
                                </div>
                                <div className="numberText">7045330702</div>
                            </div>
                        </div>
                    </div>
                    <FormContainer isSaveNextButton={true} TitleText="Personal Loan Application" Name="Loan Amt &amp; Personal Details" iconImage={PL} onClick={() => {
                        updateLeadDetails(leadid)
                        setisEmploymentIncomeDetail(false)
                        setisObligation(true)
                        setisEmployementProgress(true)
                    }}>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            select
                            label="Employment Type"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                        >
                            <option key="" value="">Select</option>
                            <option value="salaried">Salaried</option>
                            <option value="self_employed">Self Employed</option>
                            <option value="self_employed_professional">Self Employed Professional</option>
                        </TextField>
                        <div>
                            <TextField
                                className="textField"
                                id="outlined-full-width"
                                label="Company Name"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                value={companyName}
                                onChange={(e) => searchCompanyHandler(e)}
                            />
                            <ListGroup className="listGroup">
                                {showCompany ? searchCompany.map((company) => (
                                    <ListGroup.Item key={company.id}
                                        onClick={() => selectCompany(company.name)}
                                    >{company.name}</ListGroup.Item>
                                )) : null}
                            </ListGroup>
                        </div>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Designation"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            select
                            label="Vintage in Current Company"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                            size="small"
                            value={currentWorkExp}
                            onChange={(e) => setCurrentWorkExp(e.target.value)}
                        >
                            <option key="" value="">Select</option>
                            <option value="0-3 months">0-3 months</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="6-12 months">6-12 months</option>
                            <option value="1-2 years">1-2 years</option>
                            <option value="2-3 years">2-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5-10 years">5-10 years</option>
                            <option value="10+ years">10+ years</option>
                        </TextField>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            select
                            label="Total Work Experience"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                            size="small"
                            value={totalWorkExp}
                            onChange={(e) => setTotalWorkExp(e.target.value)}
                        >
                            <option key="" value="">Select</option>
                            <option value="0-3 months">0-3 months</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="6-12 months">6-12 months</option>
                            <option value="1-2 years">1-2 years</option>
                            <option value="2-3 years">2-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5-10 years">5-10 years</option>
                            <option value="10+ years">10+ years</option>
                        </TextField>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Net Monthly Income"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 7
                            }}
                            variant="outlined"
                            size="small"
                            value={monthlyIncome}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setMonthlyIncome(e.target.value)
                                }
                            }}
                        />
                        <TextField
                            className="textField"
                            select
                            id="outlined-full-width"
                            label="Mode of Salary"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={salaryCreditMode}
                            onChange={(e) => setSalaryCreditMode(e.target.value)}
                        >
                            <option value="">Select</option>
                            {salaryMode.map((mode) => (
                                <option value={mode}>{mode}</option>
                            ))}
                        </TextField>
                        <TextField
                            className="textField"
                            select
                            id="outlined-full-width"
                            label="Salary Credit Bank Name"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={salaryBankAcc}
                            onChange={(e) => setSalaryBankAcc(e.target.value)}
                        >
                            <option value="">Select One</option>
                            {banks.map((bank) => (
                                <option value={bank}>{bank}</option>
                            ))}
                        </TextField>
                    </FormContainer>
                </div> : ''}
                {isObligation ? <div className="adjustBackground">
                    <div className="headerContainer">
                        <div className="backButton" onClick={() => {
                            setisEmploymentIncomeDetail(true)
                            setisObligation(false)
                            setisEmployementProgress(false)
                        }}>
                            <img src={back} alt="" />
                        </div>
                        <div className="needHelpContainer">
                            <div className="needHelpText">Need Help?</div>
                            <div className="rightPart">
                                <div className="phoneCall">
                                    <img src={phoneCall} alt="" />
                                </div>
                                <div className="numberText">7045330702</div>
                            </div>
                        </div>
                    </div>
                    <FormContainer isSaveNextButton={true} TitleText="Personal Loan Application" Name="Loan Amt &amp; Personal Details" iconImage={PL} onClick={() => {
                        updateLeadDetails(leadid)
                        setisExclusiveOffers(true)
                        setisObligationProgress(true)
                        setisExclusiveOffersProgress(true)
                        setisObligation(false)
                    }}>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Total EMI"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            inputProps={{
                                maxLength: "6"
                            }}
                            value={currentEMI}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setCurrentEMI(e.target.value)
                                }
                            }}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Credit Card Outstanding"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            inputProps={{
                                maxLength: "7"
                            }}
                            value={creditCardOutstanding}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setCreditCardOutstanding(e.target.value)
                                }
                            }}
                        />
                        <TextField
                            className="textField"
                            select
                            id="outlined-full-width"
                            label="Credit Card Balance Transfer"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true
                            }}
                            variant="outlined"
                            size="small"
                            value={creditCardbalanceTransfer}
                            onChange={(e) => setcreditCardbalanceTransfer(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </TextField>
                    </FormContainer>
                </div> : ''}
                {isExclusiveOffers ? <React.Fragment>
                    <div className="headerContainer">
                        <div className="backButton" onClick={() => {
                            setisObligation(true)
                            setisObligationProgress(false)
                            setisExclusiveOffers(false)
                            setisExclusiveOffersProgress(false)
                        }}>
                            <img src={back} alt="" />
                        </div>
                        <div className="needHelpContainer">
                            <div className="needHelpText">Need Help?</div>
                            <div className="rightPart">
                                <div className="phoneCall">
                                    <img src={phoneCall} alt="" />
                                </div>
                                <div className="numberText">7045330702</div>
                            </div>
                        </div>
                    </div>
                    <div className="calculationContainer">
                        <div className="personalLacsContainer">
                            <label>Personal Loan Amount (in Lacs)</label>
                            <div className="loanCard">
                                <div className="tagText">75L</div>
                                <Slider
                                    className="loanCardBar"
                                    max={75}
                                    step={0.1}
                                    min={1}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    value={loanCard}
                                    onChange={(e) => setloanCard(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="personalMonthContainer">
                            <label>Loan Tenure (in Months)</label>
                            <div className="loanCard">
                                <div className="tagText">84M</div>
                                <Slider
                                    className="loanCardBar"
                                    max={84}
                                    step={12}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    value={loanMonth}
                                    onChange={(e) => setloanMonth(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="indicationContainer">
                            <div className="loanLacText">{loanCard} L</div>
                            <div className="loanMonthText">{loanMonth} Months</div>
                        </div>
                    </div>
                    <div className="exclusiveHeaderContainer">
                        <h3>Exclusive Offers</h3>
                        <div className="viewContainer">
                            <div className={isList ? "listImage activeImage" : "listImage"} onClick={() => {
                                setisList(true)
                                setisGrid(false)
                            }}>
                                <img src={list} alt="" />
                            </div>
                            <div className={isGrid ? "gridImage activeImage" : "gridImage"} onClick={() => {
                                setisGrid(true)
                                setisList(false)
                            }}>
                                <img src={grid} alt="" />
                            </div>
                        </div>
                    </div>
                    {isList ? <div className="offerMainCardContainer">

                        <div className="sortingContainer">
                            <div className="icon">

                            </div>
                        </div>
                        {Offers.map(item => {
                            return <div className="offerCardContainer">
                                <div className="bankLogoImage">
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="rate">{item.interest}</div>
                                <div className="price">₹ {item.PFee}</div>
                                <div className="months">{item.MaxTenure} months</div>
                                <div className="after12">After {item.PartPayment} EMIs</div>
                                <div className="after18">After {item.Forclosure} EMIs</div>
                                    <div className="applyBtn">
                                        <div className="btnText" onClick={applyNowBtnHandler}>APPLY NOW</div>
                                    </div>
                            </div>
                        })}
                    </div> : ''}
                    {isGrid ? <div className="OfferMainGridContainer">
                        {Offers.map(item => {
                            return <div className="offerGridContainer">
                                <div className="bankLogoImage">
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="bottomAdjustContainer">
                                    <div className="rateContainer">
                                        <div className="label">Interest</div>
                                        <div className="rate">{item.interest}</div>
                                    </div>
                                    <div className="priceContainer">
                                        <div className="label">P.Fee</div>
                                        <div className="price">₹ {item.PFee}</div>
                                    </div>
                                    <div className="monthsContainer">
                                        <div className="label">Max Tenure</div>
                                        <div className="months">{item.MaxTenure} months</div>
                                    </div>
                                    <div className="after12Container">
                                        <div className="label">Part Payment</div>
                                        <div className="after12">After {item.PartPayment} EMIs</div>
                                    </div>
                                    <div className="after18Container">
                                        <div className="label">Foreclosure</div>
                                        <div className="after18">After {item.Forclosure} EMIs</div>
                                    </div>
                                </div>
                                    <div className="applyBtn">
                                        <div className="btnText" onClick={applyNowBtnHandler}>APPLY NOW</div>
                                    </div>
                            </div>
                        })}
                    </div> : ''}
                </React.Fragment> : ''}
            </div>
        </div>
    )
}
