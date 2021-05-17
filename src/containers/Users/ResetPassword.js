import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import {Form } from 'react-bootstrap';
import * as ReactBootstrap from "react-bootstrap";
import axios from 'axios';
import baseUrl from '../../global/api';
const useStyles = makeStyles({
  container:{
    overflow: 'auto',
    maxHeight: '550px'
},
header:{
  position: 'sticky',
  top: 0,
},
  table: {
    Width: "100%",
  },
  loader: {
    position: "relative",
    left: "35em",
  },
  cnfrmPasswordBtn:{
    borderRadius:'15px' ,
    backgroundColor: '#13B980',
    fontSize: '15px',
    fontFamily: 'Lato',
    margin: '0 55px',
     padding: 0,
     width: '50%',
     color:'white',
     '&:hover':{
       backgroundColor:'#447d40'
     }
  }
  
});
export default function Users() {
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  const [errors,setErrors] = useState({});
  const [rowData,setRowData] = useState({});
  const [alertMessage,setAlertMessage] = useState('');
  const [isDisplay,setIsDisplay] = useState(false);
  const handleClickOpen = (userName,index)=>{
    setOpen(true);
    setRowData(userName);
    console.log(userName,index);
    
  }
  const handleClose = ()=>{
    setOpen(false);
  }
  const findErrors = ()=>{
    const newErrors = {};
    if(!password || password === '' ){
      newErrors.password = 'This is required field'
      console.log(password.length);
    }
    else if(password.length < 6){
      
       newErrors.password = 'password should be 6 or more than 6 characters'
    }
    if(password !== confirmPassword){
      newErrors.cnfrmPassword = 'confirm password not match'
    }
    else if(!confirmPassword || confirmPassword === ''){
      newErrors.cnfrmPassword = 'This is required field'
    }
    return newErrors;
  }
  const confirmPasswordHandler = async (event) =>{
    const newErrors = findErrors();
    setErrors(newErrors);
    event.preventDefault();
    console.log("password:"+ password);
    console.log("Cpassword:"+ confirmPassword);
    console.log("rodata:"+rowData);
    console.log(newErrors);
    if(Object.keys(newErrors).length === 0){
      const headers = {
        'userRoleHash': 'f63e2d14-b15a-11eb-bc7e-000000000013',
    };
   let item = {username:rowData, password:password};
       try{
        await axios.post(`${baseUrl}/user/changePassword/`,item,{headers})
        .then((response)=>{
          console.log(response);
          setAlertMessage(response.data.message);
          setIsDisplay(true);
        })
       }catch(error){
         console.log(error);
         setAlertMessage("something wrong");
          setIsDisplay(true);
       }
    }
    
  }
  useEffect(()=>{
    const fetchUserData = async ()=>{
      const headers = {
        'userRoleHash': 'f63e2d14-b15a-11eb-bc7e-000000000013',
    };
     try{
     const response = await axios.get(`${baseUrl}/user/fetchUsers/`,{headers});
     console.log(response.data);
     setUsers(response.data);
     setLoading(true);
     }catch(error){
       console.log(error);
     }
    };
    fetchUserData();
  },[])
  
  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>USER NAME</TableCell>
            <TableCell>FIRST NAME</TableCell>
            <TableCell>LAST NAME</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>DIALER ID</TableCell>
            <TableCell>DIALER PASS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {loading ? users.map((user,index)=>(
              <TableRow key={index}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.dialer_id}</TableCell>
              <TableCell>{user.dialer_pass}</TableCell>
              <TableCell>
                  <Button variant="outlined" color="secondary" onClick={()=>handleClickOpen(user.username,index)}>
                      Reset Password
                  </Button>
                  </TableCell>
          </TableRow>
            )) : 
              <div className={classes.loader}>
                    <ReactBootstrap.Spinner animation="border" />
              </div>
            }
            
              <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
              <DialogContent>
                 <Form  onSubmit={confirmPasswordHandler}>
                 {isDisplay ? <ReactBootstrap.Alert variant="primary">{alertMessage}</ReactBootstrap.Alert> : null}
                   <Form.Group>
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                     autoFocus
                     type="password"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     isInvalid={!!errors.password}/>
                       <Form.Control.Feedback type="invalid"> {errors.password}</Form.Control.Feedback>
                   </Form.Group>
                   <Form.Group>
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control
                     type="password"
                     value={confirmPassword}
                     onChange={(e)=>setConfirmPassword(e.target.value)}
                     isInvalid={!!errors.cnfrmPassword}/>
                      <Form.Control.Feedback type="invalid"> {errors.cnfrmPassword}</Form.Control.Feedback>
                   </Form.Group>
                   <Button type="submit" className={classes.cnfrmPasswordBtn}>
                     Submit</Button>
                 </Form>
              </DialogContent>
              </Dialog> 
        </TableBody>
      </Table>
    </TableContainer>
  );
}
