import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CallIcon from "@material-ui/icons/Call";
import axios from "axios";
import baseUrl from "../../global/api";
import {
  haloocomNoidaDialerApi,
  haloocomMumbaiDialerApi,
  cloudDialerApi,
  dialerToken
} from "../../global/callApi";
import { getProfileData } from "../../global/leadsGlobalData";
import { useQueryy } from "../../global/query";
import PageLayerSection from "../PageLayerSection/PageLayerSection";
import { Drawer } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import "./leadDetailsAdjust.css";
import clsx from "clsx";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import EmiCalculator from '../Emicalculator/EmiCalculator';
import EligibilityCalculator from "../EligibilityCalculator/EligibilityCalculator";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  container: {
    // margin: '25px'
  },
  table: {
    width: "100%",
  },
  tableheading: {
    backgroundColor: "#8f9bb3",
    color: "#ffffff",
    fontSize: "14px",
  },
  statusHeading: {
    textAlign: "center",
  },
  checkboxFix: {
    color: "#ffffff",
  },
  tabledata: {
    fontSize: "12px",
  },
  emptydata: {
    position: "absolute",
    left: "40rem",
    fontSize: "16px",
    whiteSpace: 'nowrap'
  },
  click: {
    cursor: "pointer",
    color: "blue",
  },
  callButton: {
    backgroundColor: "#14cc9e",
    padding: "9px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.4)",
    },
  },
  callIcon: {
    color: "#ffffff",
    fontSize: "17px",
  },
  callingBtn: {
    margin: "20px",
  },
  oddEvenRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f7f9fc",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#fff",
    },
  },
  loanTypeButton: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "auto",
    height: "auto",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "35px",
    backgroundColor: "#3ec68c",
  },
  loanButtonText: {
    fontSize: "0.8vw",
    textAlign: "center",
    color: "#fff",
    // width: '75px',
    whiteSpace: "nowrap",
    wordBreak: "break-word",
  },
});
export default function Leads() {
  const classes = useStyles();
  const queryy = useQueryy();
  const leadQuery = queryy.get("query") || "";
  let history = useHistory();
  const profileData = getProfileData();
  const [leadData, setLeadData] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [isSearchData, setisSearchData] = useState(false);
  const [dialerCall, setDialerCall] = useState(false);
  const [state, setState] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [date, setDate] = useState("");
  const [pincode, setPincode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [campaign, setCampaign] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAutoDialerStart, setIsAutoDialerStart] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [monthlyIncome, setmonthlyIncome] = useState("");
  const [formError, setformError] = useState([false, false, false]);
  const [openCalculate, setopenCalculate] = useState(false);
  const [checkEligibility, setCheckEligibility] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
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
  useEffect(() => {
    leadQuery ? fetchSearchData(leadQuery) : fetchLeadsData();
  }, [leadQuery]);
  const fetchSearchData = async (key) => {
    setisSearchData(true);
    setisLoading(true);
    let headers = { Authorization: `Token ${profileData.token}` };
    await axios
      .get(`${baseUrl}/leads/search/${key}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          setSearchData(response.data);
          setisLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setResponseStatus('This Lead Owned By Someone Else Kindly Connect Your Product Team swati@credfine.com');
          setAlertMessage('Lead Already Exist');
          setIsError(true);
          setisLoading(false);
        }
        if (error.response.status === 400) {
          setResponseStatus('No Data Found In Our CRM You Can Create a New Lead From Manual Lead Creation');
          setAlertMessage('No Record Found');
          setIsError(true);
          setisLoading(false);
        } else {
          console.log(error);
        }
      });
  };
  const fetchLeadsData = async () => {
    setisLoading(true);
    const headers = {
      Authorization: `Token ${profileData.token}`,
      userRoleHash: profileData.user_roles[0].user_role_hash,
    };

    await axios
      .get(`${baseUrl}/leads/lead_allocate/${profileData.campaign_category}`, {
        headers,
      })
      .then((response) => {
        setLeadData(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const routeChangeHAndler = (leadId) => {
    history.push(`/dashboards/leads/edit/${leadId}`);
  };

  const clickToCall = async (encryptData, leadID) => {
    const customerNo = decodeURIComponent(window.atob(encryptData));
    if (profileData.dialer === "HALOOCOM-Noida") {
      await axios.post(`${haloocomNoidaDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`)
        .then((response) => {
          setDialerCall(true);
          if (response.status === 200) {
            localStorage.setItem("callHangUp", true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        history.push(`/dashboards/leads/edit/${leadID}`);
      }, 1500);
    } else if (profileData.dialer === "HALOOCOM-Mumbai") {
      await axios.post(`${haloocomMumbaiDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`)
        .then((response) => {
          setDialerCall(true);
          if (response.status === 200) {
            localStorage.setItem("callHangUp", true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        history.push(`/dashboards/leads/edit/${leadID}`);
      }, 1500);
    } else if (profileData.dialer === "CLOUD-DIALER") {
      await axios.post(`${cloudDialerApi}/slashRtc/callingApis/clicktoDial?agenTptId=${profileData.slashrtc_id}&customerNumber=${customerNo}&tokenId=${dialerToken}`)
        .then((response) => {
          setDialerCall(true);
          if (response.status === 200) {
            if (response.data.LOG === 'ERROR') {
              setAlertMessage(response.data.OUTPUT);
              setIsError(true);
            } else if (response.data.LOG === 'SUCCESS') {
              setDialerCall(true);
              localStorage.setItem('callRefId', response.data.JSON_INFO)
              localStorage.setItem('callHangUp', true)
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        history.push(`/dashboards/leads/edit/${leadID}`);
      }, 1500);
    }
  };
  const maskPhoneNo = (phoneNo) => {
    let data = decodeURIComponent(window.atob(phoneNo));
    let unMaskdata = data.slice(-4);
    let maskData = "";
    for (let i = data.length - 4; i > 0; i--) {
      maskData += "x";
    }
    let leadPhoneNo = maskData + unMaskdata;
    if (
      profileData.user_roles[0].user_type === 2 ||
      profileData.user_roles[0].user_type === 3 ||
      profileData.user_roles[0].user_type === 5 ||
      profileData.user_roles[0].user_type === 6
    ) {
      return leadPhoneNo;
    } else {
      return data;
    }
  };
  const disableDialerPopUp = () => {
    setDialerCall(false);
  };
  const personalLoanSubmitHandler = async () => {
    let formErrorData = [...formError];
    if (firstName === "") formErrorData[0] = true;
    if (lastName === "") formErrorData[2] = true;
    if (mobileNo === "" || mobileNo.length !== 10) formErrorData[1] = true;

    if (firstName == "" || lastName === "" || (mobileNo == "" || mobileNo.length !== 10)) {
      setformError(formErrorData);
      return;
    }
    let item = {
      loan_amount: loanAmount,
      monthly_income: monthlyIncome,
      dob: date,
      phone_no: mobileNo,
      residential_pincode: pincode,
      current_company_name: companyName,
      first_name: firstName,
      last_name: lastName,
      loan_type: profileData.user_roles[0].allowed_products[0] === "PL" ? "PL" : "BL",
      current_company: currentCompany,
      employment_type: employmentType,
      campaign_category: campaign,
    };
    let headers = {
      Authorization: `Token ${profileData.token}`,
      "Content-Type": "application/json",
    };
    await axios
      .post(`${baseUrl}/leads/lead_create/`, item, { headers })
      .then((response) => {
        if (response.status === 201) {
          setAlertMessage(response.data.message);
          setIsDisplay(true);
        }
        if (response.status === 200) {
          setAlertMessage(response.data.message);
          setIsError(true);
          return;
        }
        setTimeout(() => {
          closeDrawer();
          fetchLeadsData();
        }, 1500);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setAlertMessage("Mobile Number Already Exist");
          setIsError(true);
        } else {
          setAlertMessage("Something wrong");
          setIsError(true);
        }
      });
  };
  const openDrawer = () => {
    setState(true);
  };
  const closeDrawer = () => {
    setState(false);
    setFirstName("");
    setLastName("");
    setmobileNo("");
    setmonthlyIncome("");
    setCampaign("");
    setformError([false, false, false]);
  };
  const closeSnankBar = () => {
    setIsDisplay(false);
    setIsError(false);
    setIsAutoDialerStart(false);
  };
  const autoDialerHandler = () => {
    localStorage.setItem("auto_dialer", true);
    setIsAutoDialerStart(true);
    clickToCall(leadData.phone_no_encrypt, leadData.lead_crm_id);
  };
  useEffect(() => {
    if (localStorage.getItem("auto_dialer") && Object.keys(leadData).length !== 0) {
      clickToCall(leadData.phone_no_encrypt, leadData.lead_crm_id)
    }
  }, [leadData]);
  return (
    <PageLayerSection isDisplaySearchBar={true}
      addLeadButton={state ? false : true}
      onClick={() => openDrawer()}
      startAutoDialerButton={true}
      startAutoDialerClick={() => autoDialerHandler()}
      ActualEmiCalculate={openCalculator}
      ActualEligibilityCalculate={openEligibility}
    >
      <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility} />
      <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isAutoDialerStart}
        autoHideDuration={1500}
        onClose={closeSnankBar}
      >
        <Alert onClose={closeSnankBar} severity="info">
          Auto dialer mode is on
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={dialerCall}
        autoHideDuration={3000}
        onClose={disableDialerPopUp}
      >
        <Alert onClose={disableDialerPopUp} severity="info">
          Calling...
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isDisplay}
        autoHideDuration={1500}
        onClose={closeSnankBar}
      >
        <Alert onClose={closeSnankBar} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isError}
        autoHideDuration={1500}
        onClose={closeSnankBar}
      >
        <Alert onClose={closeSnankBar} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Drawer anchor="right" open={state} onClose={closeDrawer}>
        <div className="rightContainerForm">
          <form>
            <Grid container justifyContent="flex-start">
              <h4>Add New Lead</h4>
            </Grid>
            <Grid>
              <TextField
                className="textField"
                type="text"
                id="outlined-full-width"
                label="First Name"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                }}
                variant="outlined"
                size="small"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => {
                  let formErrorData = [...formError];
                  formErrorData[0] = false;
                  setformError(formErrorData);
                }}
                error={formError[0]}
                helperText={
                  formError[0] ? "Please Enter a Valid First Name" : ""
                }
              />
            </Grid>
            <Grid>
              <TextField
                className="textField"
                type="text"
                id="outlined-full-width"
                label="Last Name"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                }}
                variant="outlined"
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => {
                  let formErrorData = [...formError];
                  formErrorData[2] = false;
                  setformError(formErrorData);
                }}
                error={formError[2]}
                helperText={
                  formError[2] ? "Please Enter a Valid Last Name" : ""
                }
              />
            </Grid>
            <Grid>
              <TextField
                className="textField"
                id="outlined-full-width"
                label="Mobile Number"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                }}
                inputProps={{
                  maxLength: 10,
                }}
                variant="outlined"
                size="small"
                value={mobileNo}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setmobileNo(e.target.value);
                  }
                }}
                onFocus={() => {
                  let formErrorData = [...formError];
                  formErrorData[1] = false;
                  setformError(formErrorData);
                }}
                error={formError[1]}
                helperText={formError[1] ? "Mobile no is required" : ""}
              />
            </Grid>
            <Grid>
              <TextField
                className="textField"
                id="outlined-full-width"
                label="Net Monthly Income"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  required: false,
                }}
                inputProps={{
                  maxLength: 8,
                }}
                variant="outlined"
                size="small"
                value={monthlyIncome}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setmonthlyIncome(e.target.value);
                  }
                }}
              />
            </Grid>
            <Grid>
              <TextField
                className="textField"
                select
                type="text"
                // id="outlined-full-width"
                label="Campaign"
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
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
              >
                <option value="">Select</option>
                <option value="OWN_LEAD">OWN LEAD</option>
              </TextField>
            </Grid>
            <Grid>
              <Button
                onClick={() => personalLoanSubmitHandler()}
                className="submitBtn"
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </Drawer>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableheading}>
            <TableRow>
              <TableCell className={classes.tableheading}>Lead ID</TableCell>
              <TableCell className={classes.tableheading}>First Name</TableCell>
              <TableCell className={classes.tableheading}>Last Name</TableCell>
              <TableCell className={classes.tableheading}>Mobile</TableCell>
              <TableCell className={classes.tableheading}>Loan Amt</TableCell>
              <TableCell className={classes.tableheading}>Income</TableCell>
              <TableCell className={classes.tableheading}>Company</TableCell>
              <TableCell className={classes.tableheading}>Loan Type</TableCell>
              <TableCell className={classes.tableheading}>Campaign</TableCell>
              <TableCell
                className={clsx(classes.tableheading, classes.statusHeading)}
              >
                Status
              </TableCell>
              <TableCell className={classes.tableheading}>Sub Status</TableCell>
              <TableCell className={classes.tableheading}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <div className="loader">
                <CircularProgress size={100} thickness={3} />
              </div>
            ) : isSearchData ? (
              searchData.length !== 0 ? (
                searchData.map((search, index) => {
                  let leadPhoneNo = maskPhoneNo(search.phone_no_encrypt);
                  return (
                    <TableRow className={classes.oddEvenRow} key={index}>
                      <TableCell
                        className={(classes.tabledata, classes.click)}
                        onClick={() => routeChangeHAndler(search.lead_crm_id)}
                      >
                        {search.lead_crm_id}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.first_name ? search.first_name : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.last_name ? search.last_name : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {leadPhoneNo ? leadPhoneNo : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.loan_amount ? search.loan_amount : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.data.monthly_income
                          ? search.data.monthly_income
                          : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.data.current_company_name
                          ? search.data.current_company_name
                          : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.loan_type}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.campaign_category
                          ? search.campaign_category
                          : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        <div className={classes.loanTypeButton}>
                          <div className={classes.loanButtonText}>
                            {search.status}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.sub_status ? search.sub_status : "NA"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Call Customer">
                          <IconButton
                            className={classes.callButton}
                            onClick={() =>
                              clickToCall(
                                search.phone_no_encrypt,
                                search.lead_crm_id
                              )
                            }
                          >
                            <CallIcon className={classes.callIcon} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <span className={classes.emptydata}>{responseStatus}</span>
              )
            ) : Object.keys(leadData).length !== 0 ? (
              <TableRow className={classes.oddEvenRow}>
                <TableCell
                  className={(classes.tabledata, classes.click)}
                  onClick={() => routeChangeHAndler(leadData.lead_crm_id)}
                >
                  {leadData.lead_crm_id}{" "}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.first_name ? leadData.first_name : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.last_name ? leadData.last_name : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {maskPhoneNo(leadData.phone_no_encrypt)
                    ? maskPhoneNo(leadData.phone_no_encrypt)
                    : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.loan_amount ? leadData.loan_amount : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.data["monthly_income"]
                    ? leadData.data["monthly_income"]
                    : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.data["current_company_name"]
                    ? leadData.data["current_company_name"]
                    : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.loan_type ? leadData.loan_type : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.campaign_category
                    ? leadData.campaign_category
                    : "NA"}
                </TableCell>
                <TableCell className={classes.tabledata}>
                  <div className={classes.loanTypeButton}>
                    <div className={classes.loanButtonText}>
                      {leadData.status}
                    </div>
                  </div>
                </TableCell>
                <TableCell className={classes.tabledata}>
                  {leadData.sub_status ? leadData.sub_status : "NA"}
                </TableCell>
                <TableCell>
                  <Tooltip title="Call Customer">
                    <IconButton
                      className={classes.callButton}
                      onClick={() =>
                        clickToCall(leadData.phone_no_encrypt, leadData.lead_crm_id)
                      }
                    >
                      <CallIcon className={classes.callIcon} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ) : (
              <span className={classes.emptydata}> No Data Found </span>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayerSection>
  );
}
