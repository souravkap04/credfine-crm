import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Dialog, DialogContent } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import baseUrl from '../../global/api';
import clickToCallApi from '../../global/callApi'
import { getProfileData } from '../../global/leadsGlobalData'
import CallerDialogBox from './CallerDialog/CallerDialogBox';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import clsx from 'clsx';
const useStyles = makeStyles({
  container: {
    // margin: '25px'
  },
  table: {
    width: '100%',
  },
  tableheading: {
    // padding: '0 8px',
    // textAlign: 'center',
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
    // padding: '0 8px',
    fontSize: '13px'
  },
  emptydata: {
    position: 'relative',
    left: '30rem',
    fontSize: '12px'
  },
  click: {
    cursor: 'pointer',
    color: 'blue'
  },
  callButton: {
    backgroundColor: '#14cc9e',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)'
    }
  },
  callIcon: {
    color: '#ffffff',
    fontSize: '17px'
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
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '35px',
    backgroundColor: '#3ec68c'
  },
  loanButtonText: {
    fontSize: '13px',
    textAlign: 'center',
    color: '#fff'
  }
});
const Leads = ((props) => {
  const classes = useStyles();
  const CancelToken = axios.CancelToken;
  let history = useHistory();
  const profileData = getProfileData();
  const [leadData, setLeadData] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [isCallConnect, setIsCallConnect] = useState(false);
  const [onGoingCall, setOnGoingCall] = useState(false);
  const [isCallNotConnected, setIsCallNotConnected] = useState(false)
  const [isSearchData, setisSearchData] = useState(false);
  useEffect(() => {
    fetchLeadsData()
  }, [])
  const fetchSearchData = async (key) => {
    setisSearchData(true)
    let headers = { 'Authorization': `Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/search/${key}`, { headers })
      .then((response) => {
        setSearchData(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }
  const fetchLeadsData = async () => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': profileData.user_roles[0].user_role_hash,
    };

    await axios.get(`${baseUrl}/leads/lead_allocate/${profileData.campaign_category}`, { headers })
      .then((response) => {
        setLeadData(response.data);
      }).catch((error) => {
        console.log(error);
      })
  };

  const routeChangeHAndler = (leadId) => {
    // props.userListCallback(leadId);
    //history.push(`/leadDetails/${leadId}`);
    history.push(`/dashboards/leads/edit/${leadId}`);
    // props.mainMenuCallBack(true, leadId);
  }
  const clickToCall = async (customerNo) => {
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
    //  const source = CancelToken.source();
    // const timeout = setTimeout(() => {
    //   source.cancel();
    //  // setIsCalling(true);
    // }, 2000);

    //  await axios.post(clickToCallApi,item, {cancelToken: source.token},{headers}).then((response) => {
    //   // Clear The Timeout
    //   clearTimeout(timeout);
    //   if(response.data.success){
    //         setIsCalling(false);
    //         setOnGoingCall(true);
    //       }else{
    //         setIsCallNotConnected(true)
    //       }
    //      }).catch((error)=>{
    //        console.log(error.message);
    //        setIsCallConnect(true);
    //        setIsCalling(false);
    //      });

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
    if (profileData.user_roles[0].user_type === 3) {
      return leadPhoneNo;
    } else {
      return data;
    }
  }
  
  return (
    <PageLayerSection isSearchBox={true} searchHandler={(key) => fetchSearchData(key)}>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableheading}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox className={classes.checkboxFix} />
              </TableCell>
              <TableCell className={classes.tableheading}>Lead ID</TableCell>
              <TableCell className={classes.tableheading} >Name</TableCell>
              <TableCell className={classes.tableheading} >Mobile</TableCell>
              <TableCell className={classes.tableheading} >Loan Amt</TableCell>
              {/* <TableCell className={classes.tableheading} >Date of Birth</TableCell> */}
              <TableCell className={classes.tableheading}>Income</TableCell>
              {/* <TableCell className={classes.tableheading} >Company</TableCell> */}
              {/* <TableCell className={classes.tableheading} >Pin Code</TableCell> */}
              <TableCell className={classes.tableheading} >Company</TableCell>
              <TableCell className={classes.tableheading} >Loan Type</TableCell>
              <TableCell className={clsx(classes.tableheading, classes.statusHeading)} >Status</TableCell>
              <TableCell className={classes.tableheading} >Sub Status</TableCell>
              <TableCell className={classes.tableheading} >Campaign</TableCell>
              <TableCell className={classes.tableheading} ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isSearchData ? (
                searchData.length !== 0 ?
                  searchData.map((search, index) => {
                    let leadPhoneNo = maskPhoneNo(search.phone_no);
                    return (
                      <TableRow className={classes.oddEvenRow} key={index}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell className={classes.tabledata, classes.click}
                          onClick={() => routeChangeHAndler(search.lead_crm_id)}
                        >{search.lead_crm_id}
                        </TableCell>
                        <TableCell className={classes.tabledata}>{search.name}</TableCell>
                        <TableCell className={classes.tabledata}>{leadPhoneNo}</TableCell>
                        <TableCell className={classes.tabledata}>{search.loan_amount}</TableCell>
                        {/* <TableCell className={classes.tabledata}>{search.data.dob}</TableCell> */}
                        <TableCell className={classes.tabledata}>{search.data.monthly_income}</TableCell>
                        {/* <TableCell className={classes.tabledata}>{search.data.residential_pincode}</TableCell> */}
                        {/* <TableCell className={classes.tabledata}>{search.data.current_company}</TableCell> */}
                        <TableCell className={classes.tabledata}>{search.data.current_company_name}</TableCell>
                        <TableCell className={classes.tabledata}>{search.loan_type}</TableCell>
                        <TableCell className={classes.tabledata}>
                          <div className={classes.loanTypeButton}>
                            <div className={classes.loanButtonText}>{search.status}</div>
                          </div>
                        </TableCell>
                        <TableCell className={classes.tabledata}>{search.sub_status}</TableCell>
                        <TableCell className={classes.tabledata}>{search.campaign_category}</TableCell>
                        <TableCell>
                          <Tooltip title="Call Customer">
                            <IconButton className={classes.callButton} onClick={() => clickToCall(search.phone_no)}>
                              <CallIcon className={classes.callIcon} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  }) : <span className={classes.emptydata}> No Data Found </span>)

                : (Object.keys(leadData).length !== 0 ?
                  <TableRow className={classes.oddEvenRow}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell className={classes.tabledata, classes.click}
                      onClick={() => routeChangeHAndler(leadData.lead_crm_id)}
                    >{leadData.lead_crm_id} </TableCell>
                    <TableCell className={classes.tabledata}>{leadData.name}</TableCell>
                    <TableCell className={classes.tabledata}>{maskPhoneNo(leadData.phone_no)}</TableCell>
                    <TableCell className={classes.tabledata}>{leadData.loan_amount}</TableCell>
                    {/* <TableCell className={classes.tabledata}>{leadData.data['dob']}</TableCell> */}
                    <TableCell className={classes.tabledata}>{leadData.data['monthly_income']}</TableCell>
                    {/* <TableCell className={classes.tabledata}>{leadData.data['current_company']}</TableCell> */}
                    {/* <TableCell className={classes.tabledata}>{leadData.data['residential_pincode']}</TableCell> */}
                    <TableCell className={classes.tabledata}>{leadData.data['current_company_name']}</TableCell>
                    <TableCell className={classes.tabledata}>{leadData.loan_type}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <div className={classes.loanTypeButton}>
                        <div className={classes.loanButtonText}>{leadData.status}</div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tabledata}>{leadData.sub_status}</TableCell>
                    <TableCell className={classes.tabledata}>{leadData.campaign_category}</TableCell>
                    <TableCell>
                      <Tooltip title="Call Customer">
                        <IconButton className={classes.callButton} onClick={() => clickToCall(leadData.phone_no)}>
                          <CallIcon className={classes.callIcon} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  : <span className={classes.emptydata}> No Data Found </span>)
            }
            <div>
              <CallerDialogBox
                onGoingCall={onGoingCall}
                isCalling={isCalling}
                isCallConnect={isCallConnect}
                isCallNotConnected={isCallNotConnected}
                callConnectHandler={callConnectHandler}
              />
            </div>
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayerSection>
  );
});
export default Leads;