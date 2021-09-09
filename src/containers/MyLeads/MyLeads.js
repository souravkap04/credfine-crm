import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import baseUrl from '../../global/api';
import { getCampaign, getProfileData, getStatusData } from '../../global/leadsGlobalData'
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import Button from '@material-ui/core/Button'
import { clickToCallApi, vertageDialerApi } from '../../global/callApi';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import CallerDialogBox from '../Leads/CallerDialog/CallerDialogBox';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import './myleads.css';
import { Drawer } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import filter from '../../images/filter.png';
import { useQueryy } from '../../global/query';
import CircularProgress from '@material-ui/core/CircularProgress';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  container: {
    // margin: '25px',
    overflow: 'auto',
    // maxHeight: '550px',
    marginBottom: '10px'
  },
  table: {
    Width: '100%',
  },
  tableheading: {
    // padding: '0 8px',
    // fontSize: '12px',
    // textAlign: 'center',
    backgroundColor: '#8f9bb3',
    color: '#ffffff',
    fontSize: '14px',
  },
  tablePagination: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '64px',
    marginTop: '8px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  numberOfTotalCount: {
    marginRight: '25px'
  },
  rowsPerPageContainer: {
    marginRight: '70px',
    display: 'flex',
    alignItems: 'center'
  },
  rowsText: {
    marginRight: '8px'
  },
  buttonsContainer: {
    marginRight: '15px'
  },
  activeColor: {
    color: '#000'
  },
  statusHeading: {
    textAlign: 'center'
  },
  checkboxFix: {
    color: '#ffffff'
  },
  checkboxFixData: {
    color: '#8F9BB3'
  },
  tabledata: {
    padding: '15px',
    fontSize: '12px',
    overflowWrap: 'break-word'
  },
  emptydata: {
    position: 'relative',
    left: '30rem',
    fontSize: '12px'
  },
  leadid: {
    cursor: 'pointer',
    color: 'blue'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '5px'
  },
  prevBtn: {
    margin: '0px 8px',
    backgroundColor: '#13B980',
    border: '1px solid black',
    cursor: 'pointer',
  },
  nextBtn: {
    backgroundColor: '#13B980',
    border: '1px solid black',
    cursor: 'pointer',
  },
  count: {
    fontSize: '0.85em',
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
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
export default function MyLeads(props) {
  const classes = useStyles();
  const profileData = getProfileData();
  const [myLeads, setMyLeads] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalLeads, setTotalLeads] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isCallConnect, setIsCallConnect] = useState(false);
  const [onGoingCall, setOnGoingCall] = useState(false);
  const [isCallNotConnected, setIsCallNotConnected] = useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalDataPerPage, settotalDataPerPage] = useState(0);
  const [vertageCall, setVertageCall] = useState(false);
  const [disableHangupBtn, setDisableHangupBtn] = useState(true);
  const [state, setState] = useState(false);
  const [status, setStatus] = useState('');
  const [subStatus, setSubStatus] = useState([]);
  const [campaign, setCampaign] = useState([]);
  const [startdate, setstartDate] = useState("");
  const [enddate, setendDate] = useState("");
  const [isError, setisError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  let statusData = getStatusData();
  let campaignData = getCampaign();
  const queryy = useQueryy();
  const filterstatus = queryy.get("status") || "";
  const startDate = queryy.get("start_date") || "";
  const endDate = queryy.get("end_date") || "";
  const sub_status = queryy.get("sub_status") || "";
  const campaign_category = queryy.get("campaign_category") || "";
  const splitUrl = (data) => {
    if (data !== null) {
      const [url, pager] = data.split('?');
      return pager;
    }
  }
  let history = useHistory();
  const fetchMyLeads = async () => {
    setisLoading(true)
    const headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?status=${filterstatus}&start_date=${startDate}&end_date=${endDate}&sub_status=${sub_status}&campaign_category=${campaign_category}`, { headers })
      .then((response) => {
        setRowsPerPage(response.data.results.length)
        settotalDataPerPage(response.data.results.length)
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
        setTotalLeads(response.data.count);
        setisLoading(false)
      }).catch((error) => {
        console.log(error);
      })
  };
  useEffect(() => {
    fetchMyLeads();
  }, [filterstatus, startDate, endDate, subStatus, campaign_category])
  const leadDetailsHandler = (leadId) => {
    history.push(`/dashboards/myleads/edit/${leadId}`);
    // props.mainMenuCallBack(true, leadId);
  }
  const nextPageHandler = async () => {
    setisLoading(true)
    const headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(nextPage)}`, { headers })
      .then((response) => {
        let nextCount = totalDataPerPage + response.data.results.length
        settotalDataPerPage(nextCount)
        setRowsPerPage(response.data.results.length)
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
        setisLoading(false)
      }).catch((error) => {
        setisLoading(false)
      })
  }
  const prevPageHandler = async () => {
    setisLoading(true)
    const headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(prevPage)}`, { headers })
      .then((response) => {
        let prevCount = totalDataPerPage - response.data.results.length
        settotalDataPerPage(prevCount)
        setRowsPerPage(response.data.results.length)
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
        setisLoading(false)
      }).catch((error) => {
        setisLoading(false)
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
  const maskPhoneNo = (encryptData) => {
    let data = decodeURIComponent(window.atob(encryptData));
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
  const clickToCall = async (encryptData, leadID) => {
    const customerNo = decodeURIComponent(window.atob(encryptData));
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
        history.push(`/dashboards/myleads/edit/${leadID}`)
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
        history.push(`/dashboards/myleads/edit/${leadID}`)
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
  const disableDialerPopUp = () => {
    setVertageCall(false)
    setDisableHangupBtn(false)
  }
  const openDrawer = () => {
    setState(true)
  }

  const filterSubmit = () => {
    if (startdate !== "" && enddate === "") {
      setisError(true)
      return;
    }
    history.push(`/dashboards/myleads/?status=${status}&start_date=${startdate}&end_date=${enddate}&sub_status=${subStatus}&campaign_category=${campaign}`)
    closeDrawer()
  }
  const closeDrawer = () => {
    setState(false)
    setisError(false)
    setStatus('')
    setstartDate('')
    setendDate('')
    setSubStatus('')
    setCampaign('')
  };
  return (
    <PageLayerSection>
      <Drawer anchor='right' open={state} onClose={closeDrawer}>
        <div className="rightContainerForm">
          <form>
            <Grid container justifyContent="flex-start"><h4>Search Here</h4></Grid>
            <Grid>
              <TextField
                className="textField"
                type="date"
                id="outlined-full-width"
                label="From"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: formatDate(new Date())
                }}
                variant="outlined"
                size="small"
                value={startdate}
                onChange={(e) => setstartDate(e.target.value)}

              />
            </Grid>
            <Grid>
              <TextField
                type="date"
                className="textField"
                id="outlined-full-width"
                label="To"
                defaultValue="12-12-2021"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: formatDate(new Date())
                }}
                variant="outlined"
                size="small"
                value={enddate}
                onChange={(e) => {
                  setendDate(e.target.value)
                  setisError(false)
                }}
                disabled={startdate !== "" ? false : true}
                error={Boolean(isError ? true : false)}
                helperText={isError ? "End Date is requireds" : ""}
              />
            </Grid>
            <Grid>
              <TextField
                select
                className="textField"
                id="outlined-full-width"
                label="Status"
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select</option>
                {uniqueStatus.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                className="textField"
                select
                id="outlined-full-width"
                label="Sub Status"
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
                value={subStatus}
                onChange={(e) => { setSubStatus(e.target.value) }}
              >
                <option value="">Select</option>
                {options.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </TextField>
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
                  native: true
                }}
                variant="outlined"
                size="small"
                value={campaign}
                onChange={(e) => { setCampaign(e.target.value) }}
              >
                <option value="">Select</option>
                {campaignData.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <Button onClick={() => filterSubmit()} className="submitBtn" color='primary' variant='contained'>Submit</Button>
            </Grid>
          </form>
        </div>
      </Drawer>
      <div className="filterMainContainer">
        <h3>My Leads ({totalLeads})</h3>
        <div className="filterButtonContainer" onClick={() => openDrawer()}>
          <div className="filterImage">
            <img src={filter} alt="" />
          </div>
          <div className="filterText">FILTER</div>
        </div>
      </div>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableheading}>
            <TableRow>
              <TableCell className={classes.tableheading}>Sr No</TableCell>
              <TableCell className={classes.tableheading}>Lead ID</TableCell>
              <TableCell className={classes.tableheading}>Name</TableCell>
              <TableCell className={classes.tableheading}>Mobile</TableCell>
              <TableCell className={classes.tableheading}>Loan Amt</TableCell>
              <TableCell className={classes.tableheading}>Income</TableCell>
              <TableCell className={classes.tableheading}>Company</TableCell>
              <TableCell className={classes.tableheading}>Loan Type</TableCell>
              <TableCell className={clsx(classes.tableheading, classes.statusHeading)}>Status</TableCell>
              <TableCell className={classes.tableheading}>Sub Status</TableCell>
              <TableCell className={classes.tableheading} >Campaign</TableCell>
              <TableCell className={classes.tableheading} ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? <div className="loader">
              <CircularProgress size={100} thickness={3} />
            </div> : myLeads.length !== 0 ?
              myLeads.map((my_leads, index) => {
                let leadPhoneNo = maskPhoneNo(my_leads.lead.phone_no_encrypt)
                return (
                  <TableRow className={classes.oddEvenRow} key={index}>
                    <TableCell className={classes.tabledata}>{index + 1}</TableCell>
                    <TableCell className={classes.tabledata, classes.leadid}
                      onClick={() => leadDetailsHandler(my_leads.lead.lead_crm_id)}
                    >{my_leads.lead.lead_crm_id}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.name ? my_leads.lead.name : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{leadPhoneNo ? leadPhoneNo : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.loan_amount ? my_leads.lead.loan_amount : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.monthly_income ? my_leads.lead.data.monthly_income : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.current_company_name ? my_leads.lead.data.current_company_name : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.loan_type ? my_leads.lead.loan_type : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <div className={classes.loanTypeButton}>
                        <div className={classes.loanButtonText}>{my_leads.lead.status}</div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.sub_status ? my_leads.lead.sub_status : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.campaign_category ? my_leads.lead.campaign_category : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <Tooltip title="Call Customer">
                        <IconButton className={classes.callButton} onClick={() => clickToCall(my_leads.lead.phone_no_encrypt, my_leads.lead.lead_crm_id)}>
                          <CallIcon className={classes.callIcon} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              }) : <span className={classes.emptydata}>No Data Found</span>}
          </TableBody>
        </Table>
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
          <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={vertageCall} autoHideDuration={1500} onClose={disableDialerPopUp}>
            <Alert onClose={disableDialerPopUp} severity="info">
              Calling...
            </Alert>
          </Snackbar>
        </div>
      </TableContainer>
      {isLoading ? '' : <div className={classes.tablePagination}>
        <div className={classes.rowsPerPageContainer}>
          <div className={classes.rowsText}>Rows Per Page: {rowsPerPage}</div>
        </div>
        <div className={classes.numberOfTotalCount}>{totalDataPerPage} of {totalLeads}</div>
        <div className={classes.buttonsContainer}>
          {prevPage === null ? <IconButton disabled
            onClick={prevPageHandler}
          >
            <ChevronLeftOutlinedIcon />
          </IconButton> : <IconButton
            onClick={prevPageHandler}
          >
            <ChevronLeftOutlinedIcon className={prevPage !== null ? classes.activeColor : ''} />
          </IconButton>}
          {nextPage === null ? <IconButton disabled
            onClick={nextPageHandler}
          >
            <ChevronRightOutlinedIcon />
          </IconButton> : <IconButton
            onClick={nextPageHandler}
          >
            <ChevronRightOutlinedIcon className={nextPage !== null ? classes.activeColor : ''} />
          </IconButton>}
        </div>
      </div>}
    </PageLayerSection >
  );
}
