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
import Button from '@material-ui/core/Button'
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import clickToCallApi from '../../global/callApi';
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import CallerDialogBox from '../Leads/CallerDialog/CallerDialogBox';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import './myleads.css';
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
    backgroundColor: '#ffffff'
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
    fontSize: '13px',
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
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    history.push(`/dashboards/myleads/edit/${leadId}`);
    // props.mainMenuCallBack(true, leadId);
  }
  // const nextPageHandler = async () => {
  //   const headers = { 'Authorization': `Token ${profileData.token}` }
  //   await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(nextPage)}`, { headers })
  //     .then((response) => {
  //       setPrevPage(response.data.previous);
  //       setNextPage(response.data.next);
  //       setMyLeads(response.data.results);
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // }
  // const prevPageHandler = async () => {
  //   const headers = { 'Authorization': `Token ${profileData.token}` }
  //   await axios.get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(prevPage)}`, { headers })
  //     .then((response) => {
  //       setPrevPage(response.data.previous);
  //       setNextPage(response.data.next);
  //       setMyLeads(response.data.results);
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // }

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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalLeads - page * rowsPerPage);
  return (
    <PageLayerSection>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableheading}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox className={classes.checkboxFix} />
              </TableCell>
              <TableCell className={classes.tableheading}>Lead ID</TableCell>
              <TableCell className={classes.tableheading}>Name</TableCell>
              <TableCell className={classes.tableheading}>Mobile</TableCell>
              <TableCell className={classes.tableheading}>Loan Amt</TableCell>
              {/* <TableCell className={classes.tableheading}> Date of Birth</TableCell> */}
              <TableCell className={classes.tableheading}>Income</TableCell>
              {/* <TableCell className={classes.tableheading}>Current Company</TableCell> */}
              {/* <TableCell className={classes.tableheading}>Pin Code</TableCell> */}
              <TableCell className={classes.tableheading}>Company</TableCell>
              <TableCell className={classes.tableheading}>Loan Type</TableCell>
              <TableCell className={clsx(classes.tableheading, classes.statusHeading)}>Status</TableCell>
              <TableCell className={classes.tableheading}>Sub Status</TableCell>
              <TableCell className={classes.tableheading} >Campaign</TableCell>
              <TableCell className={classes.tableheading} ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myLeads.length !== 0 ? stableSort(myLeads, getComparator())
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((my_leads, index) => {
                let leadPhoneNo = maskPhoneNo(my_leads.lead.phone_no)
                return (
                  <TableRow className={classes.oddEvenRow} key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox className={classes.checkboxFixData} />
                    </TableCell>
                    <TableCell className={classes.tabledata, classes.leadid}
                      onClick={() => leadDetailsHandler(my_leads.lead.lead_crm_id)}
                    >{my_leads.lead.lead_crm_id}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.name}</TableCell>
                    <TableCell className={classes.tabledata}>{leadPhoneNo}</TableCell>
                    <TableCell className={classes.tabledata}>{my_leads.lead.loan_amount}</TableCell>
                    {/* <TableCell className={classes.tabledata}>{my_leads.lead.data.dob}</TableCell> */}
                    <TableCell className={classes.tabledata}>{my_leads.lead.data.monthly_income}</TableCell>
                    {/* <TableCell className={classes.tabledata}>{my_leads.lead.data.current_company}</TableCell> */}
                    {/* <TableCell className={classes.tabledata}>{my_leads.lead.data.residential_pincode}</TableCell> */}
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
                        <IconButton className={classes.callButton} onClick={() => clickToCall(my_leads.lead.phone_no)}>
                          <CallIcon className={classes.callIcon} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              }) : <span className={classes.emptydata}>No Data Found</span>}
          </TableBody>
        </Table>
        {/* <div className={classes.buttonContainer}>
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
          </div> */}
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
      <TablePagination className={classes.tablePagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalLeads}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </PageLayerSection>
  );
}
