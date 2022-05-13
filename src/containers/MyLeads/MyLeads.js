import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import baseUrl from "../../global/api";
import {
  getCampaign,
  getProfileData,
  getStatusData,
} from "../../global/leadsGlobalData";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import Button from "@material-ui/core/Button";
import {
  haloocomNoidaDialerApi,
  haloocomMumbaiDialerApi,
} from "../../global/callApi";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CallIcon from "@material-ui/icons/Call";
import CallerDialogBox from "../Leads/CallerDialog/CallerDialogBox";
import PageLayerSection from "../PageLayerSection/PageLayerSection";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import "./myleads.css";
import { Drawer } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import filter from "../../images/filter.png";
import { useQueryy } from "../../global/query";
import CircularProgress from "@material-ui/core/CircularProgress";
import EmiCalculator from '../Emicalculator/EmiCalculator';
import EligibilityCalculator from "../EligibilityCalculator/EligibilityCalculator";
import SearchIcon from "@material-ui/icons/Search";
import { ListGroup } from 'react-bootstrap';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  container: {
    maxHeight: '67vh',
    marginBottom: "10px",
  },
  table: {
    width: "100%",
  },
  tableheading: {
    backgroundColor: "#8f9bb3",
    color: "#ffffff",
    fontSize: "14px",
  },
  numberOfTotalCount: {
    marginRight: "25px",
  },
  buttonsContainer: {
    marginRight: "15px",
  },
  activeColor: {
    color: "#000",
  },
  statusHeading: {
    textAlign: "center",
  },
  checkboxFix: {
    color: "#ffffff",
  },
  checkboxFixData: {
    color: "#8F9BB3",
  },
  tabledata: {
    padding: "15px",
    fontSize: "12px",
    overflowWrap: "break-word",
  },
  emptydata: {
    position: "absolute",
    left: "40rem",
    fontSize: "16px",
    whiteSpace: 'nowrap',
  },
  leadid: {
    cursor: "pointer",
    color: "blue",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "5px",
  },
  prevBtn: {
    margin: "0px 8px",
    backgroundColor: "#13B980",
    border: "1px solid black",
    cursor: "pointer",
  },
  nextBtn: {
    backgroundColor: "#13B980",
    border: "1px solid black",
    cursor: "pointer",
  },
  count: {
    fontSize: "0.85em",
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
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
export default function MyLeads(props) {
  const classes = useStyles();
  const profileData = getProfileData();
  const [myLeads, setMyLeads] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalLeads, setTotalLeads] = useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalDataPerPage, settotalDataPerPage] = useState(0);
  const [dialerCall, setDialerCall] = useState(false);
  const [disableHangupBtn, setDisableHangupBtn] = useState(true);
  const [state, setState] = useState(false);
  const [manualState, setmanualState] = useState(false);
  const [status, setStatus] = useState("");
  const [subStatus, setSubStatus] = useState([]);
  const [campaign, setCampaign] = useState([]);
  const [startdate, setstartDate] = useState("");
  const [enddate, setendDate] = useState("");
  const [users, setUsers] = useState([]);
  const [dateType, setdateType] = useState("");
  const [users_id, setUserID] = useState("");
  const [isError, setisError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [dialerMobileNumber, setdialerMobileNumber] = useState("");
  const [callHangUpState, setCallHangUpState] = useState(true);
  const [hangUpSnacks, sethangUpSnacks] = useState(false);
  const [myLeadSearchData, setMyLeadSearchData] = useState([]);
  const [isMyLeadsSearchData, setisMyLeadsSearchData] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [leadsAssignTo, setLeadsAssignTo] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showAROList, setShowAROList] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  let statusData = getStatusData();
  let campaignData = getCampaign();
  let history = useHistory();
  const queryy = useQueryy();
  const myLeadQuery = queryy.get("query") || "";
  const splitUrl = (data) => {
    if (data !== null) {
      const [url, pager] = data.split("?");
      return pager;
    }
  };
  const childCheckBoxHandler = (e, data) => {
    const { name, checked } = e.target;
    if (checked) {
      // if cheked and selectall checkbox add all fileds to selectedList
      if (name === 'allSelect') {
        setSelectedLeads(myLeads)
      } else if (name === 'searchAllSelect') {
        setSelectedLeads(myLeadSearchData)
      }
      else {
        // if cheked and specific checkbox add specific field to selectedList
        setSelectedLeads([...selectedLeads, data])
      }
    } else {
      // if uncheked and selectall checkbox add remove all fileds from selectedList
      if (name === 'allSelect') {
        setSelectedLeads([])
      } else {
        // if uncheked and specific checkbox remove specific field from selectedList
        let tempLead = selectedLeads.filter((item) => item.id !== data.id)
        setSelectedLeads(tempLead);
      }
    }
  }
  const allocateLeadsHandler = async () => {
    setShowAROList(false);
    if (leadsAssignTo !== '') {
      let items = { assigned_user: leadsAssignTo, leads: isMyLeadsSearchData ? selectedLeads.map(item => item.lead_crm_id) : selectedLeads.map(item => item.lead.lead_crm_id) }
      const headers = { Authorization: `Token ${profileData.token}` };
      await axios.post(`${baseUrl}/leads/allocateLead/`, items, { headers })
        .then((response) => {
          console.log(response.data.message);
          setIsSuccess(true);
          setAlertMessage(response.data.message)
          myLeadQuery ? fetchMyLeadsSearchData(myLeadQuery) : fetchMyLeads();
          setSelectedLeads([]);
        }).catch((error) => {
          console.log(error)
        })
    }
  }
  const toggleAROHandler = () => {
    setShowAROList(true);
  }
  const fetchMyLeads = async () => {
    setisLoading(true);
    const headers = { Authorization: `Token ${profileData.token}` };
    await axios
      .get(`${baseUrl}/leads/fetchUpdatedLeadsUserWise/`, { headers })
      .then((response) => {
        setRowsPerPage(response.data.results.length);
        settotalDataPerPage(response.data.results.length);
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
        setTotalLeads(response.data.count);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchFilteredMyLeads = async () => {
    setisLoading(true);
    const headers = { Authorization: `Token ${profileData.token}` };
    await axios
      .get(
        `${baseUrl}/leads/fetchUpdatedLeadsUserWise/?datetype=${dateType}&status=${status}&start_date=${startdate}&end_date=${enddate}&sub_status=${subStatus}&campaign_category=${campaign}&user_id=${users_id}`,
        { headers }
      )
      .then((response) => {
        setRowsPerPage(response.data.results.length);
        settotalDataPerPage(response.data.results.length);
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
        setTotalLeads(response.data.count);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMyLeadsSearchData = async (key) => {
    setisMyLeadsSearchData(true);
    setisLoading(true);
    let headers = { Authorization: `Token ${profileData.token}` };
    await axios
      .get(`${baseUrl}/leads/search/${key}`, { headers })
      .then((response) => {
        setMyLeadSearchData(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setResponseStatus('This Lead Owned By Someone Else Kindly Connect Your Product Team swati@credfine.com');
          setAlertMessage('Lead Already Exist');
          setisError(true);
          setisLoading(false);
        }
        if (error.response.status === 400) {
          setResponseStatus('No Data Found In Our CRM You Can Create a New Lead From Manual Lead Creation');
          setAlertMessage('No Record Found');
          setisError(true);
          setisLoading(false);
        } else {
          console.log(error);
        }
      });
  };
  useEffect(() => {
    myLeadQuery ? fetchMyLeadsSearchData(myLeadQuery) : fetchMyLeads();
    listOfUsers();
  }, [myLeadQuery]);
  const listOfUsers = async () => {
    const headers = {
      Authorization: `Token ${profileData.token}`,
    };
    await axios
      .get(`${baseUrl}/user/childUsers/`, { headers })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const leadDetailsHandler = (leadId) => {
    history.push(`/dashboards/myleads/edit/${leadId}`);
  };
  const nextPageHandler = async () => {
    setisLoading(true);
    const headers = { Authorization: `Token ${profileData.token}` };
    await axios
      .get(
        `${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(nextPage)}`,
        { headers }
      )
      .then((response) => {
        let nextCount = totalDataPerPage + response.data.results.length;
        settotalDataPerPage(nextCount);
        setRowsPerPage(response.data.results.length);
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };
  const prevPageHandler = async () => {
    setisLoading(true);
    const headers = { Authorization: `Token ${profileData.token}` };
    await axios
      .get(
        `${baseUrl}/leads/fetchUpdatedLeadsUserWise/?${splitUrl(prevPage)}`,
        { headers }
      )
      .then((response) => {
        let prevCount = totalDataPerPage - response.data.results.length;
        settotalDataPerPage(prevCount);
        setRowsPerPage(response.data.results.length);
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);
        setMyLeads(response.data.results);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };
  const removeDuplicateStatus = (data) => {
    let unique = [];
    data.forEach((element) => {
      if (!unique.includes(element.status)) {
        unique.push(element.status);
      }
    });
    return unique;
  };
  const uniqueStatus = removeDuplicateStatus(statusData);
  const subStatusHandler = () => {
    let subStatusoptions = [];
    statusData.forEach((item, index) => {
      if (item.status === status) {
        subStatusoptions.push(item.sub_status);
      }
    });
    return subStatusoptions;
  };
  const options = subStatusHandler();
  const maskPhoneNo = (encryptData) => {
    let data = decodeURIComponent(window.atob(encryptData));
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
  const clickToCall = async (encryptData, leadID) => {
    const customerNo = decodeURIComponent(window.atob(encryptData));
    if (profileData.dialer === "HALOOCOM-Noida") {
      await axios
        .post(
          `${haloocomNoidaDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`
        )
        .then((response) => {
          setDialerCall(true);
          setDisableHangupBtn(false);
          if (response.status === 200) {
            localStorage.setItem("callHangUp", true);
          }
        })
        .catch((error) => {
          console.log("error");
        });
      setTimeout(() => {
        history.push(`/dashboards/myleads/edit/${leadID}`);
      }, 1500);
    } else if (profileData.dialer === "HALOOCOM-Mumbai") {
      await axios
        .post(
          `${haloocomMumbaiDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${customerNo}`
        )
        .then((response) => {
          setDialerCall(true);
          setDisableHangupBtn(false);
          if (response.status === 200) {
            localStorage.setItem("callHangUp", true);
          }
        })
        .catch((error) => {
          console.log("error");
        });
      setTimeout(() => {
        history.push(`/dashboards/myleads/edit/${leadID}`);
      }, 1500);
    }
  };
  const disableDialerPopUp = () => {
    setDialerCall(false);
    setDisableHangupBtn(false);
    setisError(false);
    setIsSuccess(false);
  };
  const openDrawer = () => {
    setState(true);
  };
  const openDialer = () => {
    setmanualState(true);
  };

  const filterSubmit = (event) => {
    event.preventDefault();
    if (startdate !== "" && enddate === "") {
      setisError(true);
      return;
    }
    history.push(
      `/dashboards/myleads/?datetype=${dateType}&status=${status}&start_date=${startdate}&end_date=${enddate}&sub_status=${subStatus}&campaign_category=${campaign}&user_id=${users_id}`
    );
    fetchFilteredMyLeads();
    closeDrawer();
  };
  const closeDrawer = () => {
    setState(false);
    setisError(false);
    setmanualState(false);
    setdialerMobileNumber("");
  };
  const clickToManualCall = async () => {
    if (profileData.dialer === "HALOOCOM-Noida") {
      await axios
        .post(
          `${haloocomNoidaDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${dialerMobileNumber}`
        )
        .then((response) => {
          setDialerCall(true);
          setDisableHangupBtn(false);
          if (response.status === 200) {
            localStorage.setItem("callHangUp", true);
          }
        })
        .catch((error) => {
          console.log("error");
        });
    } else if (profileData.dialer === "HALOOCOM-Mumbai") {
      await axios
        .post(
          `${haloocomMumbaiDialerApi}/click2dial.php?user=${profileData.vertage_id}&number=${dialerMobileNumber}`
        )
        .then((response) => {
          setDialerCall(true);
          setDisableHangupBtn(false);
          if (response.status === 200) {
            localStorage.setItem("callHangUp", true);
          }
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };
  const hangupCallHandler = async () => {
    if (profileData.dialer === "HALOOCOM-Noida") {
      await axios
        .post(
          `${haloocomNoidaDialerApi}/action.php?user=${profileData.vertage_id}&type=Hangup&disposition`
        )
        .then((response) => {
          // setDisableDisposeBtn(false);
          setCallHangUpState(false);
          if (response.status === 200) {
            localStorage.removeItem("callHangUp");
            setdialerMobileNumber("");
            return disposeCallHandler();
          }
          // setCallHangUpState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (profileData.dialer === "HALOOCOM-Mumbai") {
      await axios
        .post(
          `${haloocomMumbaiDialerApi}/action.php?user=${profileData.vertage_id}&type=Hangup&disposition`
        )
        .then((response) => {
          // setDisableDisposeBtn(false);
          setCallHangUpState(false);
          if (response.status === 200) {
            localStorage.removeItem("callHangUp");
            setdialerMobileNumber("");
            return disposeCallHandler();
          }
          // setCallHangUpState(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const disposeCallHandler = () => {
    sethangUpSnacks(true);
    setCallHangUpState(true);
  };
  const getAssignedAgent = (agentName) => {
    setLeadsAssignTo(agentName);
  }
  const closeListGroupHandler = () => {
    setShowAROList(false);
    setSearchInput('');
  }
  const [openCalculate, setopenCalculate] = useState(false);
  const [checkEligibility, setCheckEligibility] = useState(false);
  const openCalculator = () => {
    setopenCalculate(true);
  }
  const closeCalculator = () => {
    setopenCalculate(false);
  }
  const openEligibility = () => {
    setCheckEligibility(true);
  }
  const closeEligibility = () => {
    setCheckEligibility(false);
  }
  return (
    <PageLayerSection isDisplaySearchBar={true} isMyLeadsSearch={true} ActualEmiCalculate={openCalculator} ActualEligibilityCalculate={openEligibility}>
      <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility} />
      <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={dialerCall}
        autoHideDuration={1500}
        onClose={disableDialerPopUp}
      >
        <Alert onClose={disableDialerPopUp} severity="info">
          Calling...
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSuccess}
        autoHideDuration={1500}
        onClose={disableDialerPopUp}
      >
        <Alert onClose={disableDialerPopUp} severity="info">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isError}
        autoHideDuration={1500}
        onClose={disableDialerPopUp}
      >
        <Alert onClose={disableDialerPopUp} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Drawer anchor="right" open={state} onClose={closeDrawer}>
        <div className="rightContainerForm">
          <form onSubmit={filterSubmit}>
            <Grid container justifyContent="flex-start">
              <h4>Search Here</h4>
            </Grid>
            <Grid>
              <TextField
                select
                className="textField"
                id="outlined-full-width"
                label="Lead Created/Updated"
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
                value={dateType}
                onChange={(e) => setdateType(e.target.value)}
              >
                <option value="">Select One</option>
                <option value="created">Create Date</option>
                <option value="updated">Updated Date</option>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                className="textField"
                type="date"
                id="outlined-full-width"
                label="From"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: formatDate(new Date()),
                }}
                variant="outlined"
                size="small"
                value={startdate}
                onChange={(e) => setstartDate(e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                type="date"
                className="textField"
                id="outlined-full-width"
                label="To"
                defaultValue="12-12-2021"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: formatDate(new Date()),
                }}
                variant="outlined"
                size="small"
                value={enddate}
                onChange={(e) => {
                  setendDate(e.target.value);
                  setisError(false);
                }}
                disabled={startdate !== "" ? false : true}
                error={Boolean(isError ? true : false)}
                helperText={isError ? "End Date is requireds" : ""}
              />
            </Grid>
            <Grid container style={{ justifyContent: "center" }}>
              <Grid>
                <TextField
                  select
                  className="textField2"
                  id="outlined-full-width"
                  label="Status"
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
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select</option>
                  {uniqueStatus.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  className="textField2"
                  select
                  id="outlined-full-width"
                  label="Sub Status"
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
                  value={subStatus}
                  onChange={(e) => {
                    setSubStatus(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  {options.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid>
              <TextField
                className="textField"
                select
                id="outlined-full-width"
                label="Select Campaign"
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
                onChange={(e) => {
                  setCampaign(e.target.value);
                }}
              >
                <option value="">Select</option>
                {campaignData.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                select
                className="textField"
                id="outlined-full-width"
                label="Users"
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
                value={users_id}
                onChange={(e) => setUserID(e.target.value)}
              >
                <option value="">Select User</option>
                {users.map((item) => {
                  return (
                    <option value={item.myuser.username}>
                      {item.myuser.username}
                    </option>
                  );
                })}
              </TextField>
            </Grid>
            <Grid>
              <Button
                type="submit"
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
      <Drawer anchor="right" open={manualState} onClose={closeDrawer}>
        <div className="rightContainerForm">
          <form>
            <Grid container justifyContent="flex-start">
              <h4>Manual Dialer</h4>
            </Grid>
            <Grid>
              <TextField
                className="textField"
                id="outlined-full-width"
                label="Mobile Number"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                value={dialerMobileNumber}
                onChange={(e) => setdialerMobileNumber(e.target.value)}
                onKeyPress={(event) => {
                  if (event.which == "13") {
                    event.preventDefault();
                  }
                  if (event.key === "Enter") {
                    clickToManualCall();
                  }
                }}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </Grid>
            <div className="buttonAdjust">
              <Button
                className="callBtn"
                color="primary"
                variant="contained"
                startIcon={<CallIcon className="callIcon" />}
                onClick={() => clickToManualCall()}
              >
                Call
              </Button>
              <Button
                className="endBtn"
                color="primary"
                variant="contained"
                startIcon={<CallIcon className="callIcon" />}
                disabled={
                  localStorage.getItem("callHangUp") &&
                    localStorage.getItem("callHangUp") !== null
                    ? false
                    : callHangUpState
                }
                onClick={hangupCallHandler}
              >
                End
              </Button>
            </div>
          </form>
        </div>
      </Drawer>
      <div className="filterMainContainer">
        <h3>My Leads ({totalLeads})</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            className="addBtn"
            color="primary"
            variant="contained"
            style={{ marginRight: "15px" }}
            onClick={() => openDialer()}
          >
            Manual Dialer
          </Button>
          <div className="filterButtonContainer" onClick={() => openDrawer()}>
            <div className="filterImage">
              <img src={filter} alt="" />
            </div>
            <div className="filterText">FILTER</div>
          </div>
        </div>
      </div>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader aria-label="simple table">
          <TableHead className={classes.tableheading}>
            <TableRow>
              <TableCell className={classes.tableheading}>
                <Checkbox color="primary"
                  name={isMyLeadsSearchData ? "searchAllSelect" : "allSelect"}
                  checked={isMyLeadsSearchData ? selectedLeads?.length === myLeadSearchData?.length : selectedLeads?.length === myLeads?.length}
                  onChange={(e) => childCheckBoxHandler(e, myLeads)} />
              </TableCell>
              <TableCell className={classes.tableheading}>Lead ID</TableCell>
              <TableCell className={classes.tableheading}>Name</TableCell>
              <TableCell className={classes.tableheading}>Campaign</TableCell>
              <TableCell className={classes.tableheading}>Created Date</TableCell>
              <TableCell className={classes.tableheading}>
                Last Updated
              </TableCell>
              <TableCell
                className={clsx(classes.tableheading, classes.statusHeading)}
              >
                Status
              </TableCell>
              <TableCell className={classes.tableheading}>Sub Status</TableCell>
              <TableCell className={classes.tableheading}>
                Last Updated By
              </TableCell>
              <TableCell className={classes.tableheading}>
                Lead Agent Name
              </TableCell>
              <TableCell className={classes.tableheading}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <div className="loader">
                <CircularProgress size={100} thickness={3} />
              </div>
            ) : isMyLeadsSearchData ? (
              myLeadSearchData.length !== 0 ? (
                myLeadSearchData.map((search, index) => {
                  let leadPhoneNo = maskPhoneNo(search.phone_no_encrypt);
                  let createdDate = new Date(search.created_date);
                  let currentCreatedDate = createdDate.toLocaleDateString() + " " +
                    moment(createdDate.toLocaleTimeString(), "HH:mm:ss a").format(
                      "hh:mm A"
                    );
                  let updatedDate = new Date(search.updated_date);
                  let currentUpdatedDate =
                    updatedDate.toLocaleDateString() +
                    " " +
                    moment(
                      updatedDate.toLocaleTimeString(),
                      "HH:mm:ss a"
                    ).format("hh:mm A");
                  return (
                    <TableRow className={classes.oddEvenRow} key={index}>
                      <TableCell className={classes.tabledata}>
                        <Checkbox color="primary"
                          name={search.name}
                          checked={selectedLeads.some((item) => item?.id === search?.id)}
                          onChange={(e) => childCheckBoxHandler(e, search)} />
                      </TableCell>
                      <TableCell
                        className={(classes.tabledata, classes.leadid)}
                        onClick={() => leadDetailsHandler(search.lead_crm_id)}
                      >
                        {search.lead_crm_id}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.name ? search.name : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.campaign_category
                          ? search.campaign_category
                          : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {currentCreatedDate ? currentCreatedDate : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {currentUpdatedDate ? currentUpdatedDate : "NA"}
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
                      <TableCell className={classes.tabledata}>
                        {search.last_updated_by ? search.last_updated_by : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
                        {search.lead_agent_name ? search.lead_agent_name : "NA"}
                      </TableCell>
                      <TableCell className={classes.tabledata}>
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
            ) : myLeads.length !== 0 ? (
              myLeads.map((my_leads, index) => {
                let leadPhoneNo = maskPhoneNo(my_leads.lead.phone_no_encrypt);
                let createdDate = new Date(my_leads.created_date);
                let currentCreatedDate = createdDate.toLocaleDateString() + " " +
                  moment(createdDate.toLocaleTimeString(), "HH:mm:ss a").format(
                    "hh:mm A"
                  );
                let updatedDate = new Date(my_leads.updated_date);
                let currentUpdatedDate =
                  updatedDate.toLocaleDateString() +
                  " " +
                  moment(updatedDate.toLocaleTimeString(), "HH:mm:ss a").format(
                    "hh:mm A"
                  );
                return (
                  <TableRow className={classes.oddEvenRow} key={index}>
                    <TableCell className={classes.tabledata}>
                      <Checkbox color="primary"
                        name={my_leads.lead.name}
                        checked={selectedLeads.some((item) => item?.id === my_leads?.id)}
                        onChange={(e) => childCheckBoxHandler(e, my_leads)} />
                    </TableCell>
                    <TableCell
                      className={(classes.tabledata, classes.leadid)}
                      onClick={() =>
                        leadDetailsHandler(my_leads.lead.lead_crm_id)
                      }
                    >
                      {my_leads.lead.lead_crm_id}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      {my_leads.lead.name ? my_leads.lead.name : "NA"}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      {my_leads.lead.campaign_category
                        ? my_leads.lead.campaign_category
                        : "NA"}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      {currentCreatedDate ? currentCreatedDate : "NA"}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      {currentUpdatedDate ? currentUpdatedDate : "NA"}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      <div className={classes.loanTypeButton}>
                        <div className={classes.loanButtonText}>
                          {my_leads.lead.status}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      {my_leads.lead.sub_status
                        ? my_leads.lead.sub_status
                        : "NA"}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      {my_leads.lead.last_updated_by
                        ? my_leads.lead.last_updated_by
                        : "NA"}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      {my_leads.lead_agent_name
                        ? my_leads.lead_agent_name
                        : "NA"}
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                      <Tooltip title="Call Customer">
                        <IconButton
                          className={classes.callButton}
                          onClick={() =>
                            clickToCall(
                              my_leads.lead.phone_no_encrypt,
                              my_leads.lead.lead_crm_id
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
              <span className={classes.emptydata}>No Data Found</span>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading ? (
        ""
      ) : (
        <div className="paginationContainer">
          <form className="assignToContainer">
            {showAROList && <ListGroup className="listGroup">
              <CancelRoundedIcon className="closeListGroup" onClick={closeListGroupHandler} />
              <div className="searchMainContainer">
                <div className="searchContainer">
                  <InputBase
                    className="inputContainer"
                    inputProps={{ "aria-label": "search" }}
                    value={searchInput}
                    onChange={(e) => setSearchInput((e.target.value).toLowerCase().trim())}
                  />
                  <div className="searchIconContainer">
                    <SearchIcon className="searchIcon" />
                  </div>
                </div>
              </div>
              <div className="listItemContainer">
                {
                  users.filter((data) => {
                    if (searchInput === "") {
                      return users;
                    } else if (data.myuser.username.toLowerCase().includes(searchInput.toLowerCase())) {
                      return users;
                    }
                  }).map((item) => (
                    <ListGroup.Item className={leadsAssignTo === item.myuser.username && "activeListItem"} onClick={() => getAssignedAgent(item.myuser.username)}
                    >{item.myuser.username}</ListGroup.Item>
                  ))}
              </div>
              <Button
                className="assignLeadsBtn"
                variant="contained"
                color="primary"
                onClick={allocateLeadsHandler}
              >
                Assign
              </Button>
            </ListGroup>}
            <div className="assignToBtnContainer" onClick={toggleAROHandler}>
              <span className="assignText">Assign To</span>
              <ArrowDropDownIcon />
            </div>
            <div className="selectedText">{selectedLeads.length} Leads Selected</div>
          </form>
          <div className='paginationRightContainer'>
            <div className='rowsPerPage'>Rows Per Page: {rowsPerPage}</div>
            <div className={classes.numberOfTotalCount}>
              {totalDataPerPage} of {totalLeads}
            </div>
            <div className={classes.buttonsContainer}>
              {prevPage === null ? (
                <IconButton disabled onClick={prevPageHandler}>
                  <ChevronLeftOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton onClick={prevPageHandler}>
                  <ChevronLeftOutlinedIcon
                    className={prevPage !== null ? classes.activeColor : ""}
                  />
                </IconButton>
              )}
              {nextPage === null ? (
                <IconButton disabled onClick={nextPageHandler}>
                  <ChevronRightOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton onClick={nextPageHandler}>
                  <ChevronRightOutlinedIcon
                    className={nextPage !== null ? classes.activeColor : ""}
                  />
                </IconButton>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayerSection>
  );
}
