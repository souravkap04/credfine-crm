import React, { useState, useEffect } from 'react';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import './leadDetailsNew.css';
import axios from "axios";
import baseUrl from "../../global/api";
import { haloocomNoidaDialerApi, haloocomMumbaiDialerApi } from "../../global/callApi";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import { ListGroup } from 'react-bootstrap';
import {
    getBank,
    getResidentType,
    getSalaryModeType,
    getProfileData,
    getStatusData
} from "../../global/leadsGlobalData";
import { useParams, useHistory, useLocation, NavLink } from 'react-router-dom';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import jsPDF from 'jspdf';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
    appBar: {
        position: 'relative'
    },
    circleTick: {
        opacity: '0.4'
    },
    activeColorTick: {
        color: '#14cc9e',
        opacity: '1'
    },
    activeColorTickRed: {
        color: '#eb5757',
        opacity: '1'
    },
    headerText: {
        // fontFamily: 'Lato',
        fontSize: '17px',
        fontWeight: '400',
        letterSpacing: '0.4px'
    }
});
const Accordion = withStyles({
    root: {
        boxShadow: '0 3px 4.7px 0 rgba(0, 0, 0, 0.27)',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: '#8f9bb3',
        borderBottom: '2px solid #fff',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
            backgroundColor: '#4046b2',
        },
        color: '#fff'
    },
    content: {
        justifyContent: 'space-between',
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expandIcon: {
        color: '#fff',
        '&$expanded': {
            transform: 'rotate(90deg)'
        }
    },
    expanded: {
    },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        // height: '32.45vw',
        alignItems: 'flex-start'
    },
}))(MuiAccordionDetails);
export default function LeadDetailsNew(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [openCalculate, setopenCalculate] = useState(false);
    const openCalculator = () => {
        setopenCalculate(true);
    }
    const closeCalculator = () => {
        setopenCalculate(false);
    }
    const profileData = getProfileData();
    const banks = getBank();
    const residentType = getResidentType();
    const salaryMode = getSalaryModeType();
    const [loanAmount, setLoanAmount] = useState("");
    const [leadId, setLeadId] = useState("");
    const [STBError, setSTBError] = useState([false, false, false]);
    const [employmentType, setEmploymentType] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [currentCompany, setCurrentCompany] = useState("");
    const [date, setDate] = useState("");
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
    const [noOfCreditCard, setNoOfCreditCard] = useState("");
    const [creditCardOutstanding, setCreditCardOutstanding] = useState("");
    const [creditCardbalanceTransfer, setcreditCardbalanceTransfer] = useState("");
    const [salaryCreditMode, setSalaryCreditMode] = useState("");
    const [salaryBankAcc, setSalaryBankAcc] = useState("");
    const [currentResidentType, setCurrentResidentType] = useState("");
    const [yearsInCurrentCity, setYearsInCurrentCity] = useState("");
    const [gender, setGender] = useState("");
    const [tenure, setTenure] = useState("");
    const [requiredRoi,setRequiredRoi] = useState("");
    const [Roi, setRoi] = useState('');
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [noOfDependent, setNoOfDependent] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [adhaarNo, setAdhaarNo] = useState("");
    const [addressOne, setAddressOne] = useState("");
    const [addressTwo, setAddressTwo] = useState("");
    const [addressThree, setAddressThree] = useState("");
    const [currentAddressVintage, setCurrentAddressVintage] = useState();
    const [permanentAddressOne, setPermanentAddressOne] = useState("");
    const [permanentAddressTwo, setPermanentAddressTwo] = useState("");
    const [permanentAddressThree, setPermanentAddressThree] = useState("");
    const [permanentPincode, setPermanentPincode] = useState("");
    const [permanentCity, setPermanentCity] = useState("");
    const [permanentStates, setPermanentStates] = useState("");
    const [permanentResidentType, setPermanentResidentType] = useState("");
    const [permanentAddressVintage, setPermanentAddressVintage] = useState();
    const [grossIncome, setGrossIncome] = useState("");
    const [officeAddress1,setOfficeAddress1] = useState("");
    const [officeAddress2,setOfficeAddress2] = useState("");
    const [officeAddress3,setOfficeAddress3] = useState("");
    const [officePincode, setOfficePincode] = useState("");
    const [officeCity, setOfficeCity] = useState("");
    const [officeStates, setOfficeStates] = useState("");
    const [officialMailid, setOfficialMailid] = useState("");
    const [landlineNo, setLandlineNo] = useState("");
    const [ref1FirstName, setRef1FirstName] = useState("");
    const [ref1LastName, setRef1LastName] = useState("");
    const [ref1MobileNo, setRef1MobileNo] = useState("");
    const [ref1Address1,setRef1Address1] = useState('');
    const [ref1Address2,setRef1Address2] = useState('');
    const [ref1Pincode,setRef1Pincode] = useState('');
    const [ref1City,setRef1City] = useState('');
    const [ref1States,setRef1States] = useState('');
    const [ref2FirstName, setRef2FirstName] = useState("");
    const [ref2LastName, setRef2LastName] = useState("");
    const [ref2MobileNo, setRef2MobileNo] = useState("");
    const [ref2Address1,setRef2Address1] = useState('');
    const [ref2Address2,setRef2Address2] = useState('');
    const [ref2Pincode,setRef2Pincode] = useState('');
    const [ref2City,setRef2City] = useState('');
    const [ref2States,setRef2States] = useState('');
    const [status, setStatus] = useState('');
    const [subStatus, setSubStatus] = useState([]);
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
    const [input, setInput] = useState("");
    const [loadingRemarks, setLoadingRemarks] = useState(0);
    const [remarks, setRemarks] = useState([]);
    const [isDisplay, setIsDisplay] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [isCallConnect, setIsCallConnect] = useState(false);
    const [onGoingCall, setOnGoingCall] = useState(false);
    const [isCallNotConnected, setIsCallNotConnected] = useState(false)
    const [disableHangupBtn, setDisableHangupBtn] = useState(true);
    const [dialerCall, setDialerCall] = useState(false);
    const [colorTick, setcolorTick] = useState(false);
    const [colorTick2, setcolorTick2] = useState(false);
    const [colorTick3, setcolorTick3] = useState(false);
    const [colorTick4, setcolorTick4] = useState(false);
    const [colorTick5, setcolorTick5] = useState(false);
    const [colorTick6, setcolorTick6] = useState(false);
    const [colorTick7, setcolorTick7] = useState(false);
    const [appID, setappID] = useState('');
    const [bankNBFC, setbankNBFC] = useState('');
    const [scheme, setscheme] = useState('');
    const [followUpDate, setfollowUpDate] = useState('');
    const [followUpDateError, setfollowUpDateError] = useState([false]);
    const [isLoading, setisLoading] = useState(false);
    const [isCopy, setisCopy] = useState(false);
    const [disbursedDate, setdisbursedDate] = useState(new Date());
    const [disbursedError, setdisbursedError] = useState([false, false]);
    const [colorRed, setcolorRed] = useState([false, false, false, false, false, false,false]);
    const [isAutoDialerEnd, setIsAutoDialerEnd] = useState(false);
    const [checked, setChecked] = React.useState(false);
    let statusData = getStatusData();
    let { leadid } = useParams();
    let history = useHistory();
    let location = useLocation();
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
    const notification = async () => {
        const headers = {
            'Authorization': `Token ${profileData.token}`,
        };
        await axios.get(`${baseUrl}/leads/CheckFollowupLead/`, { headers })
            .then((response) => {
                if (response.data.followup_lead_avail === true && response.data.total_followup_lead > 0) {
                    localStorage.setItem('notification', response.data.total_followup_lead);
                } else if (response.data.followup_lead_avail === false && response.data.total_followup_lead === 0) {
                    localStorage.removeItem('notification')
                }
            }).catch((error) => {

            })
    }
    useEffect(() => {
        const fetchLeadDetaile = async (leadId) => {
            setisLoading(true)
            let headers = { 'Authorization': `Token ${profileData.token}` }
                await axios
                    .get(`${baseUrl}/leads/lead_detail/${leadId}`, { headers })
                    .then((response) => {
                        let getDobfromApi = response.data.lead_data.data.dob;
                        let dateRegex = /^\d{4}-\d{2}-\d{2}$/.test(getDobfromApi);
                        if (dateRegex) {
                            setDate(response.data.lead_data.data.dob);
                        } else {
                            let changeDateFormat = moment(getDobfromApi, 'DDMMYYYY').format("YYYY-MM-DD");
                            setDate(changeDateFormat);
                        }
                        setMobileNo(response.data.lead_data.phone_no);
                        setStatus(response.data.lead_data.status);
                        setSubStatus(response.data.lead_data.sub_status);
                        setLeadId(response.data.lead_data.lead_crm_id);
                        setLoanAmount(response.data.lead_data.loan_amount);
                        setMonthlyIncome(response.data.lead_data["data"].monthly_income);
                        setCurrentCompany(response.data.lead_data['data'].current_company);
                        setPincode(response.data.lead_data["data"].residential_pincode);
                        setcity(response.data.lead_data["data"].city);
                        setstates(response.data.lead_data["data"].state);
                        setname(response.data.lead_data.name);
                        setCompanyName(response.data.lead_data["data"].current_company_name);
                        setLoanType(response.data.lead_data.loan_type);
                        setSource(response.data.lead_data.source);
                        setPancardNo(response.data.lead_data.data.pan_no);
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
                        setappID(response.data.lead_extra_details.app_id);
                        setbankNBFC(response.data.lead_extra_details.bank);
                        setscheme(response.data.lead_extra_details.scheme);
                        setdisbursedDate(response.data.lead_extra_details.disbursed_date)
                        setRoi(response.data.lead_extra_details.roi);
                        setRequiredRoi(response.data.lead_data.data.req_roi)
                        setGender(response.data.lead_data.data.gender);
                        setTenure(response.data.lead_data.data.tenure);
                        setFatherName(response.data.lead_data.data.father_name);
                        setMotherName(response.data.lead_data.data.mother_name);
                        setMaritalStatus(response.data.lead_data.data.marital_status);
                        setNoOfDependent(response.data.lead_data.data.no_of_dependence);
                        setAdhaarNo(response.data.lead_data.data.adhaar_no);
                        setAddressOne(response.data.lead_data.data.address_one);
                        setAddressTwo(response.data.lead_data.data.address_two);
                        setAddressThree(response.data.lead_data.data.address_three);
                        setCurrentAddressVintage(response.data.lead_data.data.current_address_vintage);
                        setPermanentAddressOne(response.data.lead_data.data.permanent_address_one);
                        setPermanentAddressTwo(response.data.lead_data.data.permanent_address_two);
                        setPermanentAddressThree(response.data.lead_data.data.permanent_address_three);
                        setPermanentCity(response.data.lead_data.data.permanent_city);
                        setPermanentStates(response.data.lead_data.data.permanent_state);
                        setPermanentPincode(response.data.lead_data.data.permanent_pincode);
                        setPermanentResidentType(response.data.lead_data.data.permanent_resident_Type);
                        setPermanentAddressVintage(response.data.lead_data.data.permanent_address_vintage);
                        setGrossIncome(response.data.lead_data.data.gross_income);
                        setOfficeAddress1(response.data.lead_data.data.office_address_one);
                        setOfficeAddress2(response.data.lead_data.data.office_address_two);
                        setOfficeAddress3(response.data.lead_data.data.office_address_three);
                        setOfficeCity(response.data.lead_data.data.office_city);
                        setOfficeStates(response.data.lead_data.data.office_state);
                        setOfficePincode(response.data.lead_data.data.office_pincode);
                        setOfficialMailid(response.data.lead_data.data.official_mail);
                        setLandlineNo(response.data.lead_data.data.landline_no);
                        setNoOfCreditCard(response.data.lead_data.data.no_of_creditcard);
                        setRef1FirstName(response.data.lead_data.data.ref1_first_name);
                        setRef1LastName(response.data.lead_data.data.ref1_last_name);
                        setRef1MobileNo(response.data.lead_data.data.ref1_mobile_no);
                        setRef1Address1(response.data.lead_data.data.ref1_address1);
                        setRef1Address2(response.data.lead_data.data.ref1_address2)
                        setRef1Pincode(response.data.lead_data.data.ref1_pincode);
                        setRef1City(response.data.lead_data.data.ref1_city);
                        setRef1States(response.data.lead_data.data.ref1_state);
                        setRef2Address1(response.data.lead_data.data.ref2_address1);
                        setRef2Address2(response.data.lead_data.data.ref2_address2);
                        setRef2Pincode(response.data.lead_data.data.ref2_pincode);
                        setRef2City(response.data.lead_data.data.ref2_city);
                        setRef2States(response.data.lead_data.data.ref2_state);
                        setRef2FirstName(response.data.lead_data.data.ref2_first_name);
                        setRef2LastName(response.data.lead_data.data.ref2_last_name);
                        setRef2MobileNo(response.data.lead_data.data.ref2_mobile_no);
                        setisLoading(false)
                        if (response.data.lead_data.lead_crm_id !== '' && response.data.lead_data.loan_type !== '' && response.data.lead_data.loan_amount !== '' && response.data.lead_data.name !== '' && response.data.lead_data["data"].dob !== '' && response.data.eligibility_data.pan_no !== '' && response.data.eligibility_data.email_id !== '' && response.data.lead_data.phone_no !== '') {
                            setcolorTick(true)
                        }
                        if (response.data.lead_data["data"].residential_pincode !== '' && response.data.lead_data["data"].city !== '' && response.data.lead_data["data"].state !== '' && response.data.eligibility_data.residence_type !== '') {
                            setcolorTick2(true)
                        }
                        if (response.data.lead_data["data"].permanent_pincode !== '' && response.data.lead_data["data"].permanent_city !== '' && response.data.lead_data['data'].permanent_state!== '' && response.data.lead_data['data'].permanent_resident_Type) {
                            setcolorTick3(true)
                        }
                        if (response.data.lead_data["data"].employment_type !== '' && response.data.lead_data["data"].current_company_name !== '' && response.data.eligibility_data.designation !== '' && response.data.eligibility_data.current_work_exp !== '' && response.data.eligibility_data.total_work_exp !== '' && response.data.lead_data["data"].monthly_income !== '' && response.data.eligibility_data.salary_mode !== '' && response.data.eligibility_data.salary_bank !== '') {
                            setcolorTick4(true)
                        }
                        if (response.data.eligibility_data.current_emi !== '') {
                            setcolorTick5(true)
                        }
                    }).catch((error)=>{
                        console.log(error)
                    });
        };
        fetchLeadDetaile(leadid);
    }, []);
    const remarksHandler = async (event, id) => {
        event.preventDefault();
        let item = { remark: input };
        let headers = {
            'Authorization': `Token ${profileData.token}`,
        };
        if (input.length !== 0) {
            await axios
                .post(`${baseUrl}/leads/lead_remark/${id}`, item, { headers })
                .then((response) => {
                    if (response.status === 201) {
                        setLoadingRemarks(loadingRemarks + 1);
                        setInput("");
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                });
        }
    };
    useEffect(() => {
        const fetchRemarks = async (id) => {
            setisLoading(true)
            setIsDisplay(false);
            let headers = {
                'Authorization': `Token ${profileData.token}`,
            };
            await axios
                .get(`${baseUrl}/leads/lead_remark/${id}`, { headers })
                .then((response) => {
                    setRemarks(response.data.remarks);
                    setisLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchRemarks(leadid);
    }, [loadingRemarks]);
    const updateLeadDetails = async (id) => {
        let regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pancardNo);
        if (expanded === 'panel1') {
            if (leadId !== '' && loanType !== '' && loanAmount !== '' && name !== '' && date !== '' && pancardNo !== '' && email !== '' && mobileNo !== '' && tenure !== '' && requiredRoi !== '') {
                colorRed[0] = false;
                setcolorTick(true)
            } else {
                setcolorTick(false)
            }
            if (pancardNo !== '' && !regex) {
                setAlertMessage('Inavlid PAN Number')
                setIsLeadError(true);
                return;
            }
            setExpanded('panel2')
        }
        if (expanded === 'panel2') {
            if (pincode !== '' && city !== '' && states !== '' && currentResidentType !== '' && addressOne !== '' && addressTwo !== '' && addressThree !== '' && currentAddressVintage !== '') {
                colorRed[1] = false;
                setcolorTick2(true)
            } else {
                setcolorTick2(false)
            }
            setExpanded('panel3')
        }
        if (expanded === 'panel3') {
            if (permanentPincode !== '' && permanentCity !== '' && permanentStates !== '' && permanentResidentType !== '' && permanentAddressOne !== '' && permanentAddressTwo !== '' && permanentAddressTwo !== '' && permanentAddressThree !== '' && permanentAddressVintage !== '') {
                colorRed[2] = false;
                setcolorTick3(true)
            } else {
                setcolorTick3(false)
            }
            setExpanded('panel4')
        }
        if (expanded === 'panel4') {
            if (employmentType !== '' && companyName !== '' && designation !== '' && currentWorkExp !== '' && totalWorkExp !== '' && monthlyIncome !== '' && salaryCreditMode !== '' && salaryBankAcc !== '') {
                colorRed[3] = false;
                setcolorTick4(true)
            } else {
                setcolorTick4(false)
            }
            setExpanded('panel5')

        }
        if (expanded === 'panel5') {
            if (currentEMI !== '') {
                colorRed[4] = false;
                setcolorTick5(true)
            } else {
                setcolorTick5(false)
            }
            setExpanded('panel6')
        }
        if (expanded === 'panel6') {
            if (ref1FirstName !== '' && ref1LastName !== '' && ref1MobileNo !== '' && ref1Address1 !== '' && ref1Address2 !== '' && ref1Pincode !== '' ) {
                colorRed[5] = false;
                setcolorTick6(true)
            } else {
                setcolorTick6(false)
            }
            setExpanded('panel7')
        }
        if (expanded === 'panel7') {
            if (ref2FirstName !== '' && ref2LastName !== '' && ref2MobileNo !== '' && ref2Address1 !== '' && ref2Address2 !== '' && ref2Pincode !== '' ) {
                colorRed[6] = false;
                setcolorTick7(true)
            } else {
                setcolorTick7(false)
            }
            setExpanded('panel1')
        }
        let data = {
            dob: date, monthly_income: monthlyIncome, pan_no: pancardNo, current_company_name: companyName,
            residential_pincode: pincode, city: city, state: states, current_company: currentCompany,
            employment_type: employmentType, credi_card_balance_transfer: creditCardbalanceTransfer,
            gender: gender,req_roi:requiredRoi, tenure: tenure, father_name: fatherName, mother_name: motherName, marital_status: maritalStatus,
            adhaar_no: adhaarNo, no_of_dependence: noOfDependent, address_one: addressOne, address_two: addressTwo,
            address_three: addressThree, current_address_vintage: currentAddressVintage, permanent_address_one: permanentAddressOne,
            permanent_address_two: permanentAddressTwo, permanent_address_three: permanentAddressThree, permanent_pincode: permanentPincode,
            permanent_city: permanentCity, permanent_state: permanentStates, permanent_address_vintage: permanentAddressVintage,
            gross_income: grossIncome,office_address_one:officeAddress1,office_address_two:officeAddress2,office_address_three:officeAddress3,
             office_pincode: officePincode, office_city: officeCity, office_state: officeStates,
            official_mail: officialMailid, landline_no: landlineNo, no_of_creditcard: noOfCreditCard, ref1_first_name: ref1FirstName,
            ref1_last_name: ref1LastName, ref1_mobile_no: ref1MobileNo, ref1_address1:ref1Address1,ref1_address2:ref1Address2,
            ref1_pincode:ref1Pincode,ref1_city:ref1City,ref1_state:ref1States,
            ref2_first_name: ref2FirstName, ref2_last_name: ref2LastName,ref2_mobile_no: ref2MobileNo, permanent_resident_Type: permanentResidentType,
            ref2_address1:ref2Address1,ref2_address2:ref2Address2,ref2_pincode:ref2Pincode,
            ref2_city:ref2City,ref2_state:ref2States
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
        if (status === 'STB') {
            let data = [...STBError];
            if (appID === "") data[0] = true;
            if (bankNBFC === "") data[1] = true;
            if (scheme === "") data[2] = true;

            if (appID == '' || bankNBFC == '' || scheme == '') {
                setSTBError(data);
                return;
            }
            let colorRedError = [...colorRed];
            if (leadId === '') colorRedError[0] = true;
            if (mobileNo === '') colorRedError[0] = true;
            if (loanType === '') colorRedError[0] = true;
            if (name === '') colorRedError[0] = true;
            if (date === '') colorRedError[0] = true;
            if (pancardNo === '') colorRedError[0] = true;
            if (email === '') colorRedError[0] = true;
            if (loanAmount === '') colorRedError[0] = true;
            if (tenure === '') colorRedError[0] = true;
            if (requiredRoi === '') colorRedError[0] = true;
            if (date === '' || pancardNo === '' || email === '' || leadId === '' || mobileNo === '' || loanType === '' || name === ''|| loanAmount === ''||tenure === ''||requiredRoi === '')  {
                setcolorRed(colorRedError)
                return;
            }
            if (pincode === '') colorRedError[1] = true;
            if (city === '') colorRedError[1] = true;
            if (states === '') colorRedError[1] = true;
            if (currentResidentType === '') colorRedError[1] = true;
            if (addressOne === '') colorRedError[1] = true;
            if (addressTwo === '') colorRedError[1] = true;
            if (addressThree === '') colorRedError[1] = true;
            if (currentAddressVintage === '') colorRedError[1] = true
            if (pincode === '' || city === '' || states === '' || currentResidentType === '' || addressOne === '' || addressTwo === '' || addressThree === '' || currentAddressVintage === '') {
                setcolorRed(colorRedError)
                return;
            }
            if (permanentPincode === '') colorRedError[2] = true;
            if (permanentCity === '') colorRedError[2] = true;
            if (permanentStates === '') colorRedError[2] = true;
            if (permanentResidentType === '') colorRedError[2] = true;
            if (permanentAddressOne === '') colorRedError[2] = true;
            if (permanentAddressTwo === '') colorRedError[2] = true;
            if (permanentAddressThree === '') colorRedError[2] = true;
            if (permanentAddressVintage === '') colorRedError[2] = true
            if (permanentPincode === '' || permanentCity === '' || permanentStates === '' || permanentResidentType === '' || permanentAddressOne === '' || permanentAddressTwo === '' || permanentAddressThree === '' || permanentAddressVintage === '') {
                setcolorRed(colorRedError)
                return;
            }
            if (employmentType === '') colorRedError[3] = true;
            if (companyName === '') colorRedError[3] = true;
            if (designation === '') colorRedError[3] = true;
            if (currentWorkExp === '') colorRedError[3] = true;
            if (totalWorkExp === '') colorRedError[3] = true;
            if (monthlyIncome === '') colorRedError[3] = true;
            if (salaryCreditMode === '') colorRedError[3] = true;
            if (salaryBankAcc === '') colorRedError[3] = true;
            if (employmentType === '' || companyName === '' || designation === '' || currentWorkExp === '' || totalWorkExp === '' || monthlyIncome === '' || salaryCreditMode === '' || salaryBankAcc === '') {
                setcolorRed(colorRedError)
                return;
            }
            if (currentEMI === '') colorRedError[4] = true;
            if (currentEMI === '') {
                setcolorRed(colorRedError)
                return;
            }
            
        }
        if (status === 'Valid Follow-Up' || status === 'Cold Follow-Up' || status === 'Hot Follow-Up' || (status === 'Punched' && subStatus === 'Eligible')) {
            let followData = [...followUpDateError];
            if (followUpDate === "") {
                followData[0] = true;
                setfollowUpDateError(followData);
                return;
            }
        }
        if (subStatus === 'Disbursed') {
            let disData = [...disbursedError];
            if (disbursedDate === null) disData[0] = true;
            if (Roi === 0) disData[1] = true;
            if (disbursedDate === null || Roi === 0) {
                setdisbursedError(disData);
                return;
            }
        }
        let items = { status: status, sub_status: subStatus, app_id: appID, bank: bankNBFC, scheme: scheme, callback_time: followUpDate.replace('T', ' '), disbursed_date: disbursedDate, roi: Roi }
        let headers = { 'Authorization': `Token ${profileData.token}` }
        if (status !== '' && subStatus.length > 0) {
            await axios.put(`${baseUrl}/leads/lead_status/${id}`, items, { headers })
                .then((response) => {
                    if (response.status === 200) {
                        setIsStatus(true)
                    }
                    if (location.pathname === `/dashboards/myleads/edit/${leadid}`) {
                        setTimeout(() => {
                            history.goBack()
                        }, 1500)
                    } else if (location.pathname === `/dashboards/followup/edit/${leadid}`) {
                        setTimeout(() => {
                            notification()
                        }, 5000)
                        setTimeout(() => {
                            history.goBack()
                        }, 1500)
                    } else {
                        setTimeout(() => {
                            history.push('/dashboards/leads')
                        }, 1500)
                    }
                }).catch((error) => {
                    setAlertMessage(error.response.data.error)
                    setIsLeadError(true)
                })
        }
    }
    useEffect(() => {
        if (status === 'Contacted NI/NE' || status === 'Customer Not Interested') {
            setAlertMessage('Please Add Remark');
            setIsLeadError(true);
        }
    }, [status]);
    const searchCompanyHandler = async (e) => {
        setCompanyName(e.target.value);
        setShowCompany(true);
        const searchCompanyUrl = "https://backend.credfine.com/common/search_company";
        let item = { company: companyName };
        const header = { 'Content-Type': 'application/json' }
        if (e.target.value.length >= 2) {
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
    const getPermanentPincodeHandler = async (e) => {
        setPermanentPincode(e.target.value);
        let item = { pincode: e.target.value };
        const header = { 'Content-Type': 'application/json' }
        if (e.target.value >= 6) {
            await axios.post(`${baseUrl}/common/fetchPincode/`, item, { header })
                .then((response) => {
                    if (response.data[0].pin === e.target.value) {
                        setPermanentCity(response.data[0].city_name);
                        setPermanentStates(response.data[0].state_name);
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const getOfficePincodeHandler = async (e) => {
        setOfficePincode(e.target.value);
        let item = { pincode: e.target.value };
        const header = { 'Content-Type': 'application/json' }
        if (e.target.value >= 6) {
            await axios.post(`${baseUrl}/common/fetchPincode/`, item, { header })
                .then((response) => {
                    if (response.data[0].pin === e.target.value) {
                        setOfficeCity(response.data[0].city_name);
                        setOfficeStates(response.data[0].state_name);
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const getRelativesPincodeHandler = async (e) => {
        setRef1Pincode(e.target.value);
        let item = { pincode: e.target.value };
        const header = { 'Content-Type': 'application/json' }
        if (e.target.value >= 6) {
            await axios.post(`${baseUrl}/common/fetchPincode/`, item, { header })
                .then((response) => {
                    if (response.data[0].pin === e.target.value) {
                        setRef1City(response.data[0].city_name);
                        setRef1States(response.data[0].state_name);
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const getFriendnsPincodeHandler = async (e) => {
        setRef2Pincode(e.target.value);
        let item = { pincode: e.target.value };
        const header = { 'Content-Type': 'application/json' }
        if (e.target.value >= 6) {
            await axios.post(`${baseUrl}/common/fetchPincode/`, item, { header })
                .then((response) => {
                    if (response.data[0].pin === e.target.value) {
                        setRef2City(response.data[0].city_name);
                        setRef2States(response.data[0].state_name);
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
    const updateClipboard = (newClip) => {
        navigator.clipboard.writeText(newClip).then(function () {
            setisCopy(true);
        }, function () {
            setAlertMessage('Lead ID not copied!');
            isLeadError(true)
        });
    }
    const disableHangUpSnacks = () => {
        sethangUpSnacks(false);
        setIsLeadError(false);
        setIsLeadDetails(false);
        setisCopy(false);
        setIsAutoDialerEnd(false);
    }
    const clickToCall = async (customerNo, leadID) => {
        if (profileData.dialer === 'HALOOCOM-Noida') {
            await axios.post(`${haloocomNoidaDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`)
                .then((response) => {
                    setDialerCall(true);
                    setDisableHangupBtn(false);
                    if (response.status === 200) {
                        localStorage.setItem('callHangUp', true)
                    }
                }).catch((error) => {
                    console.log('error');
                })
        } else if (profileData.dialer === 'HALOOCOM-Mumbai') {
            await axios.post(`${haloocomMumbaiDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`)
                .then((response) => {
                    setDialerCall(true);
                    setDisableHangupBtn(false);
                    if (response.status === 200) {
                        localStorage.setItem('callHangUp', true)
                    }
                }).catch((error) => {
                    console.log('error');
                })
        }
    }
    const hangupCallHandler = async () => {
        if (profileData.dialer === "HALOOCOM-Noida") {
            await axios.post(`${haloocomNoidaDialerApi}/action.php?user=${profileData.vertage_id}&type=Hangup&disposition`)
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
        } else if (profileData.dialer === "HALOOCOM-Mumbai") {
            await axios.post(`${haloocomMumbaiDialerApi}/action.php?user=${profileData.vertage_id}&type=Hangup&disposition`)
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
    }
    const disposeCallHandler = () => {
        // await axios.post()
        //     .then((response) => {
        //         sethangUpSnacks(true);
        //         setCallHangUpState(true);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        sethangUpSnacks(true);
        setCallHangUpState(true);

    }
    const disableDialerPopUp = () => {
        setDialerCall(false)
        setDisableHangupBtn(false)
    }
    const endAutoDialerBtnHandler = () => {
        setIsAutoDialerEnd(true);
        localStorage.removeItem('auto_dialer');
    }
    const downloadPdfHandler = () => {
        const doc = new jsPDF("p", "pt", "a4");
        doc.autoTable({ 
            html: '#leadDetails-table' ,
            theme:"grid",
            styles: {
                overflow: 'linebreak',
                columnWidth: 260,
            },
            didDrawCell:function(data){
                doc.setFontSize(15);
                doc.setTextColor(0);
                doc.text("Customer Personal And Loan Details", data.settings.margin.left, 22);            
             },
        })
        doc.autoTable({ 
            html: '#leadDetails-table1',
            theme:'grid',
            styles: {
                overflow: 'linebreak',
                columnWidth: 260,
            },
        })
        doc.autoTable({
             html: '#leadDetails-table2',
            theme:'grid',
            styles: {
                overflow: 'linebreak',
                columnWidth: 260,
            },
        })
        doc.autoTable({
             html: '#leadDetails-table3',
            theme:'grid',
            styles: {
                overflow: 'linebreak',
                columnWidth: 260,
            },
        })
        doc.autoTable({
             html: '#leadDetails-table4',
            theme:'grid',
            styles: {
                overflow: 'linebreak',
                columnWidth: 260,
            },
        })
        doc.autoTable({
             html: '#leadDetails-table5',
            theme:'grid',
            styles: {
                overflow: 'linebreak',
                columnWidth: 260,
            },
        })
        doc.autoTable({
            html: '#leadDetails-table6',
           theme:'grid',
           styles: {
               overflow: 'linebreak',
               columnWidth: 260,
           },
       })
        doc.save(`${name}-${leadId}.pdf`);
    }
    const checkboxHandler = (e) => {
        setChecked(e.target.checked);
        if (e.target.checked) {
            setPermanentAddressOne(addressOne);
            setPermanentAddressTwo(addressTwo)
            setPermanentAddressThree(addressThree);
            setPermanentCity(city);
            setPermanentStates(states);
            setPermanentPincode(pincode);
            setPermanentResidentType(currentResidentType);
            setPermanentAddressVintage(currentAddressVintage);
        }
    }
    return (
        <PageLayerSection isDisplaySearchBar={true} pageTitle="Lead Details" className={classes.scrollEnable} offerButton={true} isWhatsapp={true} whatsappNumber={mobileNo} endAutoDialerBtn={true} endAutoDialerClick={() => endAutoDialerBtnHandler()} ActualEmiCalculate={openCalculator} isDownloadPdf={true} downloadPdf={() => downloadPdfHandler()} isShareThroughEmail={true} emailId={email}>
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            {/* Errors SnackBars Start */}
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={hangUpSnacks} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Hang Up Successfully...
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={isAutoDialerEnd} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="info">
                    Auto dialer mode is off
                </Alert>
            </Snackbar>
            {profileData.dialer === 'HALOOCOM' ? <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={localStorage.getItem("callHangUp") && localStorage.getItem("callHangUp") !== null ? true : callInProgress} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="info">
                    Call in progress....
                </Alert>
            </Snackbar> : ""}
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCopy} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Successfully copied to clipboard
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isLeadDetails} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Lead Data Successfully Updated
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isStatus} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Status Successfully Updated
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isLeadError} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="error">
                    {alertMessage}
                </Alert>
            </Snackbar>
            {/* Errors SnackBars End */}
            {isLoading ? <div className="loader">
                <CircularProgress size={100} thickness={3} />
            </div> : <Grid container style={{ justifyContent: "flex-start" }}>
                <Grid className="accordianContainer" lg={9}>
                    <Accordion square defaultExpanded={true} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1d-content" id="panel1d-header">
                            <Typography className={classes.headerText}>Personal & Loan Details</Typography>
                            {colorRed[0] ? <CheckCircleIcon className={colorRed[0] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Lead ID"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={leadId}
                                        disabled
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        select
                                        id="outlined-full-width"
                                        label="Product Type"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={loanType}
                                        onChange={(e) => setLoanType(e.target.value)}
                                    >
                                        <option key="" value="">
                                            Select
                                        </option>
                                        <option value="PL">Personal Loan </option>
                                        <option value="BL">Business Loan </option>
                                    </TextField>
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Loan Amount"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        select
                                        className="textField"
                                        id="outlined-full-width"
                                        label=" Req Tenure in years"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        SelectProps={{
                                            native: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={tenure}
                                        onChange={(e) => setTenure(e.target.value)}
                                    >
                                        <option key="" value="">Select One</option>
                                        <option value="1 year">1 year</option>
                                        <option value="2 years">2 years</option>
                                        <option value="3 years">3 years</option>
                                        <option value="4 years">4 years</option>
                                        <option value="5 years">5 years</option>
                                        <option value="6 years">6 years</option>
                                        <option value="7 years">7 years</option>
                                    </TextField>
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Required Roi %"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        inputProps={{
                                            maxLength: 5
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={requiredRoi}
                                        onChange={(e) => {
                                            const re = /^[0-9\b.]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setRequiredRoi(e.target.value)
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField fullName"
                                        id="outlined-full-width"
                                        label="Full Name as Per Pancard"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        select
                                        id="outlined-full-width"
                                        label="Gender"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option key="" value="">Select One</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="LGBT">LGBT</option>
                                    </TextField>
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField fullName"
                                        id="outlined-full-width"
                                        label="Father's Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={fatherName}
                                        onChange={(e) => setFatherName(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField fullName"
                                        id="outlined-full-width"
                                        label="Mother's Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={motherName}
                                        onChange={(e) => setMotherName(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        type="date"
                                        className="textField"
                                        placeholder="DD / MM / YYYY"
                                        id="outlined-full-width"
                                        label="Date of Birth"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        // error
                                        className="textField"
                                        id="outlined-full-width"
                                        label="PAN Number"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        inputProps={{
                                            maxLength: 10
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={pancardNo}
                                        onChange={(e) => setPancardNo(e.target.value.toUpperCase())}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Personal Email ID"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Mobile Number"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={maskPhoneNo(mobileNo)}
                                        disabled
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        select
                                        id="outlined-full-width"
                                        label="Marital Status"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={maritalStatus}
                                        onChange={(e) => setMaritalStatus(e.target.value)}
                                    >
                                        <option key="" value=""> Select One</option>
                                        <option value="Single">Single </option>
                                        <option value="Married">Married </option>
                                        <option value="Divorce">Divorce</option>
                                        <option value="Widow">Widow</option>
                                    </TextField>
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        select
                                        id="outlined-full-width"
                                        label="No of Dependence"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={noOfDependent}
                                        onChange={(e) => setNoOfDependent(e.target.value)}
                                    >
                                        <option key="" value=""> Select One</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="7+">7+</option>
                                    </TextField>
                                </Grid>
                                <Grid container style={{ direction: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Grid lg={4}>
                                        <TextField
                                            className="textField"
                                            id="outlined-full-width"
                                            label="Adhaar No"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                maxLength: 12
                                            }}
                                            variant="outlined"
                                            size="small"
                                            value={adhaarNo}
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                if (e.target.value === '' || re.test(e.target.value)) {
                                                    setAdhaarNo(e.target.value)
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button onClick={() => updateLeadDetails(leadid)} className="saveAndNextBtn" color='primary' variant='contained'>SAVE &amp; NEXT</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel2d-content" id="panel2d-header">
                            <Typography className={classes.headerText}>Current Residential Details</Typography>
                            {colorRed[1] ? <CheckCircleIcon className={colorRed[1] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick2 ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ justifyContent: "center", flexDirection: 'row' }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 1"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        inputProps={{
                                            maxLength:30
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={addressOne}
                                        onChange={(e) => setAddressOne(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 2"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={addressTwo}
                                        onChange={(e) => setAddressTwo(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Landmark"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={addressThree}
                                        onChange={(e) => setAddressThree(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Pincode"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        inputProps={{
                                            maxLength: 6
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={pincode}
                                        onChange={(e) => getPincodeHandler(e)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="City"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={city}
                                        disabled
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="State"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={states}
                                        disabled
                                    />
                                </Grid>
                                <Grid container style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                                    <Grid lg={4}>
                                        <TextField
                                            className="textField"
                                            id="outlined-full-width"
                                            select
                                            label="Resident Type"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                                required: true
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
                                    </Grid>
                                    <Grid lg={4}>
                                        <TextField
                                            className="textField"
                                            select
                                            id="outlined-full-width"
                                            label="Current Address Vintage"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                                required: true
                                            }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            value={currentAddressVintage}
                                            onChange={(e) => setCurrentAddressVintage(e.target.value)}
                                        >
                                            <option key="" value="">Select One</option>
                                            <option value="0-6 months">0-6 months</option>
                                            <option value="6-12 months">6-12 months</option>
                                            <option value="12-24 months">12-24 months</option>
                                            <option value="24-36 months">24-36 months</option>
                                            <option value="36-48 months">36-48 months</option>
                                            <option value="48-60 months">48-60 months</option>
                                            <option value="60+ months">60+ months</option>
                                            <option value="since birth">since birth</option>
                                        </TextField>
                                    </Grid>
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE &amp; NEXT</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel3d-content" id="panel3d-header">
                            <Typography className={classes.headerText}>Permanent Residential Details</Typography>
                            {colorRed[2] ? <CheckCircleIcon className={colorRed[2] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick3 ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ justifyContent: "center", flexDirection: 'row' }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 1"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        inputProps={{
                                            maxLength:30
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={permanentAddressOne}
                                        onChange={(e) => setPermanentAddressOne(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 2"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={permanentAddressTwo}
                                        onChange={(e) => setPermanentAddressTwo(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Landmark"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        inputProps={{
                                            maxLength:30
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={permanentAddressThree}
                                        onChange={(e) => setPermanentAddressThree(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Pincode"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        inputProps={{
                                            maxLength: 6
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={permanentPincode}
                                        onChange={(e) => getPermanentPincodeHandler(e)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="City"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={permanentCity}
                                        disabled
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="State"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={permanentStates}
                                        disabled
                                    />
                                </Grid>
                                <Grid container style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                                    <Grid lg={4}>
                                        <TextField
                                            className="textField"
                                            id="outlined-full-width"
                                            select
                                            label="Resident Type"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                                required: true
                                            }}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            variant="outlined"
                                            size="small"
                                            value={permanentResidentType}
                                            onChange={(e) => setPermanentResidentType(e.target.value)}
                                        >
                                            <option key="" value="">
                                                Select One
                                            </option>
                                            {residentType.map((resident) => (
                                                <option value={resident}>{resident}</option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid lg={4}>
                                        <TextField
                                            className="textField"
                                            select
                                            id="outlined-full-width"
                                            label="Permanent Address Vintage"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                                required: true
                                            }}
                                            SelectProps={{
                                                native: true
                                            }}
                                            variant="outlined"
                                            size="small"
                                            value={permanentAddressVintage}
                                            onChange={(e) => setPermanentAddressVintage(e.target.value)}
                                        >
                                            <option key="" value="">Select One</option>
                                            <option value="0-6 months">0-6 months</option>
                                            <option value="6-12 months">6-12 months</option>
                                            <option value="12-24 months">12-24 months</option>
                                            <option value="24-36 months">24-36 months</option>
                                            <option value="36-48 months">36-48 months</option>
                                            <option value="48-60 months">48-60 months</option>
                                            <option value="60+ months">60+ months</option>
                                            <option value="since birth">since birth</option>
                                        </TextField>
                                    </Grid>
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE &amp; NEXT</Button>
                                    </Grid>
                                    <Grid container style={{ display: 'flex', alignItems: 'center', }}>
                                        <Checkbox
                                            checked={checked}
                                            onChange={(e) => checkboxHandler(e)}
                                        />
                                        <div>Click if Permanent Address Same As Current Address</div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel4'} onChange={handleChange('panel4')} aria-controls="panel4d-content" id="panel4d-header">
                            <Typography className={classes.headerText}>Employment &amp; Income Details</Typography>
                            {colorRed[3] ? <CheckCircleIcon className={colorRed[3] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick4 ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        select
                                        label="Employment Type"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Company Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Designation"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        select
                                        label="Vintage in Current Company"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        select
                                        label="Total Work Experience"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Gross Income"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={grossIncome}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setGrossIncome(e.target.value)
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Net Monthly Income"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Office Address 1"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength:30
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={officeAddress1}
                                        onChange={(e) => setOfficeAddress1(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Office Address 2"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={officeAddress2}
                                        onChange={(e) => setOfficeAddress2(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Office Landmark"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength:30
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={officeAddress3}
                                        onChange={(e) => setOfficeAddress3(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Office Pincode"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={officePincode}
                                        onChange={(e) => getOfficePincodeHandler(e)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Office city"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={officeCity}
                                        disabled

                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Office State"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={officeStates}
                                        disabled
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Official Mail Id"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={officialMailid}
                                        onChange={(e) => setOfficialMailid(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Landline No"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={landlineNo}
                                        onChange={(e) => setLandlineNo(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        select
                                        id="outlined-full-width"
                                        label="Mode of Salary"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        select
                                        id="outlined-full-width"
                                        label="Salary Credit Bank Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
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
                                </Grid>
                                <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE &amp; NEXT</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel5'} onChange={handleChange('panel5')} aria-controls="panel5d-content" id="panel5-header">
                            <Typography className={classes.headerText}>Obligation Details</Typography>
                            {colorRed[4] ? <CheckCircleIcon className={colorRed[4] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick5 ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Total EMI Exclude Credit Card"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            required: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={currentEMI}
                                        inputProps={{
                                            maxLength: "6"
                                        }}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setCurrentEMI(e.target.value)
                                            }
                                        }
                                        }
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        select
                                        id="outlined-full-width"
                                        label="No Of Credit Card"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            native: true
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={noOfCreditCard}
                                        onChange={(e) => setNoOfCreditCard(e.target.value)}
                                    >
                                        <option key="" value=" ">Select One</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="10+">10+</option>
                                    </TextField>
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Credit Card Outstanding"
                                        style={{ margin: 8 }}
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
                                </Grid>
                                <Grid container style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                                    <Grid lg={4}>
                                        <TextField
                                            className="textField"
                                            select
                                            id="outlined-full-width"
                                            label="Credit Card Balance Transfer"
                                            style={{ margin: 8 }}
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
                                    </Grid>
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE & NEXT</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel6'} onChange={handleChange('panel6')} aria-controls="panel6d-content" id="panel6-header">
                            <Typography className={classes.headerText}> Relative's Reference Details</Typography>
                            {colorRed[5] ? <CheckCircleIcon className={colorRed[5] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick6 ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="First Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1FirstName}
                                        onChange={(e) => setRef1FirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Last Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1LastName}
                                        onChange={(e) => setRef1LastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Mobile No"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength: 10
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1MobileNo}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setRef1MobileNo(e.target.value)
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 1"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength:30
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1Address1}
                                        onChange={(e) =>setRef1Address1(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 2"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength: 10
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1Address2}
                                        onChange={(e) => setRef1Address2(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Pincode"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1Pincode}
                                        onChange={(e)=>getRelativesPincodeHandler(e)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="city"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1City}
                                        disabled

                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="State"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref1States}
                                        disabled
                                    />
                                </Grid>
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE &amp; NEXT</Button>
                                    </Grid>
                            </Grid>
                        </AccordionDetails>                
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel7'} onChange={handleChange('panel7')} aria-controls="panel7d-content" id="panel7-header">
                            <Typography className={classes.headerText}>Friend's Reference Details</Typography>
                            {colorRed[6] ? <CheckCircleIcon className={colorRed[6] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick6 ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="First Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2FirstName}
                                        onChange={(e) => setRef2FirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Last Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2LastName}
                                        onChange={(e) => setRef2LastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Mobile No"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength: 10
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2MobileNo}
                                        onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setRef2MobileNo(e.target.value)
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 1"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength:30
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2Address1}
                                        onChange={(e) =>setRef2Address1(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Address 2"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            maxLength: 10
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2Address2}
                                        onChange={(e) => setRef2Address2(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Pincode"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2Pincode}
                                        onChange={(e)=>getFriendnsPincodeHandler(e)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="city"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2City}
                                        disabled

                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="State"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={ref2States}
                                        disabled
                                    />
                                </Grid>
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE</Button>
                                    </Grid>
                            </Grid>
                        </AccordionDetails>                
                    </Accordion>
                    <Grid className="completeJourneyContainer">
                        <NavLink to={`/dashboards/PersonalLoanForm/${leadid}`}>
                            <Button
                                className="journeyBtn"
                                color="primary"
                                variant="contained">
                                COMPLETE JOURNEY
                            </Button>
                        </NavLink>
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            LEAD JOURNEY
                        </Button>
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            LEAD HISTORY
                        </Button>
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            DISPOSITION HISTORY
                        </Button>
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            CALL HISTORY
                        </Button>
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            CREDIT HISTORY
                        </Button>
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            CROSS SELL
                        </Button>
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            SOURCE
                        </Button>
                    </Grid>
                </Grid>
                <Grid className="callConatiner" lg={3}>
                    <Grid className="callAdjustContainer">
                        <div className="buttonAdjust"><Button
                            className="callBtn"
                            color="primary"
                            variant="contained"
                            startIcon={<CallIcon className="callIcon" />}
                            onClick={() => clickToCall(mobileNo, leadid)}>
                            Call
                        </Button>
                            <Button
                                className="endBtn"
                                color="primary"
                                variant="contained"
                                startIcon={<CallIcon className="callIcon" />}
                                disabled={localStorage.getItem("callHangUp") && localStorage.getItem("callHangUp") !== null ? false : callHangUpState}
                                onClick={hangupCallHandler}>
                                End
                            </Button>
                        </div>
                        <Grid>
                            <TextField
                                className="textField"
                                id="outlined-full-width"
                                select
                                label="Status"
                                style={{ margin: 8 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                                size="small"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option key="" value="">
                                    Select
                                </option>
                                {uniqueStatus.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid>
                            <TextField
                                className="textField"
                                id="outlined-full-width"
                                select
                                label="Sub Status"
                                style={{ margin: 8 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="outlined"
                                size="small"
                                value={subStatus}
                                onChange={(e) => { setSubStatus(e.target.value) }}
                            >
                                <option key="" value="">
                                    Select
                                </option>
                                {options.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </TextField>
                        </Grid>
                        {status === 'Contacted NI/NE' || status === 'Customer Not Interested' || status === 'Not Contactable' || (status === 'Punched' && subStatus === 'Not Eligible') || status === 'STB' ? '' : <Grid>
                            <TextField
                                className="textField"
                                id="outlined-full-width"
                                type="datetime-local"
                                label="Follow-up Date"
                                style={{ margin: 8 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                InputAdornmentProps={{ position: 'start' }}
                                value={followUpDate}
                                onChange={(e) => setfollowUpDate(e.target.value)}
                                onFocus={() => {
                                    let followData = [...followUpDateError];
                                    followData[0] = false;
                                    setfollowUpDateError(followData);
                                }}
                                error={followUpDateError[0]}
                                helperText={followUpDateError[0] ? 'Follow-up date is required' : ''}
                            />
                        </Grid>}
                        {status === "STB" ? <React.Fragment>
                            <Grid>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="App ID"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                    value={appID}
                                    onChange={(e) => {
                                        setappID((e.target.value).toUpperCase())
                                    }}
                                    onFocus={() => {
                                        let data = [...STBError];
                                        data[0] = false;
                                        setSTBError(data);
                                    }}
                                    error={STBError[0]}
                                    helperText={STBError[0] ? 'App Id is required' : ''}
                                />
                            </Grid>
                            <Grid container style={{ justifyContent: 'center' }}>
                                <Grid>
                                    <TextField
                                        className="textField2 textLeft"
                                        id="outlined-full-width"
                                        select
                                        label="Bank/NBFC"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={bankNBFC}
                                        onChange={(e) => {
                                            setbankNBFC(e.target.value)

                                        }}
                                        onFocus={() => {
                                            let data = [...STBError];
                                            data[1] = false;
                                            setSTBError(data);
                                        }}
                                        error={STBError[1]}
                                        helperText={STBError[1] ? 'Bank is required' : ''}
                                    >
                                        <option key="" value="">Select</option>
                                        <option value="HDFB_Bank_(Online)">HDFB Bank (Online)</option>
                                        <option value="HDFC_Bank_(DSA)">HDFC Bank (DSA)</option>
                                        <option value="Kotak_Bank_(Online)">Kotak Bank (Online)</option>
                                        <option value="Kotak_Bank_(DSA)">Kotak Bank (DSA)</option>
                                        <option value="IDFC_Bank_(Online)">IDFC Bank (Online)</option>
                                        <option value="IDFC_Bank_(DSA)">IDFC Bank (DSA)</option>
                                        <option value="ICICI_Bank_(Online)">ICICI Bank (Online)</option>
                                        <option value="ICICI_Bank_(DSA)">ICICI Bank (DSA)</option>
                                        <option value="Yes_Bank_(Online)">Yes Bank (Online)</option>
                                        <option value="Yes_Bank_(DSA)">Yes Bank (DSA)</option>
                                        <option value="SCB_(DSA)">SCB (DSA)</option>
                                        <option value="AXIS_BANK_(DSA)">AXIS BANK (DSA)</option>
                                        <option value="INDUSIND_BANK_(DSA)">INDUSIND BANK (DSA)</option>
                                        <option value="TATA_Capital_(Online)">TATA Capital (Online)</option>
                                        <option value="TATA_Capital_(DSA)">TATA Capital (DSA)</option>
                                        <option value="BIZ_DSA">BIZ DSA</option>
                                        <option value="BIZ_API">BIZ API</option>
                                        <option value="BIZ_Online">BIZ Online</option>
                                        <option value="ABFL">ABFL</option>
                                        <option value="Fullerton">Fullerton</option>
                                        <option value="INCRED">INCRED</option>
                                        <option value="HERO_Fincorp">HERO Fincorp</option>
                                        <option value="Paysense">Paysense</option>
                                        <option value="Others">Others</option>
                                    </TextField>
                                </Grid>
                                <Grid>
                                    <TextField
                                        className="textField2 textRight"
                                        id="outlined-full-width"
                                        select
                                        label="Scheme"
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={scheme}
                                        onChange={(e) => {
                                            setscheme(e.target.value)
                                        }}
                                        onFocus={() => {
                                            let data = [...STBError];
                                            data[2] = false;
                                            setSTBError(data);
                                        }}
                                        error={STBError[2]}
                                        helperText={STBError[2] ? 'Scheme is required' : ''}
                                    >
                                        <option key="" value="">Select</option>
                                        <option value="Fresh-PL">Fresh-PL</option>
                                        <option value="PL-Topup">PL-Topup</option>
                                        <option value="PL-BT">PL-BT</option>
                                        <option value="PL-BT-Topup">PL-BT-Topup</option>
                                        <option value="Fresh_OD">Fresh OD</option>
                                        <option value="OD-Topup">OD-Topup</option>
                                        <option value="OD-BT-Topup">OD-BT-Topup</option>
                                        <option value="CC-BT">CC-BT</option>
                                        <option value="CC-BT-Topup">CC-BT-Topup</option>
                                        <option value="PL-CC-BT">PL-CC-BT</option>
                                        <option value="PL-CC-BT-Topup">PL-CC-BT-Topup</option>
                                        <option value="Others">Others</option>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </React.Fragment> : ''}
                        {subStatus === 'Disbursed' ? <Grid container style={{ justifyContent: 'center' }}>
                            <Grid>
                                <TextField
                                    className="textField2 textLeft"
                                    id="outlined-full-width"
                                    type="date"
                                    label="Disb Date"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                    value={disbursedDate}
                                    onChange={(e) => setdisbursedDate(e.target.value)}
                                    onFocus={() => {
                                        let disData = [...disbursedError];
                                        disData[0] = false;
                                        setdisbursedError(disData)
                                    }}
                                    error={disbursedError[0]}
                                    helperText={disbursedError[0] ? 'Disbursal date required' : ''}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    className="textField2 textRight"
                                    id="outlined-full-width"
                                    label="ROI %"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        maxLength: 5
                                    }}
                                    variant="outlined"
                                    size="small"
                                    value={Roi}
                                    onChange={(e) => {
                                        const re = /^[0-9\b.]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setRoi(e.target.value)
                                        }
                                    }}
                                    onFocus={() => {
                                        let disData = [...disbursedError];
                                        disData[1] = false;
                                        setdisbursedError(disData)
                                    }}
                                    error={disbursedError[1]}
                                    helperText={disbursedError[1] ? 'Roi is required' : ''}
                                />
                            </Grid>
                        </Grid> : ''}
                    </Grid>
                    <div className="addRemarkContainer">
                        <Grid container style={{ justifyContent: 'center' }}>
                            <h4>Add Remarks</h4>
                            <div className="remarks">
                                <textarea rows="4" cols="4" placeholder="Enter Remark....." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        return remarksHandler(event, leadid)
                                    }
                                }} />
                                <div className="remarkSubmitContainer">
                                    <div className="remarkBtnText">Click green button to update remark.</div>
                                    <SendIcon onClick={(event) => remarksHandler(event, leadid)} className="remarkSend" style={{ color: '#14cc9e' }} />
                                </div>
                            </div>
                        </Grid>
                    </div>
                    <Grid container style={{ justifyContent: 'center' }}>
                        <Button className="submitBtn" color='primary' variant='contained' onClick={() => statusUpdateHandler(leadid)} disabled={localStorage.getItem("callHangUp") && localStorage.getItem("callHangUp") !== null ? submitFalse : false}>Submit</Button>
                    </Grid>
                    <div className="allremarksContainer">
                        <h4>All Remarks <span onClick={() => updateClipboard(leadid)}>{leadid}</span></h4>
                        <div className="autoScroll">
                            {
                                remarks.map((item, index) => {
                                    return <div className="RemarksCard">
                                        <div className="RemarksContainer" key={item.id}>
                                            <p>{item.remark}</p>
                                            <div className="updatedBy">{item.updated_by}</div>
                                            <div className="updatedDate">{new Date(item.updated_date).toLocaleString()}</div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>}
            <div>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={dialerCall} autoHideDuration={1500} onClose={disableDialerPopUp}>
                    <Alert onClose={disableDialerPopUp} severity="info">
                        Calling...
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <table className='pdfTable' id="leadDetails-table" style={{display:'none'}}>
                    <tr>
                        <td className='tableTitle'>Lead Id</td>
                        <td className='tableDescription'>{leadId}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Product Type</td>
                        <td className='tableDescription'>{loanType}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Loan Amount</td>
                        <td className='tableDescription'>{loanAmount}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Req Tenure In Years</td>
                        <td className='tableDescription'>{tenure}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Required ROI(%)</td>
                        <td className='tableDescription'>{requiredRoi}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Full Name As Pancard</td>
                        <td className='tableDescription'>{name}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Gender</td>
                        <td className='tableDescription'>{gender}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Father's Name</td>
                        <td className='tableDescription'>{fatherName}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Mother's Name</td>
                        <td className='tableDescription'>{motherName}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>DOB</td>
                        <td className='tableDescription'>{date}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>PAN No</td>
                        <td className='tableDescription'>{pancardNo}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Personal Email Id</td>
                        <td className='tableDescription'>{email}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Mobile No</td>
                        <td className='tableDescription'>{mobileNo}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Marital Status</td>
                        <td className='tableDescription'>{maritalStatus}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>No Of Dependence</td>
                        <td className='tableDescription'>{noOfDependent}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Adhaar No</td>
                        <td className='tableDescription'>{adhaarNo}</td>
                    </tr>
                </table>
                <table className='pdfTable' id="leadDetails-table1" style={{display:'none'}}>
                    <tr>
                        <td className='tableTitle'>Current Address 1</td>
                        <td className='tableDescription'>{addressOne}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Current Address 2</td>
                        <td className='tableDescription'>{addressTwo}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Current Landmark</td>
                        <td className='tableDescription'>{addressThree}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Current Pincode</td>
                        <td className='tableDescription'>{pincode}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Current City</td>
                        <td className='tableDescription'>{city}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Current State</td>
                        <td className='tableDescription'>{states}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Current Residence Type</td>
                        <td className='tableDescription'>{currentResidentType}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Current Address Vintage</td>
                        <td className='tableDescription'>{currentAddressVintage}</td>
                    </tr>
                </table>    
                <table className='pdfTable' id="leadDetails-table2" style={{display:'none'}}>
                    <tr>
                        <td className='tableTitle'>Permanent Address 1</td>
                        <td className='tableDescription'>{permanentAddressOne}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Permanent Address 2</td>
                        <td className='tableDescription'>{permanentAddressTwo}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Permanent Landmark</td>
                        <td className='tableDescription'>{permanentAddressThree}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Permanent Pincode</td>
                        <td className='tableDescription'>{permanentPincode}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Permanent City</td>
                        <td className='tableDescription'>{permanentCity}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Permanent State</td>
                        <td className='tableDescription'>{permanentStates}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Permanent Residence Type</td>
                        <td className='tableDescription'>{permanentResidentType}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Permanent Address Vintage</td>
                        <td className='tableDescription'>{permanentAddressVintage}</td>
                    </tr>
                </table>
                <table className='pdfTable' id="leadDetails-table3" style={{display:'none'}}>
                    <tr>
                        <td className='tableTitle'>Employment Type</td>
                        <td className='tableDescription'>{employmentType}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Company Name</td>
                        <td className='tableDescription'>{companyName}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Designation</td>
                        <td className='tableDescription'>{designation}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Vintage in Current Company</td>
                        <td className='tableDescription'>{currentWorkExp}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Total Work Experience</td>
                        <td className='tableDescription'>{totalWorkExp}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Gross Income</td>
                        <td className='tableDescription'>{grossIncome}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Net Monthly Income</td>
                        <td className='tableDescription'>{monthlyIncome}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Office Address 1</td>
                        <td className='tableDescription'>{officeAddress1}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Office Address 2</td>
                        <td className='tableDescription'>{officeAddress2}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Office Landmark</td>
                        <td className='tableDescription'>{officeAddress3}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Office Pincode</td>
                        <td className='tableDescription'>{officePincode}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Office City </td>
                        <td className='tableDescription'>{officeCity}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Office State </td>
                        <td className='tableDescription'>{officeStates}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Official MailId</td>
                        <td className='tableDescription'>{officialMailid}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Landline No </td>
                        <td className='tableDescription'>{landlineNo}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Mode Of Salary</td>
                        <td className='tableDescription'>{salaryCreditMode}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Salary Credit Bank Name</td>
                        <td className='tableDescription'>{salaryBankAcc}</td>
                    </tr>
                    </table>
                <table className='pdfTable' id="leadDetails-table4" style={{display:'none'}}>
                    <tr>
                        <td className='tableTitle'>Total EMI Exclude Credit Card</td>
                        <td className='tableDescription'>{currentEMI}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>No Of Credit Card</td>
                        <td className='tableDescription'>{noOfCreditCard}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Credit Card Outstanding</td>
                        <td className='tableDescription'>{creditCardOutstanding}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Credit Card Balance Transfer</td>
                        <td className='tableDescription'>{creditCardbalanceTransfer}</td>
                    </tr>
                    </table>
                <table className='pdfTable' id="leadDetails-table5" style={{display:'none'}}>
                    <tr>
                        <td className='tableTitle'>Relative's First Name</td>
                        <td className='tableDescription'>{ref1FirstName}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Relative's Last Name</td>
                        <td className='tableDescription'>{ref1LastName}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Relative's Mobile No</td>
                        <td className='tableDescription'>{ref1MobileNo}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Relative's Address 1</td>
                        <td className='tableDescription'>{ref1Address1}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Relative's Address 2</td>
                        <td className='tableDescription'>{ref1Address2}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Relative's Pincode</td>
                        <td className='tableDescription'>{ref1Pincode}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Relative's City</td>
                        <td className='tableDescription'>{ref1City}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Relative's State</td>
                        <td className='tableDescription'>{ref1States}</td>
                    </tr>
                    </table>
                    <table className='pdfTable' id="leadDetails-table6" style={{display:'none'}}>
                    <tr>
                        <td className='tableTitle'>Friend's First Name</td>
                        <td className='tableDescription'>{ref2FirstName}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Friend's Last Name</td>
                        <td className='tableDescription'>{ref2LastName}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Friend's Mobile No</td>
                        <td className='tableDescription'>{ref2MobileNo}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Friend's Address 1</td>
                        <td className='tableDescription'>{ref2Address1}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Friend's Address 2</td>
                        <td className='tableDescription'>{ref2Address2}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Friend's Pincode</td>
                        <td className='tableDescription'>{ref2Pincode}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Friend's City</td>
                        <td className='tableDescription'>{ref2City}</td>
                    </tr>
                    <tr>
                        <td className='tableTitle'>Friend's State</td>
                        <td className='tableDescription'>{ref2States}</td>
                    </tr>
                    </table>
            </div>
        </PageLayerSection>
    )
}