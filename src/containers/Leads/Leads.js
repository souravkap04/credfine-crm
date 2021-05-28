import React,{useState,useEffect } from 'react';
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
  container:{
    margin:'25px'
  },
  table: {
    Width: '100%',
  },
  tableheading:{
    padding:'0 25px'
  }
  
});
 const Leads = ((props) => {
  const classes = useStyles();
  const [leadData,setLeadData] = useState({});
  const [searchData,setSearchData] = useState([]);
  const history = useHistory();
  useEffect(()=>{
      props.isSearchData ? fetchSearchData(props.searchInput) : fetchLeadsData()
  },[])
  const fetchSearchData = async (key)=>{
    let headers = {'Authorization':'Token e9f8746ae94a00aa6526122f2db67e081ca10f54'}
    await axios.get(`${baseUrl}/leads/search/${key}`,{headers})
    .then((response)=>{
       console.log(response.data);
       setSearchData(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  }
  const fetchLeadsData = async ()=>{
    const headers = {
      'Authorization':'Token 0cf9265a842c788ffaf98cdb9279d82b290bdb45',
      'userRoleHash': 'd059e2f4-b30a-11eb-a945-000000000018',
  };

     await axios.get(`${baseUrl}/leads/lead_allocate/`,{headers})
     .then((response)=>{
      console.log(response.data.data.dob);
      setLeadData(response.data);
      console.log("leadData:"+leadData.data.dob);
     }).catch((error)=>{
       console.log(error);
     })
   
   
   };
  const routeChangeHAndler = (leadId)=>{
    props.userListCallback(leadId);
   history.push(`/leadDetails/${leadId}`);
   //props.leadDetailsCallBack(true);
  }

  return (
      <TableContainer component={Paper} className={classes.container}>
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
            <TableCell className={classes.tableheading} align="right">Status</TableCell>
            <TableCell className={classes.tableheading} align="right">Sub Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
          {props.isSearchData ? 
           searchData.map((search,index)=>(
            <>
            <TableCell align="center">{search.lead_crm_id} </TableCell>
           <TableCell align="center">{search.name}</TableCell>
           <TableCell align="center">{search.phone_no}</TableCell>
           <TableCell align="center">{search.loan_amount}</TableCell>
            <TableCell align="center">{search.data.dob}</TableCell>
           <TableCell align="center">{search.data.monthly_income}</TableCell>
           <TableCell align="center">{search.data.residential_pincode}</TableCell>
           <TableCell align="center">{search.data.current_company}</TableCell>
           <TableCell align="center">{search.data.current_company_name}</TableCell>    
           <TableCell align="center">{search.loan_type}</TableCell>
           <TableCell align="center">{search.status}</TableCell>
           <TableCell align="center">{search.sub_status}</TableCell>
           <TableCell >
             <Button variant="outlined" color="secondary"
             onClick={()=>routeChangeHAndler(search.lead_crm_id)}
             >View</Button>
           </TableCell>
          </>
           ))
            :<>
              <TableCell align="center" >{leadData.lead_crm_id} </TableCell>
            <TableCell align="center">{leadData.name}</TableCell>
            <TableCell align="center">{leadData.phone_no}</TableCell>
            <TableCell align="center">{leadData.loan_amount}</TableCell>
             {/* <TableCell align="center">{leadData.data.dob}</TableCell>
             <TableCell align="center">{leadData.data['monthly_income']}</TableCell>
            <TableCell align="center">{leadData.data['current_company']}</TableCell>
            <TableCell align="center">{leadData.data['residential_pincode']}</TableCell>
            <TableCell align="center">{leadData.data['current_company_name']}</TableCell>     */}
            <TableCell align="center">{leadData.loan_type}</TableCell>
            <TableCell align="center">{leadData.status}</TableCell>
            <TableCell align="center">{leadData.sub_status}</TableCell>
            <TableCell >
              <Button variant="outlined" color="secondary"
              onClick={()=>routeChangeHAndler(leadData.lead_crm_id)}
              >View</Button>
            </TableCell>
              </>}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
     
  );
});
export default Leads;