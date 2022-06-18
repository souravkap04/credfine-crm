import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import "./freshLead.css";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import clsx from 'clsx';
import filter from "../../images/filter.png";
import Checkbox from '@material-ui/core/Checkbox';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
import { Drawer } from '@mui/material';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  container: {
    maxHeight: '67vh',
    marginBottom: '10px'
  },
  table: {
    width: '100%',
  },
  tableheading: {
    backgroundColor: '#8f9bb3',
    color: '#ffffff',
    fontSize: '14px',
  },
  tabledata: {
    fontSize: '12px',
  },
  numberOfTotalCount: {
    marginRight: '25px'
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
  },
});
export default function FreshLead() {
  const classes = useStyles();
  const profileData = getProfileData();
  const [freshLeads, setFreshLeads] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalUploadLeads, setTotalUploadLeads] = useState(0);
  const [deleteCount, setDeleteCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalDataPerPage, settotalDataPerPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [uploadedFrom, setUploadedFrom] = useState("");
  const [uploadedTo, setUploadedTo] = useState('');
  const [loanType, setLoanType] = useState('');
  const [campaign, setCampaign] = useState('');
  const [isBulkDelete, setIsBulkDelete] = useState(false)
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [totalDeleteLeads, setTotalDeleteLeads] = useState(0);
  const splitUrl = (data) => {
    if (data !== null) {
      const [url, pager] = data.split('?');
      return pager;
    }
  }
  useEffect(() => {
    fetchFreshLeads();
  }, [deleteCount])
  const fetchFreshLeads = async () => {
    setisLoading(true)
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
        setisLoading(false)
      }).catch((error) => {
        if (error.response.status === 401) {
          setAlertMessage(error.response.data.error)
          setIsError(true)
        } else {
          console.log(error)
        }
      })
  };
  const nextPageHandler = async () => {
    setisLoading(true)
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
        setisLoading(false)
      }).catch((error) => {
        if (error.response.status === 401) {
          setAlertMessage(error.response.data.error)
          setIsError(true)
        } else {
          console.log(error)
        }
      })
  }
  const prevPageHandler = async () => {
    setisLoading(true)
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
        setisLoading(false)
      }).catch((error) => {
        if (error.response.status === 401) {
          setAlertMessage(error.response.data.error)
          setIsError(true)
        } else {
          console.log(error)
        }
      })
  }

  const deleteFreshLead = async (leadId) => {
    setisLoading(true)
    const data = { lead_crm_id: leadId };
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': `${profileData.user_roles[0].user_role_hash}`,
    };
    await axios.delete(`${baseUrl}/leads/freshLeads/`, { headers, data })
      .then((response) => {
        setDeleteCount(deleteCount + 1);
        setisLoading(false)
      }).catch((error) => {
        console.log(error);
      })
  }
  const decryptedData = (encryptData) => {
    const phoneNo = decodeURIComponent(window.atob(encryptData));
    return phoneNo;
  }
  const [openCalculate, setopenCalculate] = useState(false);
  const [checkEligibility, setCheckEligibility] = useState(false);

  const openEligibility = () => {
    setCheckEligibility(true);
  }
  const closeEligibility = () => {
    setCheckEligibility(false);
  }
  const openCalculator = () => {
    setopenCalculate(true);
  }
  const closeCalculator = () => {
    setopenCalculate(false);
  }
  const openDrawer = () => {
    setIsDrawer(true)
  }
  const closeDrawer = () => {
    setIsDrawer(false)
  }
  const filteredDataHandler = async (event) => {
    event.preventDefault();
    if (uploadedFrom === '') {
      setAlertMessage('Invalid Uploaded From');
      setIsError(true)
      return;
    } else if (uploadedTo === '') {
      setAlertMessage('Invalid Uploaded To');
      setIsError(true)
      return;
    } else if (loanType === '') {
      setAlertMessage('Invalid Loan Type');
      setIsError(true)
      return;
    } else if (campaign === '') {
      setAlertMessage('Invalid Campaign');
      setIsError(true)
      return;
    }
    closeDrawer();
    setisLoading(true)
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': `${profileData.user_roles[0].user_role_hash}`,
    };
    await axios.get(`${baseUrl}/leads/freshLeads/?campaign=${campaign}&loan_type=${loanType}&uploaded_from=${uploadedFrom}&uploaded_to=${uploadedTo}`, { headers })
      .then((response) => {
        setRowsPerPage(response.data.results.length)
        settotalDataPerPage(response.data.results.length)
        setFreshLeads(response.data.results);
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setTotalUploadLeads(response.data.count);
        setisLoading(false)
      }).catch((error) => {
        console.log(error)
      })
  }
  const bulkDeleteHandler = () => {
    setIsBulkDelete(true)
  }
  const confirmBulkDelete = async () => {
    setIsBulkDelete(false)
    const data = { uploaded_from: uploadedFrom, uploaded_to: uploadedTo, loan_type: loanType, campaign: campaign };
    const headers = {
      'Authorization': `Token ${profileData.token}`,
      'userRoleHash': `${profileData.user_roles[0].user_role_hash}`,
    }
    await axios.delete(`${baseUrl}/leads/bulkDeleteLead/`, { headers, data })
      .then((response) => {
        if (response.status === 200) {
          setTotalDeleteLeads(response.data.total)
          setAlertMessage(response.data.msg)
          setIsSuccess(true)
          fetchFreshLeads();
          setUploadedFrom('')
          setUploadedTo('')
          setLoanType('')
          setCampaign('')
        }
      }).catch((error) => {
        if (error.response.status === 400) {
          setAlertMessage(error.response.data.msg)
          setIsError(true)
        } else if (error.response.status === 401) {
          setAlertMessage(error.response.data.error)
          setIsError(true)
        }
        else {
          console.log(error)
        }
      })
  }
  const closeSnackbar = () => {
    setIsError(false)
    setIsSuccess(false)
  }
  const closePopupHandler = () => {
    setIsBulkDelete(false)
    fetchFreshLeads();
    setUploadedFrom('')
    setUploadedTo('')
    setLoanType('')
    setCampaign('')
  }
  return (
    <PageLayerSection ActualEmiCalculate={openCalculator} ActualEligibilityCalculate={openEligibility}>
      <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility} />
      <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isError}
        autoHideDuration={10000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSuccess}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="info">
          {totalDeleteLeads + " " + alertMessage}
        </Alert>
      </Snackbar>
      <div className='mainContainer'>
        <h3>Fresh Leads({totalUploadLeads})</h3>
        <div className="filterBtnContainer" onClick={openDrawer}>
          <div className="filterImage">
            <img src={filter} alt="" />
          </div>
          <div className="filterText">FILTER</div>
        </div>
      </div>
      <Drawer anchor='right' open={isDrawer} onClose={closeDrawer}>
        <div className='rightSideContainer'>
          <form onSubmit={filteredDataHandler}>
            <Grid container justifyContent="flex-start">
              <h4>Search Here</h4>
            </Grid>
            <Grid>
              <TextField
                className='textField'
                type="date"
                id="outlined-full-width"
                label="Uploaded From"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                value={uploadedFrom}
                onChange={(e) => setUploadedFrom(e.target.value)} />
            </Grid>
            <Grid>
              <TextField
                className='textField'
                type="datetime-local"
                id="outlined-full-width"
                label="Uploaded To"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                value={uploadedTo}
                onChange={(e) => setUploadedTo(e.target.value)} />
            </Grid>
            <Grid>
              <TextField
                className="textField"
                select
                id="outlined-full-width"
                label="Loan Type"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
                size="small"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="PL">Personal Loan</option>
                <option value="BL">Business Loan</option>
                <option value="CC">Credit Card</option>
                <option value="HL">Home Loan</option>
                <option value="LAP">Loan Against Property</option>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                className='textField'
                id="outlined-full-width"
                label="Campaign"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value.toUpperCase())} />
            </Grid>
            <Grid>
              <Button
                className='submitBtn'
                type='submit'
                color='primary'
                variant='contained'>
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </Drawer>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead className={classes.tableheading}>
            <TableRow>
              <TableCell className={classes.tableheading}>SL NO</TableCell>
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
            {isLoading ? <div className="loader">
              <CircularProgress size={100} thickness={3} />
            </div> : freshLeads.length !== 0 ?
              freshLeads.map((lead, index) => {
                return (
                  <TableRow className={classes.oddEvenRow} key={index}>
                    <TableCell className={classes.tabledata}>{index + 1}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.lead_crm_id}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.name ? lead.name : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.phone_no_encrypt ? decryptedData(lead.phone_no_encrypt) : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.loan_amount ? lead.loan_amount : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.monthly_income ? lead.data.monthly_income : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.data.current_company_name ? lead.data.current_company_name : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.loan_type ? lead.loan_type : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <div className={classes.loanTypeButton}>
                        <div className={classes.loanButtonText}>{lead.status}</div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tabledata}>{lead.sub_status ? lead.sub_status : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>{lead.campaign_category ? lead.campaign_category : 'NA'}</TableCell>
                    <TableCell className={classes.tabledata}>
                      <Tooltip title="Delete Lead">
                        <IconButton
                          onClick={() => deleteFreshLead(lead.lead_crm_id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
              : <span className={classes.emptydata}>No Data Found</span>}
            <>
              <Dialog open={isBulkDelete}>
                <DialogTitle>Are You Want to Delete Fresh Leads?</DialogTitle>
                <DialogContent className='confirmDialogContainer'>
                  <Button className='deleteButton'
                    color='primary'
                    variant="contained"
                    onClick={confirmBulkDelete}>Yes</Button>
                  <Button className='deleteButton'
                    color='primary'
                    variant="contained"
                    onClick={closePopupHandler}>No</Button>
                </DialogContent>
              </Dialog>
            </>
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading ? '' : <div className="paginationContainer">
        <div className='bulkDeletedContainer'>
          <Button
            className='bulkDeleteBtn'
            disabled={!uploadedFrom && !uploadedTo && !loanType && !campaign}
            startIcon={<DeleteIcon />}
            onClick={bulkDeleteHandler}
          >
            Bulk Delete</Button>
        </div>
        <div className="paginationRightContainer">
          <div className="rowsPerPage">Rows Per Page: {rowsPerPage}</div>
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
      </div>}
    </PageLayerSection>
  )
}
