import React, { useState, useEffect } from 'react';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import './leadDetailsNew.css';
import axios from "axios";
import baseUrl from "../../global/api";
import { clickToCallApi, vertageDialerApi } from "../../global/callApi";
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
import { ListGroup } from 'react-bootstrap';
import {
    getBank,
    getResidentType,
    getSalaryModeType,
    getProfileData,
    getStatusData
} from "../../global/leadsGlobalData";
import { useParams, useHistory, useLocation, NavLink } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
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
        height: '19.45vw',
        alignItems: 'flex-start'
    },
}))(MuiAccordionDetails);
export default function LeadDetailsNew(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
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
    const [vertageCall, setVertageCall] = useState(false);
    const [colorTick, setcolorTick] = useState(false);
    const [colorTick2, setcolorTick2] = useState(false);
    const [colorTick3, setcolorTick3] = useState(false);
    const [colorTick4, setcolorTick4] = useState(false);
    const [appID, setappID] = useState('');
    const [bankNBFC, setbankNBFC] = useState('');
    const [scheme, setscheme] = useState('');
    const [followUpDate, setfollowUpDate] = useState('');
    const [followUpDateError, setfollowUpDateError] = useState([false]);
    const [isLoading, setisLoading] = useState(false);
    const [isCopy, setisCopy] = useState(false);
    const [disbursedDate, setdisbursedDate] = useState(new Date());
    const [Roi, setRoi] = useState('');
    const [disbursedError, setdisbursedError] = useState([false, false]);
    const [colorRed, setcolorRed] = useState([false, false, false, false]);
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
                        setappID(response.data.lead_extra_details.app_id);
                        setbankNBFC(response.data.lead_extra_details.bank);
                        setscheme(response.data.lead_extra_details.scheme);
                        setdisbursedDate(response.data.lead_extra_details.disbursed_date)
                        setRoi(response.data.lead_extra_details.roi)
                        setisLoading(false)
                        if (response.data.lead_data.lead_crm_id !== '' && response.data.lead_data.loan_type !== '' && response.data.lead_data.loan_amount !== '' && response.data.lead_data.name !== '' && response.data.lead_data["data"].dob !== '' && response.data.eligibility_data.pan_no !== '' && response.data.eligibility_data.email_id !== '' && response.data.lead_data.phone_no !== '') {
                            setcolorTick(true)
                        }
                        if (response.data.lead_data["data"].residential_pincode !== '' && response.data.lead_data["data"].city !== '' && response.data.lead_data["data"].state !== '' && response.data.eligibility_data.residence_type !== '') {
                            setcolorTick2(true)
                        }
                        if (response.data.lead_data["data"].employment_type !== '' && response.data.lead_data["data"].current_company_name !== '' && response.data.eligibility_data.designation !== '' && response.data.eligibility_data.current_work_exp !== '' && response.data.eligibility_data.total_work_exp !== '' && response.data.lead_data["data"].monthly_income !== '' && response.data.eligibility_data.salary_mode !== '' && response.data.eligibility_data.salary_bank !== '') {
                            setcolorTick3(true)
                        }
                        if (response.data.eligibility_data.current_emi !== '' && response.data.eligibility_data.credit_card_outstanding !== '' && response.data.lead_data["data"].credi_card_balance_transfer !== '') {
                            setcolorTick4(true)
                        }
                    });
            } catch (error) {
                console.log(error);
            }
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
            if (leadId !== '' && loanType !== '' && loanAmount !== '' && name !== '' && date !== '' && pancardNo !== '' && email !== '' && mobileNo !== '') {
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
            if (pincode !== '' && city !== '' && states !== '' && currentResidentType !== '') {
                colorRed[1] = false;
                setcolorTick2(true)
            } else {
                setcolorTick2(false)
            }
            setExpanded('panel3')
        }
        if (expanded === 'panel3') {
            if (employmentType !== '' && companyName !== '' && designation !== '' && currentWorkExp !== '' && totalWorkExp !== '' && monthlyIncome !== '' && salaryCreditMode !== '' && salaryBankAcc !== '') {
                colorRed[2] = false;
                setcolorTick3(true)
            } else {
                setcolorTick3(false)
            }
            setExpanded('panel4')

        }
        if (expanded === 'panel4') {
            if (currentEMI !== '' && creditCardOutstanding !== '' && creditCardbalanceTransfer !== '') {
                colorRed[3] = false;
                setcolorTick4(true)
            } else {
                setcolorTick4(false)
            }
            setExpanded('panel1')
        }
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
            if (date === '') colorRedError[0] = true;
            if (pancardNo === '') colorRedError[0] = true;
            if (email === '') colorRedError[0] = true;
            if (date === '' || pancardNo === '' || email === '') {
                setcolorRed(colorRedError)
                return;
            }
            if (pincode === '') colorRedError[1] = true;
            if (city === '') colorRedError[1] = true;
            if (states === '') colorRedError[1] = true;
            if (currentResidentType === '') colorRedError[1] = true;
            if (pincode === '' || city === '' || states === '' || currentResidentType === '') {
                setcolorRed(colorRedError)
                return;
            }
            if (employmentType === '') colorRedError[2] = true;
            if (companyName === '') colorRedError[2] = true;
            if (designation === '') colorRedError[2] = true;
            if (currentWorkExp === '') colorRedError[2] = true;
            if (totalWorkExp === '') colorRedError[2] = true;
            if (monthlyIncome === '') colorRedError[2] = true;
            if (salaryCreditMode === '') colorRedError[2] = true;
            if (salaryBankAcc === '') colorRedError[2] = true;
            if (employmentType === '' || companyName === '' || designation === '' || currentWorkExp === '' || totalWorkExp === '' || monthlyIncome === '' || salaryCreditMode === '' || salaryBankAcc === '') {
                setcolorRed(colorRedError)
                return;
            }
            if (currentEMI === '') colorRedError[3] = true;
            if (creditCardOutstanding === '') colorRedError[3] = true;
            if (creditCardbalanceTransfer === '') colorRedError[3] = true;
            if (currentEMI === '' || creditCardOutstanding === '' || creditCardbalanceTransfer === '') {
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
    }
    const clickToCall = async (customerNo, leadID) => {
        if (profileData.dialer === 'TATA') {
            const headers = {
                'accept': 'application/json',
                'content-type': 'application/json'
            };
            const item = { customer_number: customerNo, api_key: profileData.dialer_pass };
            axios.interceptors.request.use((request) => {
                setIsCalling(true);
                return request;
            })
            await axios.post(clickToCallApi, item, { headers })
                .then((response) => {
                    if (response.data.success) {
                        setIsCalling(false);
                        setOnGoingCall(true);
                    } else {
                        setIsCallNotConnected(true)
                    }
                }).catch((error) => {
                    if (error.message) {
                        setIsCallConnect(true);
                        setIsCalling(false);
                    }
                })
        } else if (profileData.dialer === 'VERTAGE') {
            await axios.post(`${vertageDialerApi}&user=${profileData.vertage_id}&pass=${profileData.vertage_pass}&agent_user=${profileData.vertage_id}&function=external_dial&value=${customerNo}&phone_code=+91&search=YES&preview=NO&focus=YES`)
                .then((response) => {
                    setVertageCall(true);
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
                sethangUpSnacks(true);
                setCallHangUpState(true);
            }).catch((error) => {
                console.log(error);
            })
    }
    const disableDialerPopUp = () => {
        setVertageCall(false)
        setDisableHangupBtn(false)
    }
    return (
        <PageLayerSection pageTitle="Lead Details" className={classes.scrollEnable} offerButton={true}>
            {/* Errors SnackBars Start */}
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={hangUpSnacks} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Hang Up Successfully...
                </Alert>
            </Snackbar>
            {profileData.dialer === 'VERTAGE' ? <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={localStorage.getItem("callHangUp") && localStorage.getItem("callHangUp") !== null ? true : callInProgress} autoHideDuration={1500} onClose={disableHangUpSnacks}>
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
                            <Typography className={classes.headerText}>Personal Details</Typography>
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
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
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
                                        className="textField fullName"
                                        id="outlined-full-width"
                                        label="Full Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
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
                                        type="date"
                                        className="textField"
                                        placeholder="DD / MM / YYYY"
                                        id="outlined-full-width"
                                        label="Date of Birth"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
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
                                        }}
                                        // helperText="Invalid PAN"
                                        variant="outlined"
                                        size="small"
                                        maxLength="10"
                                        value={pancardNo}
                                        onChange={(e) => setPancardNo(e.target.value.toUpperCase())}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Email ID"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
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
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={maskPhoneNo(mobileNo)}
                                        disabled
                                    />
                                </Grid>
                                <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button onClick={() => updateLeadDetails(leadid)} className="saveAndNextBtn" color='primary' variant='contained'>SAVE &amp; NEXT</Button>
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
                                        label="Pincode"
                                        style={{ margin: 8 }}
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
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE &amp; NEXT</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel3'} onChange={handleChange('panel3')} aria-controls="panel3d-content" id="panel3d-header">
                            <Typography className={classes.headerText}>Employment &amp; Income Details</Typography>
                            {colorRed[2] ? <CheckCircleIcon className={colorRed[2] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick3 ? classes.activeColorTick : classes.circleTick} />}
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
                                        label="Net Monthly Income"
                                        style={{ margin: 8 }}
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
                    <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel4'} onChange={handleChange('panel4')} aria-controls="panel4d-content" id="panel4-header">
                            <Typography className={classes.headerText}>Obligation Details</Typography>
                            {colorRed[3] ? <CheckCircleIcon className={colorRed[3] ? classes.activeColorTickRed : classes.circleTick} /> : <CheckCircleIcon className={colorTick4 ? classes.activeColorTick : classes.circleTick} />}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Total EMI"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
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
                                <Grid container style={{ flexDirection: 'row', justifyContent: "flex-end", alignItems: "center" }}>
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained' onClick={() => updateLeadDetails(leadid)}>SAVE</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Grid className="completeJourneyContainer">
                        <NavLink to={`/dashboards/PersonalLoanForm/${leadid}`} target="_blank">
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
                        {profileData.dialer === 'TATA' ? null : <div className="buttonAdjust"><Button
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
                            </Button></div>}
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
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={vertageCall} autoHideDuration={1500} onClose={disableDialerPopUp}>
                    <Alert onClose={disableDialerPopUp} severity="info">
                        Calling...
                    </Alert>
                </Snackbar>
            </div>
        </PageLayerSection>
    )
}