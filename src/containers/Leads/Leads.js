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
    padding:'0 8px',
    fontSize:'12px',
    textAlign:'center'
  },
  tabledata:{
    padding:'0 8px',
    fontSize:'12px',
    textAlign:'center'
  },
  emptydata:{
    position:'relative',
    left:'30rem',
    fontSize:'12px'
  }
  
});
 const Leads = ((props) => {
  const classes = useStyles();
  let history = useHistory();
  const profileData = getProfileData();
  const [leadData,setLeadData] = useState([]);
  const [searchData,setSearchData] = useState([]);
  
  useEffect(()=>{
      props.isSearchData ? fetchSearchData(props.searchInput) : fetchLeadsData()
  },[props.isSearchData])
  const fetchSearchData = async (key)=>{
    let headers = {'Authorization':`Token ${profileData.token}` }
    await axios.get(`${baseUrl}/leads/search/${key}`,{headers})
    .then((response)=>{
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
     setLeadData([response.data]);
    // localStorage.setItem('lead_allocate',JSON.stringify(response.data))
     }).catch((error)=>{
       console.log(error);
     })
   
   
   };
  
  const routeChangeHAndler = (leadId)=>{
   // props.userListCallback(leadId);
   //history.push(`/leadDetails/${leadId}`);
   props.mainMenuCallBack(true,leadId);
  
  }

  return (
      <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableheading}>Lead Id</TableCell>
            <TableCell className={classes.tableheading} >Name</TableCell>
            <TableCell className={classes.tableheading} >Phone No</TableCell>
            <TableCell className={classes.tableheading} >Loan Amount</TableCell>
            <TableCell className={classes.tableheading} >Date of Birth</TableCell>
            <TableCell className={classes.tableheading}>Monthly Income</TableCell>
            <TableCell className={classes.tableheading} >Current Company</TableCell>
            <TableCell className={classes.tableheading} >Pin Code</TableCell>
            <TableCell className={classes.tableheading} >Company Name</TableCell>
            <TableCell className={classes.tableheading} >Loan Type</TableCell>
            <TableCell className={classes.tableheading} >Status</TableCell>
            <TableCell className={classes.tableheading} >Sub Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
          props.isSearchData? (
          searchData.length !== 0 ?
           searchData.map((search,index)=>(
            <TableRow>
            <TableCell align="center" 
            style={{cursor:'pointer',color:'blue'}}
            onClick={()=>routeChangeHAndler(search.lead_crm_id)}
            >{search.lead_crm_id} 
            </TableCell>
           <TableCell className={classes.tabledata}>{search.name}</TableCell>
           <TableCell className={classes.tabledata}>{search.phone_no}</TableCell>
           <TableCell className={classes.tabledata}>{search.loan_amount}</TableCell>
          <TableCell className={classes.tabledata}>{search.data.dob}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.monthly_income}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.residential_pincode}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.current_company}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.current_company_name}</TableCell>    
           <TableCell className={classes.tabledata}>{search.loan_type}</TableCell>
           <TableCell className={classes.tabledata}>{search.status}</TableCell>
           <TableCell className={classes.tabledata}>{search.sub_status}</TableCell>
          </TableRow>
           )) : <span className={classes.emptydata}> No Data Found </span> )
           
            : (leadData.length !== 0 ?
            leadData.map((lead)=>(
              <TableRow>
              <TableCell align="center" 
              style={{cursor:'pointer',color:'blue'}}
              onClick={()=>routeChangeHAndler(lead.lead_crm_id)}
              >{lead.lead_crm_id} </TableCell>
            <TableCell className={classes.tabledata}>{lead.name}</TableCell>
            <TableCell className={classes.tabledata}>{lead.phone_no}</TableCell>
            <TableCell className={classes.tabledata}>{lead.loan_amount}</TableCell>
             <TableCell className={classes.tabledata}>{lead.data['dob']}</TableCell>
             <TableCell className={classes.tabledata}>{lead.data['monthly_income']}</TableCell>
            <TableCell className={classes.tabledata}>{lead.data['current_company']}</TableCell>
            <TableCell className={classes.tabledata}>{lead.data['residential_pincode']}</TableCell>
            <TableCell className={classes.tabledata}>{lead.data['current_company_name']}</TableCell>    
            <TableCell className={classes.tabledata}>{lead.loan_type}</TableCell>
            <TableCell className={classes.tabledata}>{lead.status}</TableCell>
            <TableCell className={classes.tabledata}>{lead.sub_status}</TableCell>
              </TableRow>
            )) : <span className={classes.emptydata}> No Data Found </span>)
            }
        </TableBody>
      </Table>
    </TableContainer>
     
  );
});
export default Leads;