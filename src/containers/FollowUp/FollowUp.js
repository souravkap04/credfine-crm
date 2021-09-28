import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
import { clickToCallApi, vertageDialerApi } from '../../global/callApi'
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
    const CancelToken = axios.CancelToken;
    let history = useHistory();
    const profileData = getProfileData();
    const [leadData, setLeadData] = useState({});
    const [LeadCount, setLeadCount] = useState(0);
    const [isCalling, setIsCalling] = useState(false);
    const [isCallConnect, setIsCallConnect] = useState(false);
    const [onGoingCall, setOnGoingCall] = useState(false);
    const [isCallNotConnected, setIsCallNotConnected] = useState(false)
    const [vertageCall, setVertageCall] = useState(false);
    const [disableHangupBtn, setDisableHangupBtn] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [currentDateTime, setcurrentDateTime] = useState('');
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
                    let dateTime = d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
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
                    console.log(error)
                    if (error.message) {
                        setIsCallConnect(true);
                        setIsCalling(false);
                    }
                })
            setTimeout(() => {
                history.push(`/dashboards/followup/edit/${leadID}`)
            }, 1500)
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
            setTimeout(() => {
                history.push(`/dashboards/followup/edit/${leadID}`)
            }, 1500)
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
        // let leadPhoneNo = maskData + unMaskdata;
        // if (profileData.user_roles[0].user_type === 3) {
        //     return leadPhoneNo;
        // } else {
        //     return data;
        // }
        return data;

    }
    const disableDialerPopUp = () => {
        setVertageCall(false)
        setDisableHangupBtn(false)
    }
    return (
        <PageLayerSection>
            {/* <NoDataFound text="Coming Soon" /> */}
            <div className="followUpBtnContainer">
                {LeadCount !== 0 ? <Badge className="followbtn" max={999} badgeContent={LeadCount} color="secondary">
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
                            <TableCell className={classes.tableheading} >Name</TableCell>
                            <TableCell className={classes.tableheading} >Mobile</TableCell>
                            <TableCell className={classes.tableheading} >Loan Amt</TableCell>
                            <TableCell className={classes.tableheading}>Income</TableCell>
                            <TableCell className={classes.tableheading} >Company</TableCell>
                            <TableCell className={classes.tableheading} >Loan Type</TableCell>
                            <TableCell className={clsx(classes.tableheading, classes.statusHeading)} >Status</TableCell>
                            <TableCell className={classes.tableheading}>Follow-Up Date</TableCell>
                            <TableCell className={classes.tableheading} >Sub Status</TableCell>
                            <TableCell className={classes.tableheading} >Campaign</TableCell>
                            <TableCell className={classes.tableheading} ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? <div className="loader">
                            <CircularProgress size={100} thickness={3} />
                        </div> : LeadCount !== 0 ? (Object.keys(leadData).length !== 0 ?
                            <TableRow className={classes.oddEvenRow}>
                                <TableCell className={classes.tabledata, classes.click}
                                    onClick={() => routeChangeHAndler(leadData.lead.lead_crm_id)}
                                >{leadData.lead.lead_crm_id} </TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.name ? leadData.lead.name : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{maskPhoneNo(leadData.lead.phone_no) ? maskPhoneNo(leadData.lead.phone_no) : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.loan_amount ? leadData.lead.loan_amount : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.data['monthly_income'] ? leadData.lead.data['monthly_income'] : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.data['current_company_name'] ? leadData.lead.data['current_company_name'] : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.loan_type ? leadData.lead.loan_type : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>
                                    <div className={classes.loanTypeButton}>
                                        <div className={classes.loanButtonText}>{leadData.lead.status}</div>
                                    </div>
                                </TableCell>
                                <TableCell className={classes.tabledata}>{currentDateTime ? currentDateTime : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.sub_status ? leadData.lead.sub_status : 'NA'}</TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.campaign_category ? leadData.lead.campaign_category : 'NA'}</TableCell>
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
                            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={vertageCall} autoHideDuration={3000} onClose={disableDialerPopUp}>
                                <Alert onClose={disableDialerPopUp} severity="info">
                                    Calling...
                                </Alert>
                            </Snackbar>
                        </div>
                    </TableBody>
                </Table>
            </TableContainer>
        </PageLayerSection>
    )
}