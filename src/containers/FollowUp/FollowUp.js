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
import { haloocomNoidaDialerApi, haloocomMumbaiDialerApi } from '../../global/callApi'
import { getCampaign, getProfileData, getStatusData, } from '../../global/leadsGlobalData';
import CallerDialogBox from '../Leads/CallerDialog/CallerDialogBox';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import clsx from 'clsx';
import './followup.css';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, TextField } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
import filter from "../../images/filter.png";
import { Drawer } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { ListGroup } from 'react-bootstrap';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
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
    },
    numberOfTotalCount: {
        marginRight: '25px'
    },
});
export default function FollowUp(props) {
    const classes = useStyles();
    let history = useHistory();
    const profileData = getProfileData();
    const campaignData = getCampaign();
    const statusData = getStatusData();
    const [leadData, setLeadData] = useState({});
    const [LeadCount, setLeadCount] = useState(0);
    const [isCalling, setIsCalling] = useState(false);
    const [isCallConnect, setIsCallConnect] = useState(false);
    const [onGoingCall, setOnGoingCall] = useState(false);
    const [isCallNotConnected, setIsCallNotConnected] = useState(false)
    const [dialerCall, setDialerCall] = useState(false);
    const [disableHangupBtn, setDisableHangupBtn] = useState(true);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [totalDataPerPage, settotalDataPerPage] = useState(0);
    const [isLoading, setisLoading] = useState(false);
    const [currentDateTime, setcurrentDateTime] = useState('');
    const [isAutoDialerStart, setIsAutoDialerStart] = useState(false);
    const [openCalculate, setopenCalculate] = useState(false);
    const [checkEligibility, setCheckEligibility] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);
    const [status, setStatus] = useState("");
    const [subStatus, setSubStatus] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersId, setUserID] = useState("");
    const [showAROList, setShowAROList] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [totalLeads, setTotalLeads] = useState(null);
    const [leadsAssignTo, setLeadsAssignTo] = useState('');
    const [selectedLeads, setSelectedLeads] = useState([]);
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
        listOfUsers();
    }, [])
    const routeChangeHAndler = (leadId) => {
        history.push(`/dashboards/followup/edit/${leadId}`);
    };
    const listOfUsers = async () => {
        const headers = {
            Authorization: `Token ${profileData.token}`,
        };
        await axios
            .get(`${baseUrl}/user/childUsers/`, { headers })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
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
            setTimeout(() => {
                history.push(`/dashboards/followup/edit/${leadID}`)
            }, 1500)
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
    const removeDuplicateStatus = (data) => {
        let unique = [];
        data.forEach((element) => {
            if (!unique.includes(element.status)) {
                unique.push(element.status);
            }
        });
        return unique;
    };
    const uniqueStatus = removeDuplicateStatus(statusData);
    const subStatusHandler = () => {
        let subStatusoptions = [];
        statusData.forEach((item, index) => {
            if (item.status === status) {
                subStatusoptions.push(item.sub_status);
            }
        });
        return subStatusoptions;
    };
    const options = subStatusHandler();
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
        setDisableHangupBtn(false)
        setIsAutoDialerStart(false);
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
    const openDrawer = () => {
        setIsDrawer(true)
    }
    const closeDrawer = () => {
        setIsDrawer(false)
    }
    const closeListGroupHandler = () => {
        setShowAROList(false);
        setSearchInput('');
    }
    const getAssignedAgent = (agentName) => {
        setLeadsAssignTo(agentName);
    }
    const toggleAROHandler = () => {
        setShowAROList(true);
    }

    return (
        <PageLayerSection isDisplaySearchBar={false} ActualEmiCalculate={openCalculator} ActualEligibilityCalculate={openEligibility}>
            <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility} />
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            <div className='mainContainer'>
                <h3>FollowUp Leads({LeadCount})</h3>
                <div className='btnContainer'>
                    <Button
                        className="followUpAutoDialerStartBtn"
                        color="primary"
                        variant="contained"
                        onClick={() => autoDialerHandler()}
                    >
                        Start</Button>
                    <div className="filterBtnContainer" onClick={openDrawer}>
                        <div className="filterImage">
                            <img src={filter} alt="" />
                        </div>
                        <div className="filterText">FILTER</div>
                    </div>
                    {/* {LeadCount !== 0 ? <Badge className="followbtn" max={5000} badgeContent={LeadCount} color="secondary">
                        <Button variant="contained">Follow Up</Button>
                    </Badge> : ''} */}
                    {/* <Badge className="followbtn" badgeContent={4} color="secondary">
                    <Button variant="contained">Laps</Button>
                </Badge> */}
                </div>
            </div>
            <Drawer anchor='right' open={isDrawer} onClose={closeDrawer}>
                <div className='rightSideContainer'>
                    <form>
                        <Grid container justifyContent="flex-start">
                            <h4>Search Here</h4>
                        </Grid>
                        <Grid>
                            <TextField
                                className='textField'
                                type="date"
                                id="outlined-full-width"
                                label="From"
                                style={{ margin: 8 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small" />
                        </Grid>
                        <Grid>
                            <TextField
                                className='textField'
                                type="date"
                                id="outlined-full-width"
                                label="To"
                                style={{ margin: 8 }}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small" />
                        </Grid>
                        <Grid container style={{ justifyContent: "center" }}>
                            <Grid>
                                <TextField
                                    select
                                    className="textField2"
                                    id="outlined-full-width"
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
                                    <option value="">Select</option>
                                    {uniqueStatus.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid>
                                <TextField
                                    className="textField2"
                                    select
                                    id="outlined-full-width"
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
                                    onChange={(e) => {
                                        setSubStatus(e.target.value);
                                    }}
                                >
                                    <option value="">Select</option>
                                    {options.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid>
                            <TextField
                                className="textField"
                                select
                                id="outlined-full-width"
                                label="Select Campaign"
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
                                <option value="">Select</option>
                                {campaignData.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid>
                            <TextField
                                select
                                className="textField"
                                id="outlined-full-width"
                                label="Users"
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
                                value={usersId}
                                onChange={(e) => setUserID(e.target.value)}
                            >
                                <option value="">Select User</option>
                                {users.map((item) => {
                                    return (
                                        <option value={item.myuser.username}>
                                            {item.myuser.username}
                                        </option>
                                    );
                                })}
                            </TextField>
                        </Grid>
                        <Grid>
                            <Button
                                className='submitBtn'
                                type='submit'
                                color='primary'
                                variant='contained'>
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Drawer>
            <TableContainer className={classes.container}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableheading}>
                        <TableRow>
                            <TableCell className={classes.tableheading}><Checkbox /></TableCell>
                            <TableCell className={classes.tableheading}>Lead ID</TableCell>
                            <TableCell className={classes.tableheading} >Name</TableCell>
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
                                <TableCell className={classes.tabledata}><Checkbox /></TableCell>
                                <TableCell className={clsx(classes.tabledata, classes.click)}
                                    onClick={() => routeChangeHAndler(leadData.lead.lead_crm_id)}
                                >{leadData.lead.lead_crm_id} </TableCell>
                                <TableCell className={classes.tabledata}>{leadData.lead.name ? leadData.lead.name : 'NA'}</TableCell>
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
                        </div>
                    </TableBody>
                </Table>
            </TableContainer>
            {isLoading ? '' :
                <div className="paginationContainer">
                    <form className="assignToContainer">
                        {showAROList && <ListGroup className="listGroup">
                            <CancelRoundedIcon className="closeListGroup" onClick={closeListGroupHandler} />
                            <div className="searchMainContainer">
                                <div className="searchContainer">
                                    <InputBase
                                        className="inputContainer"
                                        inputProps={{ "aria-label": "search" }}
                                        value={searchInput}
                                        onChange={(e) => setSearchInput((e.target.value).toLowerCase().trim())}
                                    />
                                    <div className="searchIconContainer">
                                        <SearchIcon className="searchIcon" />
                                    </div>
                                </div>
                            </div>
                            <div className="listItemContainer">
                                {
                                    users.filter((data) => {
                                        if (searchInput === "") {
                                            return users;
                                        } else if (data.myuser.username.toLowerCase().includes(searchInput.toLowerCase())) {
                                            return users;
                                        }
                                    }).map((item) => (
                                        <ListGroup.Item className={leadsAssignTo === item.myuser.username && "activeListItem"} onClick={() => getAssignedAgent(item.myuser.username)}
                                        >{item.myuser.username}</ListGroup.Item>
                                    ))}
                            </div>
                            <Button
                                className="assignLeadsBtn"
                                variant="contained"
                                color="primary"
                            >
                                Assign
                            </Button>
                        </ListGroup>}
                        <div className="assignToBtnContainer" onClick={toggleAROHandler}>
                            <span className="assignText">Assign To</span>
                            <ArrowDropDownIcon />
                        </div>
                        <div className="selectedText">{selectedLeads.length} Leads Selected</div>
                    </form>
                    <div className='paginationRightContainer'>
                        <div className='rowsPerPage'>Rows Per Page: {rowsPerPage}</div>
                        <div className={classes.numberOfTotalCount}>
                            {totalDataPerPage} of {totalLeads}
                        </div>
                        <div className={classes.buttonsContainer}>
                            {prevPage === null ? (
                                <IconButton disabled>
                                    <ChevronLeftOutlinedIcon />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <ChevronLeftOutlinedIcon
                                        className={prevPage !== null ? classes.activeColor : ""}
                                    />
                                </IconButton>
                            )}
                            {nextPage === null ? (
                                <IconButton disabled>
                                    <ChevronRightOutlinedIcon />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <ChevronRightOutlinedIcon
                                        className={nextPage !== null ? classes.activeColor : ""}
                                    />
                                </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            }
        </PageLayerSection>
    )
}