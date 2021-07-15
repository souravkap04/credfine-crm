import React,{useState,useEffect } from 'react';
import { useHistory ,Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Dialog,DialogTitle,DialogContent} from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import axios from 'axios';
import baseUrl from '../../global/api';
import clickToCallApi from '../../global/callApi'
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
  },
  click:{
    cursor:'pointer',
    color:'blue'
  }
  
});
 const Leads = ((props) => {
  const classes = useStyles();
  const CancelToken = axios.CancelToken;
  let history = useHistory();
  const profileData = getProfileData();
  const [leadData,setLeadData] = useState([]);
  const [searchData,setSearchData] = useState([]);
  const [callingResponse,setCallingResponse] = useState('')
  const [isCalling,setIsCalling] = useState(false);
  const [isCallConnect,setIsCallConnect] = useState(false);
  const [onGoingCall,setOnGoingCall] = useState(false);
  const [isCallNotConnected,setIsCallNotConnected] = useState(false)
  
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

     await axios.get(`${baseUrl}/leads/lead_allocate/Low_credit`,{headers})
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
  const clickToCall = async (customerNo)=>{
    //  setIsCalling(true);
    const headers = {
      'accept':'application/json',
      'content-type':'application/json'
    };
    const item ={customer_number:customerNo,api_key:profileData.dialer_pass};
   // const item ={customer_number:customerNo,api_key:'6148e57e-4c9f-4378-8508-9cc0f00f79c7'};
    axios.interceptors.request.use((request)=>{
      setIsCalling(true);
      return request;
    })
    await axios.post(clickToCallApi, item , {headers})
     .then((response)=>{
      if(response.data.success){
        setIsCalling(false);
        setOnGoingCall(true);
      }else{
        setIsCallNotConnected(true)
      }
     }).catch((error)=>{
       console.log(error)
       if(error.message){
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
const callConnectHandler = ()=>{
  setIsCallConnect(false);
  setIsCallNotConnected(false)
}
const maskPhoneNo = (phoneNo)=>{
  let data = phoneNo;
  let unMaskdata = data.slice(-4);
  let maskData = '';
  for(let i =(data.length)-4;i>0;i--){
    if(profileData.user_roles[0].user_type === 3){
      maskData  += 'x';
     }else{
       maskData += data[i]
     }
  }
  let leadPhoneNo = maskData+unMaskdata;
  return leadPhoneNo;
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
            <TableCell className={classes.tableheading} >Campaign</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
          props.isSearchData? (
          searchData.length !== 0 ?
           searchData.map((search,index)=>{
            let leadPhoneNo = maskPhoneNo(search.phone_no);
             return(
            <TableRow key={index}>
            <TableCell className={classes.tabledata,classes.click}
            onClick={()=>routeChangeHAndler(search.lead_crm_id)}
            >{search.lead_crm_id} 
            </TableCell>
           <TableCell className={classes.tabledata}>{search.name}</TableCell>
           <TableCell className={classes.tabledata}>{leadPhoneNo}</TableCell>
           <TableCell className={classes.tabledata}>{search.loan_amount}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.dob}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.monthly_income}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.residential_pincode}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.current_company}</TableCell>
           <TableCell className={classes.tabledata}>{search.data.current_company_name}</TableCell>    
           <TableCell className={classes.tabledata}>{search.loan_type}</TableCell>
           <TableCell className={classes.tabledata}>{search.status}</TableCell>
           <TableCell className={classes.tabledata}>{search.sub_status}</TableCell>
           <TableCell className={classes.tabledata}>{search.campaign_category}</TableCell>
           <TableCell>
             <Tooltip title="Call Customer">
             <IconButton onClick={()=>clickToCall(search.phone_no)}>
               <CallIcon/>
             </IconButton>
             </Tooltip>
           </TableCell>
          </TableRow>
           )}) : <span className={classes.emptydata}> No Data Found </span> )
           
            : (leadData.length !== 0 ?
            leadData.map((lead,index)=>{
               let leadPhoneNo = maskPhoneNo(lead.phone_no);
              return (
              <TableRow key={index}>
              <TableCell className={classes.tabledata,classes.click}
              onClick={()=>routeChangeHAndler(lead.lead_crm_id)}
              >{lead.lead_crm_id} </TableCell>
              <TableCell className={classes.tabledata}>{lead.name}</TableCell>
              <TableCell className={classes.tabledata}>{leadPhoneNo}</TableCell>
              <TableCell className={classes.tabledata}>{lead.loan_amount}</TableCell>
              <TableCell className={classes.tabledata}>{lead.data['dob']}</TableCell>
              <TableCell className={classes.tabledata}>{lead.data['monthly_income']}</TableCell>
              <TableCell className={classes.tabledata}>{lead.data['current_company']}</TableCell>
              <TableCell className={classes.tabledata}>{lead.data['residential_pincode']}</TableCell>
              <TableCell className={classes.tabledata}>{lead.data['current_company_name']}</TableCell>    
              <TableCell className={classes.tabledata}>{lead.loan_type}</TableCell>
              <TableCell className={classes.tabledata}>{lead.status}</TableCell>
              <TableCell className={classes.tabledata}>{lead.sub_status}</TableCell>
              <TableCell className={classes.tabledata}>{lead.campaign_category}</TableCell>
              <TableCell>
             <Tooltip title="Call Customer">
             <IconButton onClick={()=>clickToCall(lead.phone_no)}>
               <CallIcon/>
             </IconButton>
             </Tooltip>
           </TableCell>
              </TableRow>
            )}) : <span className={classes.emptydata}> No Data Found </span>)
            }
            <>
            <Dialog open={onGoingCall}>
              <DialogContent>
                <p>On going call...</p>
              </DialogContent>
            </Dialog>
            </>
            <>
            <Dialog open={isCalling}>
              <DialogContent>
                <p>Call in progress...</p>
              </DialogContent>
            </Dialog>
            </>
            <>
            <Dialog open={isCallConnect} onClose={callConnectHandler}>
              <DialogContent>
                <p>Call rejected/missed call</p>
              </DialogContent>
            </Dialog>
            </>
            <>
            <Dialog open={isCallNotConnected} onClose={callConnectHandler}>
              <DialogContent>
                <p>Call not connected</p>
              </DialogContent>
            </Dialog>
            </>
        </TableBody>
      </Table>
    </TableContainer>
     
  );
});
export default Leads;