import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import clsx from 'clsx';
const useStyles = makeStyles({
  container: {
    // margin: '25px',
    overflow: 'auto',
    // maxHeight: '550px',
    marginBottom: '10px'
  },
  table: {
    width: '100%',
  },
  tableheading: {
    // padding: '0 8px',
    // fontSize: '12px',
    // textAlign: 'center'
    backgroundColor: '#8f9bb3',
    color: '#ffffff',
    fontSize: '14px',
  },
  tabledata: {
    // padding: '0 8px',
    fontSize: '12px',
    // textAlign: 'center'
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
export default function FreshLead() {
  const classes = useStyles();
  const profileData = getProfileData();
  const [freshLeads, setFreshLeads] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalUploadLeads, setTotalUploadLeads] = useState(null);
  const [deleteCount, setDeleteCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalDataPerPage, settotalDataPerPage] = useState(0);
  const splitUrl = (data) => {
    if (data !== null) {
      const [url, pager] = data.split('?');
      return pager;
    }
  }
  useEffect(() => {
    const fetchFreshLeads = async () => {
      const headers = {
        'Authorization': `Token ${profileData.token}`,
        'userRoleHash': `${profileData.user_roles[0].user_role_hash}`
      };
      await axios.get(`${baseUrl}/leads/freshLeads/`, { headers })
        .then((response) => {
          setRowsPerPage(response.data.results.length)
          settotalDataPerPage(response.data.results.length)
          setFreshLeads(response.data.results);
          setPrevPage(response.data.previous);
          setNextPage(response.data.next);
          setTotalUploadLeads(response.data.count);
        }).catch((error) => {
          console.log(error);
        })
    };
    fetchFreshLeads();
  }, [deleteCount])
  const nextPageHandler = async () => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': `${profileData.user_roles[0].user_role_hash}`
    };
    await axios.get(`${baseUrl}/leads/freshLeads/?${splitUrl(nextPage)}`, { headers })
      .then((response) => {
        let nextCount = totalDataPerPage + response.data.results.length
        settotalDataPerPage(nextCount)
        setRowsPerPage(response.data.results.length)
        setFreshLeads(response.data.results);
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setTotalUploadLeads(response.data.count);
      }).catch((error) => {
        console.log(error);
      })
  }
  const prevPageHandler = async () => {
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': `${profileData.user_roles[0].user_role_hash}`
    }
    await axios.get(`${baseUrl}/leads/freshLeads/?${splitUrl(prevPage)}`, { headers })
      .then((response) => {
        let prevCount = totalDataPerPage - response.data.results.length
        settotalDataPerPage(prevCount)
        setRowsPerPage(response.data.results.length)
        setFreshLeads(response.data.results);
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setTotalUploadLeads(response.data.count);
      }).catch((error) => {
        console.log(error);
      })
  }

  const deleteFreshLead = async (leadId) => {
    console.log(leadId);
    const data = { lead_crm_id: leadId };
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': `${profileData.user_roles[0].user_role_hash}`
    };
    await axios.delete(`${baseUrl}/leads/freshLeads/`, { headers, data })
      .then((response) => {
        setDeleteCount(deleteCount + 1);
      }).catch((error) => {
        console.log(error);
      })
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
              <TableCell className={classes.tableheading}>Campaign</TableCell>
              <TableCell className={classes.tableheading}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freshLeads.length !== 0 ?
              freshLeads.map((lead, index) => {
                return (
                  <TableRow className={classes.oddEvenRow} key={index}>
                    {/* {settotalDataPerPage(index)} */}
                    {/* <TableCell padding="checkbox">
                      <Checkbox className={classes.checkboxFixData} />
                    </TableCell> */}
                    <TableCell className={classes.tabledata}>{index+1}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.lead_crm_id}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.name}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.phone_no}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.loan_amount}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.monthly_income}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.current_company_name}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.loan_type}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <div className={classes.loanTypeButton}>
                        <div className={classes.loanButtonText}>{lead.status}</div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tabledata}>{lead.sub_status}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.campaign_category}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <Tooltip title="Delete Lead">
                        <IconButton onClick={() => deleteFreshLead(lead.lead_crm_id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
              : <span className={classes.emptydata}>No Data Found</span>}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.tablePagination}>
        <div className={classes.rowsPerPageContainer}>
          <div className={classes.rowsText}>Rows Per Page: {rowsPerPage}</div>
        </div>
        <div className={classes.numberOfTotalCount}>{totalDataPerPage} of {totalUploadLeads}</div>
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
    </PageLayerSection>
  )
}
