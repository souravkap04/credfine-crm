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
import {getProfileData} from '../../global/leadsGlobalData'

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
  const profileData = getProfileData();
  const [leadData,setLeadData] = useState([]);
  const [searchData,setSearchData] = useState([]);
  console.log("leads invoke1:"+props.isSearchData);
  console.log("leads invoke2:"+props.searchInput);
  console.log(profileData.user_roles[0].user_role_hash)
  useEffect(()=>{
    console.log("calling useEffect")
      props.isSearchData ? fetchSearchData(props.searchInput) : fetchLeadsData()
  },[])
  const fetchSearchData = async (key)=>{
    console.log("fetch search");
    let headers = {'Authorization':`Token ${profileData.token}` }
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
      'Authorization':`Token ${profileData.token}` ,
      'userRoleHash': profileData.user_roles[0].user_role_hash,
  };

     await axios.get(`${baseUrl}/leads/lead_allocate/`,{headers})
     .then((response)=>{
      console.log(response.data);
      setLeadData([response.data]);
     }).catch((error)=>{
       console.log(error);
     })
   
   
   };
  const routeChangeHAndler = (leadId)=>{
   // props.userListCallback(leadId);
  // history.push(`/leadDetails/${leadId}`);
   props.mainMenuCallBack(true,leadId);
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
          {props.isSearchData? 
           searchData.map((search,index)=>(
            <TableRow>
            <TableCell align="center"
            style={{cursor:'pointer',color:'blue'}}
            onClick={()=>routeChangeHAndler(search.lead_crm_id)}
            >{search.lead_crm_id} 
            </TableCell>
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
           {/* <TableCell >
             <Button variant="outlined" color="secondary"
             onClick={()=>routeChangeHAndler(search.lead_crm_id)}
             >View</Button>
           </TableCell> */}
          </TableRow>
           ))
            : leadData.map((lead)=>(
              <TableRow>
              <TableCell align="center" 
              style={{cursor:'pointer',color:'blue'}}
              onClick={()=>routeChangeHAndler(lead.lead_crm_id)}
              >{lead.lead_crm_id} </TableCell>
            <TableCell align="center">{lead.name}</TableCell>
            <TableCell align="center">{lead.phone_no}</TableCell>
            <TableCell align="center">{lead.loan_amount}</TableCell>
             <TableCell align="center">{lead.data['dob']}</TableCell>
             <TableCell align="center">{lead.data['monthly_income']}</TableCell>
            <TableCell align="center">{lead.data['current_company']}</TableCell>
            <TableCell align="center">{lead.data['residential_pincode']}</TableCell>
            <TableCell align="center">{lead.data['current_company_name']}</TableCell>    
            <TableCell align="center">{lead.loan_type}</TableCell>
            <TableCell align="center">{lead.status}</TableCell>
            <TableCell align="center">{lead.sub_status}</TableCell>
            {/* <TableCell >
              <Button variant="outlined" color="secondary"
              onClick={()=>routeChangeHAndler(lead.lead_crm_id)}
              >View</Button>
            </TableCell> */}
              </TableRow>
            ))
            }
        </TableBody>
      </Table>
    </TableContainer>
     
  );
});
export default Leads;