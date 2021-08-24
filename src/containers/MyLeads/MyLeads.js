import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import { Typography } from '@material-ui/core';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import Button from '@material-ui/core/Button'
import { clickToCallApi, vertageDialerApi } from '../../global/callApi';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import CallerDialogBox from '../Leads/CallerDialog/CallerDialogBox';
import { Dialog, DialogContent } from '@material-ui/core'
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import './myleads.css';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
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
    // padding: '0 8px',
    fontSize: '12px',
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
  const splitUrl = (data) => {
    if (data !== null) {
      const [url, pager] = data.split('?');
      return pager;
    }
  }
  let history = useHistory();
  useEffect(() => {
    const fetchMyLeads = async () => {
      const headers = { 'Authorization': `Token ${profileData.token}` }
      await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/`, { headers })
        .then((response) => {
          setRowsPerPage(response.data.results.length)
          settotalDataPerPage(response.data.results.length)
          setPrevPage(response.data.previous);
          setNextPage(response.data.next);
          setMyLeads(response.data.results);
          setTotalLeads(response.data.count);
        }).catch((error) => {
          console.log(error);
        })
    };
    fetchMyLeads();
  }, [])
  const leadDetailsHandler = (leadId) => {
    history.push(`/dashboards/myleads/edit/${leadId}`);
    // props.mainMenuCallBack(true, leadId);
  }
  const nextPageHandler = async () => {
    const headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(nextPage)}`, { headers })
      .then((response) => {
        let nextCount = totalDataPerPage + response.data.results.length
        settotalDataPerPage(nextCount)
        setRowsPerPage(response.data.results.length)
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
      }).catch((error) => {
        console.log(error)
      })
  }
  const prevPageHandler = async () => {
    const headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(prevPage)}`, { headers })
      .then((response) => {
        let prevCount = totalDataPerPage - response.data.results.length
        settotalDataPerPage(prevCount)
        setRowsPerPage(response.data.results.length)
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
      }).catch((error) => {
        console.log(error)
      })
  }

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

  return (
    <PageLayerSection>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableheading}>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox className={classes.checkboxFix} />
              </TableCell> */}
              <TableCell className={classes.tableheading}>Sl No</TableCell>
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
            {myLeads.length !== 0 ?
              myLeads.map((my_leads, index) => {
                let leadPhoneNo = maskPhoneNo(my_leads.lead.phone_no)
                return (
                  <TableRow className={classes.oddEvenRow} key={index}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox className={classes.checkboxFixData} />
                    </TableCell> */}
                    <TableCell className={classes.tabledata}>{index+1}</TableCell>
                    <TableCell className={classes.tabledata, classes.leadid}
                      onClick={() => leadDetailsHandler(my_leads.lead.lead_crm_id)}
                    >{my_leads.lead.lead_crm_id}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.name}</TableCell>
                    <TableCell className={classes.tabledata}>{leadPhoneNo}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.loan_amount}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.monthly_income}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.current_company_name}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.loan_type}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <div className={classes.loanTypeButton}>
                        <div className={classes.loanButtonText}>{my_leads.lead.status}</div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.sub_status}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.campaign_category}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <Tooltip title="Call Customer">
                        <IconButton className={classes.callButton} onClick={() => clickToCall(my_leads.lead.phone_no, my_leads.lead.lead_crm_id)}>
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
          {/* <Dialog open={vertageCall} onClose={disableDialerPopUp}>
            <DialogContent>
              <p>Calling...</p>
            </DialogContent>
          </Dialog> */}
          <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={vertageCall} autoHideDuration={1500} onClose={disableDialerPopUp}>
            <Alert onClose={disableDialerPopUp} severity="info">
              Calling...
            </Alert>
          </Snackbar>
        </div>
      </TableContainer>
      <div className={classes.tablePagination}>
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
      </div>
    </PageLayerSection >
  );
}
