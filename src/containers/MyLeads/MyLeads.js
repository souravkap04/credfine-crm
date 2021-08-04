import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import clickToCallApi from '../../global/callApi';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import CallerDialogBox from '../Leads/CallerDialog/CallerDialogBox';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  container: {
    // margin: '25px',
    overflow: 'auto',
    // maxHeight: '550px',
    marginBottom: '25px'
  },
  table: {
    Width: '100%',
  },
  tableheading: {
    padding: '0 8px',
    fontSize: '12px',
    textAlign: 'center'
  },
  tabledata: {
    padding: '0 8px',
    fontSize: '12px',
    textAlign: 'center'
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
    history.push(`/dashboards/leads/edit/${leadId}`);
    // props.mainMenuCallBack(true, leadId);
  }
  const nextPageHandler = async () => {
    const headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(nextPage)}`, { headers })
      .then((response) => {
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
  const clickToCall = async (customerNo) => {
    console.log(customerNo)
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
  }
  const callConnectHandler = () => {
    setIsCallConnect(false);
    setIsCallNotConnected(false)
  }
  return (
    <PageLayerSection>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableheading}>Lead Id</TableCell>
              <TableCell className={classes.tableheading}>Name</TableCell>
              <TableCell className={classes.tableheading}>Phone No</TableCell>
              <TableCell className={classes.tableheading}>Loan Amount </TableCell>
              <TableCell className={classes.tableheading}> Date of Birth</TableCell>
              <TableCell className={classes.tableheading}> Monthly Income</TableCell>
              <TableCell className={classes.tableheading}>Current Company</TableCell>
              <TableCell className={classes.tableheading}>Pin Code</TableCell>
              <TableCell className={classes.tableheading}>Company Name</TableCell>
              <TableCell className={classes.tableheading}>Loan Type</TableCell>
              <TableCell className={classes.tableheading}>Status</TableCell>
              <TableCell className={classes.tableheading}>Sub Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myLeads.length !== 0 ?
              myLeads.map((my_leads, index) => {
                let leadPhoneNo = maskPhoneNo(my_leads.lead.phone_no)
                return (
                  <TableRow key={index}>
                    <TableCell className={classes.tabledata, classes.leadid}
                      onClick={() => leadDetailsHandler(my_leads.lead.lead_crm_id)}
                    >{my_leads.lead.lead_crm_id}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.name}</TableCell>
                    <TableCell className={classes.tabledata}>{leadPhoneNo}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.loan_amount}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.dob}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.monthly_income}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.current_company}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.residential_pincode}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.current_company_name}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.loan_type}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.status}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.sub_status}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <Tooltip title="Call Customer">
                        <IconButton onClick={() => clickToCall(my_leads.lead.phone_no)}>
                          <CallIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              }) : <span className={classes.emptydata}>No Data Found</span>}
          </TableBody>
        </Table>
        <div className={classes.buttonContainer}>
          <Typography className={classes.count}>Total Lead:{totalLeads}</Typography>
          <Button
            className={classes.prevBtn}
            onClick={prevPageHandler}
          >
            <span className="fa fa-angle-left" aria-hidden="true"></span>
          </Button>
          <Button
            className={classes.nextBtn}
            onClick={nextPageHandler}
          >
            <span className="fa fa-angle-right" aria-hidden="true"></span>
          </Button>
        </div>
        <div>
          <CallerDialogBox
            onGoingCall={onGoingCall}
            isCalling={isCalling}
            isCallConnect={isCallConnect}
            isCallNotConnected={isCallNotConnected}
            callConnectHandler={callConnectHandler}
          />
        </div>
      </TableContainer>
    </PageLayerSection>
  );
}
