import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import axios from 'axios';
import baseUrl from '../../global/api';
import { haloocomNoidaDialerApi, haloocomMumbaiDialerApi, cloudDialerApi } from '../../global/callApi'
import { getProfileData } from '../../global/leadsGlobalData';
import CallerDialogBox from '../Leads/CallerDialog/CallerDialogBox';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import clsx from 'clsx';
import './followup.css';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
// import NoDataFound from '../NoDataFound/NoDataFound';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
    container: {
        // margin: '25px'
    },
    table: {
        width: '100%',
    },
    tableheading: {
        backgroundColor: '#8f9bb3',
        color: '#ffffff',
        fontSize: '14px'
    },
    statusHeading: {
        textAlign: 'center'
    },
    checkboxFix: {
        color: '#ffffff'
    },
    tabledata: {
        fontSize: '12px'
    },
    emptydata: {
        position: 'relative',
        left: '35vw',
        fontSize: '15px',
        whiteSpace: 'nowrap'
    },
    click: {
        cursor: 'pointer',
        color: 'blue'
    },
    callButton: {
        backgroundColor: '#14cc9e',
        padding: '9px',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.4)'
        }
    },
    callIcon: {
        color: '#ffffff',
        fontSize: '17px'
    },
    callingBtn: {
        margin: '20px'
    },
    oddEvenRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f7f9fc',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#fff',
        },
    },
    loanTypeButton: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: 'auto',
        height: 'auto',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '5px',
        paddingRight: '5px',
        borderRadius: '35px',
        backgroundColor: '#3ec68c'
    },
    loanButtonText: {
        fontSize: '0.8vw',
        textAlign: 'center',
        color: '#fff',
        // width: '75px',
        whiteSpace: 'nowrap',
        wordBreak: 'break-word'
    }
});
export default function FollowUp(props) {
    const classes = useStyles();
    let history = useHistory();
    const profileData = getProfileData();
    const [leadData, setLeadData] = useState({});
    const [LeadCount, setLeadCount] = useState(0);
    const [isCalling, setIsCalling] = useState(false);
    const [isCallConnect, setIsCallConnect] = useState(false);
    const [onGoingCall, setOnGoingCall] = useState(false);
    const [isCallNotConnected, setIsCallNotConnected] = useState(false)
    const [dialerCall, setDialerCall] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [currentDateTime, setcurrentDateTime] = useState('');
    const [isAutoDialerStart, setIsAutoDialerStart] = useState(false);
    const [openCalculate, setopenCalculate] = useState(false);
    const [checkEligibility, setCheckEligibility] = useState(false);
    const [isError, setIsError] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const fetchLeadsData = async () => {
        setisLoading(true);
        const headers = {
            'Authorization': `Token ${profileData.token}`,
            'userRoleHash': profileData.user_roles[0].user_role_hash,
        };
        await axios.get(`${baseUrl}/leads/fetchOpenLead/`, { headers })
            .then((response) => {
                if (response.data.total_followup === 0) {
                    setisLoading(false);
                } else if (response.data.total_followup > 0 && response.data.data === undefined) {
                    setLeadCount(response.data.total_followup)
                    setisLoading(false);
                } else {
                    let data = response.data.data.callback_time;
                    let d = new Date(data * 1000)
                    let dateTime = d.toLocaleDateString() + ' ' + moment(d.toLocaleTimeString(), "HH:mm:ss").format("hh:mm A")
                    setcurrentDateTime(dateTime)
                    setLeadCount(response.data.total_followup)
                    setLeadData(response.data.data);
                    setisLoading(false);
                }
            }).catch((error) => {
                console.log(error);
            })
    };
    useEffect(() => {
        fetchLeadsData();
    }, [])
    const routeChangeHAndler = (leadId) => {
        history.push(`/dashboards/followup/edit/${leadId}`);
    };
    const clickToCall = async (customerNo, leadID) => {
        if (profileData.dialer === 'HALOOCOM-Noida') {
            await axios.post(`${haloocomNoidaDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`)
                .then((response) => {
                    setDialerCall(true);
                    if (response.status === 200) {
                        localStorage.setItem('callHangUp', true)
                    }
                }).catch((error) => {
                    console.log(error);
                })
            setTimeout(() => {
                history.push(`/dashboards/followup/edit/${leadID}`)
            }, 1500)
        } else if (profileData.dialer === 'HALOOCOM-Mumbai') {
            await axios.post(`${haloocomMumbaiDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`)
                .then((response) => {
                    setDialerCall(true);
                    if (response.status === 200) {
                        localStorage.setItem('callHangUp', true)
                    }
                }).catch((error) => {
                    console.log(error);
                })
            setTimeout(() => {
                history.push(`/dashboards/followup/edit/${leadID}`)
            }, 1500)
        } else if (profileData.dialer === "CLOUD-DIALER") {
            await axios.post(`${cloudDialerApi}/callingApis/clicktoDial?agenTptId=8420878985&customerNumber=8420878985&tokenId=ea46f37d402454d2f47e9d8171fd5d5d`)
                .then((response) => {
                    setDialerCall(true);
                    if (response.status === 200) {
                        if (response.data.LOG === 'ERROR') {
                            setAlertMessage(response.data.OUTPUT);
                            setIsError(true);
                        } else if (response.data.LOG === 'SUCCESS') {
                            setDialerCall(true);
                            localStorage.setItem('callRefId', response.data.JSON_INFO)
                            localStorage.setItem('callHangUp', true)
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            setTimeout(() => {
                history.push(`/dashboards/followup/edit/${leadID}`)
            }, 1500);
        }
    }
    const disablePopup = () => {
        setIsCalling(false);
        setOnGoingCall(false);
    }
    const callConnectHandler = () => {
        setIsCallConnect(false);
        setIsCallNotConnected(false)
    }
    const maskPhoneNo = (phoneNo) => {
        let data = phoneNo;
        let unMaskdata = data.slice(-4);
        let maskData = '';
        for (let i = (data.length) - 4; i > 0; i--) {
            maskData += 'x';
        }
        let leadPhoneNo = maskData + unMaskdata;
        if (profileData.user_roles[0].user_type === 2 || profileData.user_roles[0].user_type === 3 || profileData.user_roles[0].user_type === 5 || profileData.user_roles[0].user_type === 6) {
            return leadPhoneNo;
        } else {
            return data;
        }
    }
    const dateFormatHandler = (date) => {
        let changeDateFormat = new Date(date);
        let dateFormat = changeDateFormat.toLocaleDateString() + " " +
            moment(changeDateFormat.toLocaleTimeString(), "HH:mm:ss a").format(
                "hh:mm A"
            );
        return dateFormat;
    }
    const disableDialerPopUp = () => {
        setDialerCall(false)
        setIsAutoDialerStart(false);
        setIsError(false)
    }
    const autoDialerHandler = () => {
        localStorage.setItem("auto_dialer", true);
        setIsAutoDialerStart(true);
        clickToCall(leadData.lead.phone_no, leadData.lead.lead_crm_id);
    };
    useEffect(() => {
        if (localStorage.getItem("auto_dialer") && Object.keys(leadData).length !== 0) {
            clickToCall(leadData.lead.phone_no, leadData.lead.lead_crm_id)
        }
    }, [leadData]);

    const openEligibility = () => {
        setCheckEligibility(true);
    }
    const closeEligibility = () => {
        setCheckEligibility(false);
    }
    const openCalculator = () => {
        setopenCalculate(true);
    }
    const closeCalculator = () => {
        setopenCalculate(false);
    }
    return (
        <PageLayerSection isDisplaySearchBar={false} ActualEmiCalculate={openCalculator} ActualEligibilityCalculate={openEligibility}>
            <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility} />
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            {/* <NoDataFound text="Coming Soon" /> */}
            <div className="followUpBtnContainer">
                <Button
                    className="followUpAutoDialerStartBtn"
                    color="primary"
                    variant="contained"
                    onClick={() => autoDialerHandler()}
                >
                    Start</Button>
                {LeadCount !== 0 ? <Badge className="followbtn" max={5000} badgeContent={LeadCount} color="secondary">
                    <Button variant="contained">Follow Up</Button>
                </Badge> : ''}
                {/* <Badge className="followbtn" badgeContent={4} color="secondary">
                    <Button variant="contained">Laps</Button>
                </Badge> */}
            </div>
            <TableContainer className={classes.container}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableheading}>
                        <TableRow>
                            <TableCell className={classes.tableheading}>Lead ID</TableCell>
                            <TableCell className={classes.tableheading} >First Name</TableCell>
                            <TableCell className={classes.tableheading} >Last Name</TableCell>
                            <TableCell className={classes.tableheading} >Mobile</TableCell>
                            <TableCell className={classes.tableheading} >Loan Amt</TableCell>
                            <TableCell className={classes.tableheading} >Company</TableCell>
                            <TableCell className={classes.tableheading} >Campaign</TableCell>
                            <TableCell className={classes.tableheading}>Created Date</TableCell>
                            <TableCell className={classes.tableheading}>Updated Date</TableCell>
                            <TableCell className={classes.tableheading}>Follow-Up Date</TableCell>
                            <TableCell className={clsx(classes.tableheading, classes.statusHeading)} >Status</TableCell>
                            <TableCell className={classes.tableheading} >Sub Status</TableCell>
                            <TableCell className={classes.tableheading} >Lead Agent Name</TableCell>
                            <TableCell className={classes.tableheading} ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? <div className="loader">
                            <CircularProgress size={100} thickness={3} />
                        </div> : LeadCount !== 0 ? (Object.keys(leadData).length !== 0 ?
                            <TableRow className={classes.oddEvenRow}>
                                <TableCell className={clsx(classes.tabledata, classes.click)}
                                    onClick={() => routeChangeHAndler(leadData.lead.lead_crm_id)}
                                >{leadData.lead.lead_crm_id} </TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.first_name ? leadData.lead.first_name : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.last_name ? leadData.lead.last_name : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{maskPhoneNo(leadData.lead.phone_no) ? maskPhoneNo(leadData.lead.phone_no) : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.loan_amount ? leadData.lead.loan_amount : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.data['current_company_name'] ? leadData.lead.data['current_company_name'] : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.campaign_category ? leadData.lead.campaign_category : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{dateFormatHandler(leadData.lead.created_date) ? dateFormatHandler(leadData.lead.created_date) : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{dateFormatHandler(leadData.lead.updated_date) ? dateFormatHandler(leadData.lead.updated_date) : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{currentDateTime ? currentDateTime : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>
                                    <div className={classes.loanTypeButton}>
                                        <div className={classes.loanButtonText}>{leadData.lead.status}</div>
                                    </div>
                                </TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.sub_status ? leadData.lead.sub_status : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.lead_agent_name ? leadData.lead.lead_agent_name : 'NA'}</TableCell>
                                <TableCell>
                                    <Tooltip title="Call Customer">
                                        <IconButton className={classes.callButton} onClick={() => clickToCall(leadData.lead.phone_no, leadData.lead.lead_crm_id)}>
                                            <CallIcon className={classes.callIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                            : <span className={classes.emptydata}> Follow up after some time </span>) : <span className={classes.emptydata}> No Data Found </span>
                        }
                        <div>
                            <CallerDialogBox
                                onGoingCall={onGoingCall}
                                isCalling={isCalling}
                                isCallConnect={isCallConnect}
                                isCallNotConnected={isCallNotConnected}
                                callConnectHandler={callConnectHandler}
                                disablePopup={disablePopup}
                            />
                        </div>
                        <div>
                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={dialerCall} autoHideDuration={3000} onClose={disableDialerPopUp}>
                                <Alert onClose={disableDialerPopUp} severity="info">
                                    Calling...
                                </Alert>
                            </Snackbar>
                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={isAutoDialerStart} autoHideDuration={3000} onClose={disableDialerPopUp}>
                                <Alert onClose={disableDialerPopUp} severity="info">
                                    Auto dial mode is on
                                </Alert>
                            </Snackbar>
                            <Snackbar
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                open={isError}
                                autoHideDuration={1500}
                                onClose={disableDialerPopUp}
                            >
                                <Alert onClose={disableDialerPopUp} severity="error">
                                    {alertMessage}
                                </Alert>
                            </Snackbar>
                        </div>
                    </TableBody>
                </Table>
            </TableContainer>
        </PageLayerSection>
    )
}