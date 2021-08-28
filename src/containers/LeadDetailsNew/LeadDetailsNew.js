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
// import Autocomplete from '@material-ui/lab/Autocomplete';
import { ListGroup } from 'react-bootstrap';
import {
    getBank,
    getResidentType,
    getSalaryModeType,
    getProfileData,
    getStatusData
} from "../../global/leadsGlobalData";
import { useParams, useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
    circleTick: {
        opacity: '0.4'
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
            setIsDisplay(false);
            let headers = {
                'Authorization': `Token ${profileData.token}`,
            };
            await axios
                .get(`${baseUrl}/leads/lead_remark/${id}`, { headers })
                .then((response) => {
                    setRemarks(response.data.remarks);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchRemarks(leadid);
    }, [loadingRemarks]);
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
        let regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(eligibility_data.pan_no);
        if (eligibility_data.pan_no !== '' && !regex) {
            setAlertMessage('Inavlid PAN Number')
            setIsLeadError(true);
            return;
        }
        let items = { lead_data, eligibility_data };
        let headers = { 'Authorization': `Token ${profileData.token}` }
        await axios.put(`${baseUrl}/leads/lead_detail/${id}`, items, { headers })
            .then((response) => {
                if (response.status === 200) {
                    setIsLeadDetails(true);
                }
                setIsEditable(false);
            }).catch((error) => {
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
        let items = { status: status, sub_status: subStatus }
        let headers = { 'Authorization': `Token ${profileData.token}` }
        if (status !== '' && subStatus.length > 0) {
            await axios.put(`${baseUrl}/leads/lead_status/${id}`, items, { headers })
                .then((response) => {
                    // setAlertMessage(response.data['data'])
                    if (response.status === 200) {
                        setIsStatus(true)
                    }
                    setTimeout(() => {
                        history.push('/dashboards/leads')
                    }, 1500)
                }).catch((error) => {
                    setIsLeadError(true)
                })
        }
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
    const disableHangUpSnacks = () => {
        sethangUpSnacks(false);
        setIsLeadError(false);
        setIsLeadDetails(false);
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
        <PageLayerSection pageTitle="Lead Details">
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
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isLeadDetails} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Lead Data Successfully Updated
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isLeadError} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="error">
                    Something Wrong
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
            <Grid container justifyContent="flex-start">
                <Grid className="accordianContainer" lg={9}>
                    <Accordion square defaultExpanded={true} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1d-content" id="panel1d-header">
                            <Typography className={classes.headerText}>Personal Details</Typography>
                            <CheckCircleIcon className={classes.circleTick} />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                            >
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
                                        onChange={(e) => setLoanAmount(e.target.value)}
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
                                    <Button onChange={handleChange('panel2')} className="saveAndNextBtn" color='primary' variant='contained'>SAVE &amp; NEXT</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel2d-content" id="panel2d-header">
                            <Typography className={classes.headerText}>Current Residential Details</Typography>
                            <CheckCircleIcon className={classes.circleTick} />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="row"
                                justifyContent="center">
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
                                        helperText="Current Residence"
                                        variant="outlined"
                                        size="small"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        select
                                        label="City"
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
                                    >
                                        <option key="" value="">
                                            Select
                                        </option>
                                    </TextField>
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        select
                                        label="State"
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
                                    >
                                        <option key="" value="">
                                            Select
                                        </option>
                                    </TextField>
                                </Grid>
                                <Grid container direction="row"
                                    justifyContent="space-between"
                                    alignItems="center" >
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
                                        <Button className="saveAndNextBtn" color='primary' variant='contained'>SAVE &amp; NEXT</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel3'} onChange={handleChange('panel3')} aria-controls="panel3d-content" id="panel3d-header">
                            <Typography className={classes.headerText}>Employment &amp; Income Details</Typography>
                            <CheckCircleIcon className={classes.circleTick} />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="row" justifyContent="center">
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
                                    >
                                        <option key="" value="">
                                            Select
                                        </option>
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
                                    {/* <Autocomplete
                                        id="combo-box-demo"
                                        options={searchCompany}
                                        getOptionSelected={(option, value) => option.name === value.name}
                                        getOptionLabel={(option) => selectCompany(option.name)}
                                        style={{ width: 300 }}
                                        renderInput={(params) => }
                                    /> */}
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
                                        label="Vintage in Current Company"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={currentWorkExp}
                                        onChange={(e) => setCurrentWorkExp(e.target.value)}
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Total Work Experience"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={totalWorkExp}
                                        onChange={(e) => setTotalWorkExp(e.target.value)}
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
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value={monthlyIncome}
                                        onChange={(e) => setMonthlyIncome(e.target.value)}
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
                            <CheckCircleIcon className={classes.circleTick} />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="row" justifyContent="center">
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
                                        onChange={(e) => setCurrentEMI(e.target.value)}
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
                                        value={creditCardOutstanding}
                                        onChange={(e) => setCreditCardOutstanding(e.target.value)}
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
                                    >
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </TextField>
                                </Grid>
                                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                                    <Grid lg={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className="saveAndNextBtn" color='primary' variant='contained'>SAVE</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Grid className="completeJourneyContainer">
                        <Button
                            className="journeyBtn"
                            color="primary"
                            variant="contained">
                            COMPLETE JOURNEY
                        </Button>
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
                    <Grid container justifyContent="center">
                        {profileData.dialer === 'TATA' ? null : <React.Fragment><Button
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
                            </Button></React.Fragment>}
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
                        <Grid>
                            <TextField
                                className="textField"
                                id="outlined-full-width"
                                type="datetime-local"
                                label="Follow-up Date"
                                defaultValue="2017-05-24T10:30"
                                style={{ margin: 8 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                InputAdornmentProps={{ position: 'start' }}
                            />
                        </Grid>
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
                            />
                        </Grid>
                        <Grid container justifyContent="center">
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
                                >
                                    <option key="" value="">
                                        Select
                                    </option>
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
                                >
                                    <option key="" value="">
                                        Select
                                    </option>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className="addRemarkContainer">
                        <Grid container justifyContent="center">
                            <h4>Add Remarks</h4>
                            <div className="remarks">
                                <textarea rows="4" cols="4" placeholder="Add remarks here..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        return remarksHandler(event, leadid)
                                    }
                                }} />
                                <SendIcon onClick={(event) => remarksHandler(event, leadid)} className="remarkSend" style={{ color: '#14cc9e' }} />
                            </div>
                        </Grid>
                    </div>
                    <Grid container justifyContent="center">
                        <Button className="submitBtn" color='primary' variant='contained' onClick={() => statusUpdateHandler(leadid)} disabled={localStorage.getItem("callHangUp") && localStorage.getItem("callHangUp") !== null ? submitFalse : false}>Submit</Button>
                    </Grid>
                    <div className="allremarksContainer">
                        <h4>All Remarks <span>{leadid}</span></h4>
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
            </Grid>
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