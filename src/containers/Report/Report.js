import React, { useState, useEffect } from 'react'
import style from './Report.module.css';
import moment from 'moment';
import axios from 'axios';
import baseUrl from '../../global/api'
import { getProfileData, getStatusData } from '../../global/leadsGlobalData';
import { Form, Card, Row, Col, FormControl } from "react-bootstrap";
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import './reportdata.css';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  container: {
    overflow: 'auto',
    marginBottom: '10px',
    maxHeight: '300px'
  },
  table: {
    width: '95%',
    margin: 'auto'
  },
  tableheading: {
    backgroundColor: '#8f9bb3',
    color: '#ffffff',
    fontSize: '14px',
  },
  tabledata: {
    padding: '15px',
    fontSize: '12px',
    overflowWrap: 'break-word',
  },
  emptydata: {
    position: 'relative',
    left: '30rem',
    fontSize: '12px'
  },
  oddEvenRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f7f9fc',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#fff',
    },
  },
  editReportBtn: {
    borderRadius: '15px',
    backgroundColor: '#13B980',
    fontSize: '15px',
    margin: 'auto',
    marginTop: '12px',
    marginBottom: '12px',
    padding: '5px',
    width: '50%',
    color: 'white',
    '&:hover': {
      backgroundColor: '#447d40'
    }
  }
});
export default function Report() {
  const [openCalculate, setopenCalculate] = useState(false);
  const [checkEligibility,setCheckEligibility] = useState(false);
  
  const openEligibility = () =>{
    setCheckEligibility(true);
  }
  const closeEligibility = () =>{
    setCheckEligibility(false);
  }
  const openCalculator = () => {
    setopenCalculate(true);
  }
  const closeCalculator = () => {
    setopenCalculate(false);
  }
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [productType, setProductType] = useState("");
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);
  const [leadHistoryData, setleadHistoryData] = useState([]);
  const [errors, setErrors] = useState({});
  const profileData = getProfileData();
  const statusData = getStatusData();

  const findErrors = (sDate, eDate) => {
    let newErrors = {};
    let selectedStartDate = moment(sDate, 'YYYY-MM-DD');
    let selectedEndDate = moment(eDate, 'YYYY-MM-DD');
    let dateDiff = selectedEndDate.diff(selectedStartDate, 'days')

    if (!startDate || startDate === '') {
      newErrors.startDate = 'This is requires field'
    }
    if (!endDate || endDate === '') {
      newErrors.endDate = 'This is required field'
    }
    if (dateDiff > 30) {
      newErrors.endDate = 'Start Date and End Date should be with in 30 days'
    }
    return newErrors;
  }
  const removeDuplicateStatus = (data) => {
    let unique = [];
    data.forEach((element) => {
      if (!unique.includes(element.status)) {
        unique.push(element.status)
      }
    })
    return unique;
  }
  const uniqueStatus = removeDuplicateStatus(statusData);

  const reportSubmit = async (event) => {
    const newErrors = findErrors(startDate, endDate);
    setErrors(newErrors);
    event.preventDefault()
    if (Object.keys(newErrors).length === 0) {
      const headers = { 'Authorization': `Token ${profileData.token}` }
      let item = { start_date: startDate, end_date: endDate }
      await axios.post(`${baseUrl}/leads/lead_report/`, item, { headers })
        .then((response) => {
          if (response.status === 200) {
            setStartDate('')
            setEndDate('')
            setStatus('')
            setProductType('')
            leadReportHistory()
          }
          setAlertMessage(response.data.msg);
          setIsDisplay(true)
        }).catch((error) => {
          setAlertMessage("Something Wrong");
          setIsDisplay(true);
        })
    }
  }
  const leadReportHistory = async () => {
    const headers = { 'userRoleHash': profileData.user_roles[0].user_role_hash }
    await axios.get(`${baseUrl}/leads/leadReportHistory/`, { headers })
      .then((response) => {
        if (response.status === 200) {
          setleadHistoryData(response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
  }
  const closeReport = () => {
    setIsDisplay(false)
  }
  useEffect(() => {
    leadReportHistory()
  }, []);
  return (
    <PageLayerSection ActualEmiCalculate={openCalculator} ActualEligibilityCalculate={openEligibility}>
      <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility}/>
      <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
      <div>
        <Form onSubmit={reportSubmit}>
          <Card className={style.card}>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isDisplay} autoHideDuration={1500} onClose={closeReport}>
              <Alert onClose={closeReport} severity="info">
                {alertMessage}
              </Alert>
            </Snackbar>
            <Form.Label className={style.Heading}>Report</Form.Label>
            <Row>
              <Col>
                <TextField
                  type="date"
                  className="textFieldReport"
                  id="outlined-full-width"
                  label="Start Date"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    max: moment().format('YYYY-MM-DD')
                  }}
                  variant="outlined"
                  size="small"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  onFocus={() => setErrors("")}
                />
              </Col>
              <Col>
                <TextField
                  type="date"
                  className="textFieldReport"
                  id="outlined-full-width"
                  label="Start Date"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  size="small"
                  value={endDate}
                  inputProps={{
                    min: startDate,
                    max: moment().format('YYYY-MM-DD')
                  }}
                  onChange={(e) => setEndDate(e.target.value)}
                  error={!!errors.endDate}
                  helperText={errors.endDate}
                  onFocus={() => setErrors("")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  select
                  className="textFieldReport"
                  id="outlined-full-width"
                  label="Status"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true
                  }}
                  variant="outlined"
                  size="small"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select One</option>
                  {uniqueStatus.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </TextField>
              </Col>
              <Col>
                <TextField
                  select
                  className="textFieldReport"
                  id="outlined-full-width"
                  label="Product Type"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true
                  }}
                  variant="outlined"
                  size="small"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option value="">Select One</option>
                  <option value="PL">Personal Loan</option>
                  <option value="BL">Business Loan</option>
                </TextField>
              </Col>
            </Row>
            <Button className={classes.editReportBtn} type="submit"
              variant="success">SUBMIT</Button>
          </Card>
        </Form>
      </div>
      <TableContainer className={classes.container}>
        <Table className={classes.table} >
          <TableHead className={classes.tableheading}>
            <TableRow>
              <TableCell className={classes.tableheading}>Sr No</TableCell>
              <TableCell className={classes.tableheading}>User ID</TableCell>
              <TableCell className={classes.tableheading}>User Name</TableCell>
              <TableCell className={classes.tableheading}>Start Date</TableCell>
              <TableCell className={classes.tableheading}>End Date</TableCell>
              <TableCell className={classes.tableheading}>Updated Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leadHistoryData.length !== 0 ?
              leadHistoryData.map((item, index) => {
                let time = new Date(item.updated_date);
                let updatedTime = time.toLocaleTimeString();
                return (
                  <TableRow className={classes.oddEvenRow}>
                    <TableCell className={classes.tabledata}>{(index + 1)}</TableCell>
                    <TableCell className={classes.tabledata}>{item.user_name}</TableCell>
                    <TableCell className={classes.tabledata}>{item.user}</TableCell>
                    <TableCell className={classes.tabledata}>{item.query.start_date}</TableCell>
                    <TableCell className={classes.tabledata}>{item.query.end_date}</TableCell>
                    <TableCell className={classes.tabledata}>{updatedTime}</TableCell>
                  </TableRow>
                )
              }) : <span className={classes.emptydata}>No Data Found</span>}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayerSection>
  )
}
