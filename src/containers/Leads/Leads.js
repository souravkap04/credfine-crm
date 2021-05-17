import React,{useState,useEffect} from 'react';
import { useHistory ,Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import baseUrl from '../../global/api';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    Width: '100%',
  },
  tableheading:{
    padding:'0 25px'
  }
  
});
export default function Leads() {
  const classes = useStyles();
  const [leadData,setLeadData] = useState({});
  const history = useHistory();

  useEffect(()=>{
     const fetchLeadsData = async ()=>{
      const headers = {
        'Authorization':'Token 0cf9265a842c788ffaf98cdb9279d82b290bdb45',
        'userRoleHash': 'd059e2f4-b30a-11eb-a945-000000000018',
    };
     try{
      const response = await axios.get(`${baseUrl}/leads/lead_allocate/`,{headers});
      console.log(response.data.data);
      setLeadData(response.data);
     }catch(error){
       console.log(error);
     }
     
     };
     fetchLeadsData();
  },[])
  const routeChangeHAndler = ()=>{
    history.push("/leadDetails")
  }

  return (
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableheading}>Lead Id</TableCell>
            <TableCell className={classes.tableheading} align="right">Name</TableCell>
            <TableCell className={classes.tableheading} align="right">Phone No</TableCell>
            <TableCell className={classes.tableheading} align="right">Loan Amount</TableCell>
            <TableCell className={classes.tableheading} align="right">Date of Birth</TableCell>
            <TableCell  className={classes.tableheading}align="right">Monthly Income</TableCell>
            <TableCell className={classes.tableheading} align="right">Current Company</TableCell>
            <TableCell className={classes.tableheading} align="right">Pin Code</TableCell>
            <TableCell className={classes.tableheading} align="right">Company Name</TableCell>
            <TableCell className={classes.tableheading} align="right">Loan Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell component="th" scope="row">
              {leadData.lead_crm_id}
            </TableCell>
            <TableCell align="center">{leadData.name}</TableCell>
            <TableCell align="center">{leadData.phone_no}</TableCell>
            <TableCell align="center">{leadData.loan_amount}</TableCell>
              <TableCell align="center">1991-01-01</TableCell>
            <TableCell align="center">10000</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">122001</TableCell>
            <TableCell align="center">xyz</TableCell>   
            <TableCell align="center">{leadData.loan_type}</TableCell>
            <TableCell >
              <Button variant="outlined" color="secondary"
              onClick={routeChangeHAndler}
              >View</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
     
  );
}