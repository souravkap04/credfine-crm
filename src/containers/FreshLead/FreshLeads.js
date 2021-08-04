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
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import PageLayerSection from '../PageLayerSection/PageLayerSection';
const useStyles = makeStyles({
  container: {
    // margin: '25px',
    overflow: 'auto',
    maxHeight: '550px',
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

export default function FreshLead() {
  const classes = useStyles();
  const profileData = getProfileData();
  const [freshLeads, setFreshLeads] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalUploadLeads, setTotalUploadLeads] = useState(null);
  const [deleteCount, setDeleteCount] = useState(0);
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
              <TableCell className={classes.tableheading}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freshLeads.length !== 0 ?
              freshLeads.map((lead, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className={classes.tabledata}
                    >{lead.lead_crm_id}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.name}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.phone_no}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.loan_amount}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.dob}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.monthly_income}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.current_company}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.residential_pincode}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.current_company_name}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.loan_type}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.status}</TableCell>
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
        <div className={classes.buttonContainer}>
          <Typography className={classes.count}>Total Lead:{totalUploadLeads}</Typography>
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
      </TableContainer>
    </PageLayerSection>
  )
}
