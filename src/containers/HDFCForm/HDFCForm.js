import React, { useState, useEffect } from 'react';
import axios from "axios";
import { hdfcBankApi } from "../../global/bankingApis";
import './HDFC.css';
import Grid from '@material-ui/core/Grid';
import logo from '../../images/forms/hdfc.svg';
import back from '../../images/forms/back.svg';
import TextField from '@material-ui/core/TextField';
import FormContainer from '../FormContainer/FormContainer';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import uploadSRC from '../../images/forms/fileUpload.svg';
import List from '@material-ui/core/List';
import { useHistory, useParams } from 'react-router-dom';
import phoneCall from '../../images/forms/phoneCall.svg';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ListItem } from '@material-ui/core';
import { ListGroup } from 'react-bootstrap';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function HDFCFrom() {
    const history = useHistory();
    const { leadid } = useParams();
    const [isPersonalDetail, setisPersonalDetail] = useState(true);
    const [isPersonalProgress, setisPersonalProgress] = useState(false);
    const [isCurrentResidentialDetail, setisCurrentResidentialDetail] = useState(false);
    const [isCurrentProgress, setisCurrentProgress] = useState(false);
    const [isBusinessDetail, setisBusinessDetail] = useState(false);
    const [isBusinessProgress, setisBusinessProgress] = useState(false);
    const [isPersonalReference, setisPersonalReference] = useState(false);
    const [isReferenceProgress, setisReferenceProgress] = useState(false);
    const [isUploadDocument, setisUploadDocument] = useState(false);
    const [isUploadProgress, setisUploadProgress] = useState(false);
    const [isBankStatement, setisBankStatement] = useState(false);
    const [isApprovalStatus, setisApprovalStatus] = useState(false);
    const [isApprovalStatusProgress, setisApprovalStatusProgress] = useState(false);
    const [isHdfcData, setIsHdfcData] = useState(false);
    const [isHdfcPersonalRefData, setIsHdfcPersonalRefData] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [hangUpSnacks, sethangUpSnacks] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [officeAddressType, setOfficeAddressType] = useState("");
    const [monthlyTakeHomeSalary, setmonthlyTakeHomeSalary] = useState("");
    const [residanceTypeDap, setResidanceTypeDap] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [residanceAddressType, setResidanceAddressType] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [highestQualification, setHighestQualification] = useState("");
    const [totalDependent, setTotalDependent] = useState("");
    const [yearsInCurrentResidence, setYearsInCurrentResidence] = useState("");
    const [yearsInCurrentCity, setyYearsInCurrentCity] = useState("");
    const [panCardNo, setPanCardNo] = useState("");
    const [purposeOfLoan, setPurposeOfLoan] = useState("");
    const [qualification, setQualification] = useState("");
    const [emailId, setEmailId] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [addressLineThree, setAddressLineThree] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [residentialEmailId, setResidentialEmailId] = useState("");
    const [employerName, setEmployerName] = useState("");
    const [officeAddressOne, setofficeAddressOne] = useState("");
    const [officeAddressTwo, setofficeAddressTwo] = useState("");
    const [officeState, setOfficeState] = useState("");
    const [officeCity, setOfficeCity] = useState("");
    const [officePincode, setOfficePincode] = useState("");
    const [addressType, setAddressType] = useState("");
    const [hdfcBankAccNo, setHdfcBankAccNo] = useState("");
    const [hdfcBranch, setHdfcBranch] = useState("");
    const [refFirstName, setRefFirstName] = useState("");
    const [refLastName, setRefLastName] = useState("");
    const [refMobileNo, setRefMobileNo] = useState("");
    const [uploadDocumentGet, setuploadDocumentGet] = useState([]);
    const actualBtn = document.getElementById('actual-btn');
    const fileChosen = document.getElementById('file-chosen');
    const [addressProof, setAddressProof] = useState("");
    const [incomeProof, setIncomeProof] = useState("");
    const [bankStatement, setBankstatement] = useState("");
    const [identityProof, setIdentityProof] = useState("");
    const [loanTransferDoc, setLoanTransferDoc] = useState("");
    const [showHdfcCompany, setShowHdfcCompany] = useState(false);
    const [searchHdfcCompany, setSearchHdfcCompany] = useState([]);
    useEffect(() => {
        fetchHdfcData(leadid);
        fetchPersonalReferenceData(leadid);
        hdfcUploadDocumentGetHandler(leadid);
    }, [])
    const getHdfcCompany = async (e) => {
        setEmployerName(e.target.value);
        let item = { search_key: employerName, type: 'company' }
        const headers = { 'Content-Type': 'application/json' };
        if (employerName.length >= 4) {
            await axios.post(`${hdfcBankApi}/getHdfcCompanies/`, item, { headers })
                .then((response) => {
                    setSearchHdfcCompany(response.data)
                    setShowHdfcCompany(true);
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const selectHdfcCompany = (companyID) => {
        console.log(companyID);
        setEmployerName(companyID)
        setShowHdfcCompany(false);

    }
    const fetchHdfcData = async (leadId) => {
        await axios.get(`${hdfcBankApi}/sendHdfcLead/${leadId}/2`)
            .then((response) => {
                setFirstName(response.data.applyLoan.First_Name__req);
                setLastName(response.data.applyLoan.Last_Name__req);
                setGender(response.data.applyLoan.Gender__req);
                setDob(response.data.applyLoan.Date_Of_Birth__req);
                setLoanAmount(response.data.applyLoan.Loan_Amount__req);
                setOfficeAddressType(response.data.applyLoan.Address_Type_Work__req);
                setmonthlyTakeHomeSalary(response.data.applyLoan.Monthly_take_home_Salary__req);
                setResidanceTypeDap(response.data.applyLoan.residence_type_dap__req);
                setEmploymentType(response.data.applyLoan.employment_type__req);
                setResidanceAddressType(response.data.applyLoan.Address_Type_Resi__req);
                //setMaritalStatus(response.data.applyLoan.);
                setHighestQualification(response.data.applyLoan.Educational_Qualification__req);
                setTotalDependent(response.data.applyLoan.No_of_Dependent__req);
                setYearsInCurrentResidence(response.data.applyLoan.Year_at_Current_Address);
                setyYearsInCurrentCity(response.data.applyLoan.Year_at_City);
                setPanCardNo(response.data.applyLoan.PAN_AC_No__req);
                //setPurposeOfLoan(response.data.applyLoan.)
                setAddressLineOne(response.data.applyLoan.Address1_Resi__req);
                setAddressLineTwo(response.data.applyLoan.Address2_Resi__req);
                setAddressLineThree(response.data.applyLoan.Address3_Resi__req);
                setCity(response.data.applyLoan.City_Resi__req);
                setState(response.data.applyLoan.State_Resi__req);
                setPincode(response.data.applyLoan.Pin_Code_Resi__req);
                setMobileNo(response.data.applyLoan.Mobile1_Resi__req);
                setResidentialEmailId(response.data.applyLoan.Email_Resi__req);
                setEmployerName(response.data.applyLoan.Employer_Name__req);
                setofficeAddressOne(response.data.applyLoan.Address1_Work__req);
                setofficeAddressTwo(response.data.applyLoan.Address2_Work__req);
                setOfficeState(response.data.applyLoan.State_Work);
                setOfficeCity(response.data.applyLoan.City_Work__req);
                setOfficePincode(response.data.applyLoan.Pin_Code_Work__req);
                setAddressType();
                setHdfcBankAccNo();
                setHdfcBranch();
            }).catch((error) => {
                console.log(error);
            })
    };
    const fetchPersonalReferenceData = async (leadId) => {
        await axios.get(`${hdfcBankApi}/sendHdfcLead/${leadId}/3`)
            .then((response) => {
                setRefFirstName(response.data.ref_1_FirstName__req);
                setRefLastName(response.data.ref_1_LastName);
                setRefMobileNo(response.data.ref_1_Mobile__req);
            }).catch((error) => {
                console.log(error);
            })
    }
    const hdfcLoanDataSubmitHandler = async (leadId) => {
        let panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCardNo);
        let mobRegex = /^[0-9]{10}$/g.test(mobileNo);
        let pinCodeRegex = /^[0-9]{6}$/g.test(pincode);
        let officePinRegex = /^[0-9]{6}$/g.test(officePincode);
        if (panCardNo === '' || !panRegex) {
            setAlertMessage("Invalid Pan Number");
            setIsError(true);
            return;
        } if (firstName === '') {
            setAlertMessage('Invalid First Name')
            setIsError(true);
            return;
        } if (lastName === '') {
            setAlertMessage('Invalid Last Name')
            setIsError(true);
            return;
        } if (gender === '') {
            setAlertMessage('Invalid Gender')
            setIsError(true);
            return;
        } if (highestQualification === '') {
            setAlertMessage('Invalid Highest Qualification')
            setIsError(true);
            return;
        } if (addressLineOne === '') {
            setAlertMessage('Invalid Address Line 1')
            setIsError(true);
            return;
        } if (addressLineTwo === '') {
            setAlertMessage('Invalid Address Line 2')
            setIsError(true);
            return;
        } if (addressLineThree === '') {
            setAlertMessage('Invalid Address Line 3')
            setIsError(true);
            return;
        } if (city === '') {
            setAlertMessage('Invalid City')
            setIsError(true);
            return;
        } if (state === '') {
            setAlertMessage('Invalid State')
            setIsError(true);
            return;
        } if (pincode === '' || !pinCodeRegex) {
            setAlertMessage('Invalid Pincode')
            setIsError(true);
            return;
        } if (mobileNo === '' || !mobRegex) {
            setAlertMessage('Invalid MobileNo')
            setIsError(true);
            return;
        } if (residentialEmailId === '') {
            setAlertMessage('Invalid EmailId')
            setIsError(true);
            return;
        } if (residanceAddressType === '') {
            setAlertMessage('Invalid Residance Type')
            setIsError(true);
            return;
        } if (employerName === '') {
            setAlertMessage('Invalid Employer Name')
            setIsError(true);
        }
        if (officeAddressOne === '') {
            setAlertMessage('Invalid Office Address 1')
            setIsError(true);
            return;
        }
        if (officeAddressTwo === '') {
            setAlertMessage('Invalid Office Address2')
            setIsError(true);
            return;
        } if (officeCity === '') {
            setAlertMessage('Invalid Office City')
            setIsError(true);
            return;
        } if (officeState === '') {
            setAlertMessage('Invalid Office State')
            setIsError(true);
            return;
        } if (officePincode === '' || !officePinRegex) {
            setAlertMessage('Invalid Office Pincode')
            setIsError(true);
            return;
        }
        if (officeAddressType === '') {
            setAlertMessage('Invalid Office Address Type')
            setIsError(true);
            return;
        }
        let applyLoan = {
            First_Name: firstName, Last_Name: lastName, Gender: gender, Date_Of_Birth: dob, Educational_Qualification: highestQualification,
            Loan_Amount: loanAmount, PAN_AC_No: panCardNo,
            City_Resi: city, Pin_Code_Resi: pincode, Address1_Resi: addressLineOne, Address2_Resi: addressLineTwo, Address3_Resi: addressLineThree, State_Resi: state, Mobile1_Resi: mobileNo,
            STD_Code_Resi: "", Email_Resi: residentialEmailId, Year_at_Current_Address: yearsInCurrentResidence, Year_at_City: yearsInCurrentCity, Employer_Name: employerName, Address1_Work: officeAddressOne,
            Address2_Work: officeAddressTwo,
            Pin_Code_Work: officePincode, Address_Type_Work: officeAddressType, City_Work: officeCity, State_Work: officeState, Monthly_take_home_Salary: monthlyTakeHomeSalary, residence_type_dap: residanceTypeDap,
            employment_type: employmentType, No_of_Dependent: totalDependent, Address_Type_Resi: residanceAddressType,
        }
        let items = { loan_data: { applyLoan } };
        console.log("items:" + items);
        const headers = { 'Content-Type': 'application/json' };
        await axios.post(`${hdfcBankApi}/sendHdfcLead/${leadId}/2`, items, { headers })
            .then((response) => {
                console.log(response.data.status);
                if (response.data.status) {
                    setIsHdfcData(true);
                    setisPersonalDetail(false)
                    setisPersonalProgress(true)
                    setisCurrentProgress(true)
                    setisBusinessProgress(true)
                    setisPersonalReference(true)
                }
            }).catch((error) => {
                console.log(error);
                setAlertMessage("something wrong");
                setIsError(true);
            })
    }
    const hdfcPersonalReferenceHandler = async (leadId) => {
        let mobRegex = /^[0-9]{10}$/g.test(refMobileNo);
        if (refFirstName === '') {
            setAlertMessage('Invalid First Name')
            setIsError(true);
            return;
        } if (refLastName === '') {
            setAlertMessage('Invalid Last Name')
            setIsError(true);
            return;
        } if (refMobileNo === '' || !mobRegex) {
            setAlertMessage('Invalid Mobile Number')
            setIsError(true);
            return;
        }
        let loan_data = { ref_1_FirstName__req: refFirstName, ref_1_LastName: refLastName, ref_1_Mobile__req: refMobileNo }
        let items = { loan_data };
        await axios.post(`${hdfcBankApi}/sendHdfcLead/${leadId}/3`, items)
            .then((response) => {
                if (response.data.status) {
                    setisUploadDocument(true)
                    setisPersonalReference(false)
                    setisReferenceProgress(true)
                    setIsHdfcPersonalRefData(true)
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    const hdfcUploadDocumentGetHandler = async (leadId) => {
        await axios.get(`${hdfcBankApi}/sendHdfcLead/${leadId}/4`)
            .then((response) => {
                setuploadDocumentGet(response.data.documents.Parent_Doc)
            }).catch((error) => {
                console.log(error)
            })
    }
    const disableHangUpSnacks = () => {
        sethangUpSnacks(false);
        setIsError(false);
        setIsHdfcData(false);
        setIsHdfcPersonalRefData(false);
    }
    return <div className="HDFCFormContainer">
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isHdfcData} autoHideDuration={1500} onClose={disableHangUpSnacks}>
            <Alert onClose={disableHangUpSnacks} severity="success">
                Hdfc Data Successfully Updated
                </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isHdfcPersonalRefData} autoHideDuration={1500} onClose={disableHangUpSnacks}>
            <Alert onClose={disableHangUpSnacks} severity="success">
                Personal Reference Data Successfully Updated
                </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isError} autoHideDuration={1500} onClose={disableHangUpSnacks}>
            <Alert onClose={disableHangUpSnacks} severity="error">
                {alertMessage}
            </Alert>
        </Snackbar>
        <div className="leftSection">
            <div className="logoContainer">
                <div className="logoImage">
                    <img src={logo} alt="" />
                </div>
            </div>
            <List className="list">
                <div className="progressContainer">
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isPersonalProgress ? "iconBar activeiconBar" : isPersonalDetail ? "iconBar activeCurrent" : "iconBar"}></div>
                            <div className="bottomProgress"></div>
                        </div>
                        <div className="iconText">Personal Details</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isCurrentProgress ? "iconBar activeiconBar" : isCurrentResidentialDetail ? "iconBar activeCurrent" : "iconBar"}></div>
                            <div className="bottomProgress"></div>
                        </div>
                        <div className="iconText">Residential Details</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isBusinessProgress ? "iconBar activeiconBar" : isBusinessDetail ? "iconBar activeCurrent" : "iconBar"}></div>
                            <div className="bottomProgress"></div>
                        </div>
                        <div className="iconText">Business / Profession</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isReferenceProgress ? "iconBar activeiconBar" : isPersonalReference ? "iconBar activeCurrent" : "iconBar"}></div>
                            <div className="bottomProgress"></div>
                        </div>
                        <div className="iconText">Personal Reference</div>
                    </div>
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isUploadProgress ? "iconBar activeiconBar" : isUploadDocument ? "iconBar activeCurrent" : "iconBar"}></div>
                            <div className="bottomProgress"></div>
                        </div>
                        <div className="iconText">Upload Documents</div>
                    </div>
                    {isBankStatement ? <React.Fragment>
                        <div className="progressBox">
                            <div className="subProgressIconBox">
                                <div className={isUploadProgress ? "subIconBar activeiconBar" : isUploadDocument ? "subIconBar activeCurrent" : "subIconBar"}></div>
                                <div className="bottomProgress"></div>
                            </div>
                            <div className="subIconText">Bank Statement</div>
                        </div>
                        <div className="progressBox">
                            <div className="subProgressIconBox">
                                <div className={isUploadProgress ? "subIconBar activeiconBar" : isUploadDocument ? "subIconBar activeCurrent" : "subIconBar"}></div>
                                <div className="bottomProgress"></div>
                            </div>
                            <div className="subIconText">Salary Slip</div>
                        </div>
                        <div className="progressBox">
                            <div className="subProgressIconBox">
                                <div className={isUploadProgress ? "subIconBar activeiconBar" : isUploadDocument ? "subIconBar activeCurrent" : "subIconBar"}></div>
                                <div className="bottomProgress"></div>
                            </div>
                            <div className="subIconText">Address Proof</div>
                        </div>
                    </React.Fragment> : ''}
                    <div className="progressBox">
                        <div className="progressIconBox">
                            <div className={isApprovalStatusProgress ? "iconBar activeiconBar" : "iconBar"}></div>
                        </div>
                        <div className="iconText">Loan Approval Status</div>
                    </div>
                </div>
            </List>
        </div>
        <div className="rightSection">
            {isPersonalDetail ? <div className="adjustBackground">
                <div className="headerContainer">
                    <div className="backButton" onClick={() => history.goBack()}>
                        <img src={back} alt="" />
                    </div>
                    <div className="needHelpContainer">
                        <div className="needHelpText">Need Help?</div>
                        <div className="rightPart">
                            <div className="phoneCall">
                                <img src={phoneCall} alt="" />
                            </div>
                            <div className="numberText">7045330702</div>
                        </div>
                    </div>
                </div>
                <div className="texualContainer">
                    <div className="headText"><strong>Congratulations!</strong> your personal loan is a few steps away…</div>
                    <div className="offerContainer">
                        <div className="offerBox">
                            <div className="offerHead">Loan Amount</div>
                            <div className="offerText">₹ 15,00,000</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Loan Tenure</div>
                            <div className="offerText">5 Years</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Interest Rate</div>
                            <div className="offerText">10.25%</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">EMI</div>
                            <div className="offerText">₹ 27,575</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Processing Fee</div>
                            <div className="offerText">₹ 1,999</div>
                        </div>
                    </div>
                </div>
                <div className="offerBorder"></div>
                <FormContainer Name="Personal Details">
                    <TextField
                        className="textField fullName"
                        id="outlined-full-width"
                        label="First Name"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        className="textField fullName"
                        id="outlined-full-width"
                        label="Last Name"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Gender"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select One</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="LGBT">LGBT</option>
                    </TextField>
                    {/* <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Marital Status"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                        <option value="Divorced">Divorced</option>
                    </TextField> */}
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Highest Qualification"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                        value={highestQualification}
                        onChange={(e) => setHighestQualification(e.target.value)}
                    >
                        <option value="">Select One</option>
                        <option value="SSC">SSC</option>
                        <option value="HSC / DIPLOMA">HSC / Dilopma</option>
                        <option value="DEGREE">Degree</option>
                        <option value="MASTERS DEGREE">Masters Degree</option>
                        <option value="OTHER">Other</option>
                    </TextField>
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Total Dependents"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                        value={totalDependent}
                        onChange={(e) => setTotalDependent(e.target.value)}
                    >
                        <option value="">Select One</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </TextField>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Years in Current Residence"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={yearsInCurrentResidence}
                        onChange={(e) => setYearsInCurrentResidence(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Years in Current City"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={yearsInCurrentCity}
                        onChange={(e) => setyYearsInCurrentCity(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Personal PAN Number"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={panCardNo}
                        onChange={(e) => setPanCardNo(e.target.value.toUpperCase())}
                    />
                    {/* <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Purpose of Loan"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                        value={purposeOfLoan}
                        onChange={(e)=>setPurposeOfLoan(e.target.value)}
                    >
                        <option value="">Select One</option>
                        <option value="Renovation">Renovation</option>
                    </TextField> */}
                    {/* <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Qualification"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                        value={qualification}
                        onChange={(e)=>setQualification(e.target.value)}
                    >
                        <option value="">Select One</option>
                        <option value="MBA">MBA</option>
                        <option value="MCOM">MCOM</option>
                    </TextField> */}
                    {/* <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Email ID"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    /> */}
                </FormContainer>
                <FormContainer Name="Residential Details" >
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Address Line 1"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={addressLineOne}
                        onChange={(e) => setAddressLineOne(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Address Line 2"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={addressLineTwo}
                        onChange={(e) => setAddressLineTwo(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Address Line 3"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={addressLineThree}
                        onChange={(e) => setAddressLineThree(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="City"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="State"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Pincode"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
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
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Email ID"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={residentialEmailId}
                        onChange={(e) => setResidentialEmailId(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Residence Type"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={residanceAddressType}
                        onChange={(e) => setResidanceAddressType(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Residence Type Dap"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={residanceTypeDap}
                        onChange={(e) => setResidanceTypeDap(e.target.value)}
                    />
                </FormContainer>
                <FormContainer Name="Business Details" isSaveNextButton={true} onClick={() => {
                    hdfcLoanDataSubmitHandler(leadid);
                }}>
                    <div>
                        <TextField
                            className="textField3"
                            id="outlined-full-width"
                            label="Employer Name"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            value={employerName}
                            onChange={(e) => getHdfcCompany(e)}
                        />
                        <ListGroup className="listGroup">
                            {showHdfcCompany ? searchHdfcCompany.map((company) => (
                                <ListGroup.Item key={company.company_id}
                                    onClick={() => selectHdfcCompany(company.company_id)}
                                >{company.company_name}</ListGroup.Item>
                            )) : null}
                        </ListGroup>
                    </div>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Office Address 1"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={officeAddressOne}
                        onChange={(e) => setofficeAddressOne(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Office Address 2"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={officeAddressTwo}
                        onChange={(e) => setofficeAddressTwo(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Office State"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={officeState}
                        onChange={(e) => setOfficeState(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Office City"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={officeCity}
                        onChange={(e) => setOfficeCity(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Office Pincode"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={officePincode}
                        onChange={(e) => setOfficePincode(e.target.value)}
                    />
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Office Address Type"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                        value={officeAddressType}
                        onChange={(e) => setOfficeAddressType(e.target.value)}
                    >
                        <option value="">select One</option>
                        <option value="Office">Office</option>
                    </TextField>
                    {/* <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="HDFC Bank Account Number"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={hdfcBankAccNo}
                        onChange={(e) => setHdfcBankAccNo(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="HDFC Bank Branch"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={hdfcBranch}
                        onChange={(e) => setHdfcBranch(e.target.value)}
                    /> */}
                </FormContainer>
            </div> : ''}
            {isPersonalReference ? <div className="adjustBackground">
                <div className="headerContainer">
                    <div className="backButton" onClick={() => {
                        setisPersonalProgress(false)
                        setisCurrentProgress(false)
                        setisBusinessProgress(false)
                        setisPersonalReference(false)
                        setisPersonalDetail(true)
                    }}>
                        <img src={back} alt="" />
                    </div>
                    <div className="needHelpContainer">
                        <div className="needHelpText">Need Help?</div>
                        <div className="rightPart">
                            <div className="phoneCall">
                                <img src={phoneCall} alt="" />
                            </div>
                            <div className="numberText">7045330702</div>
                        </div>
                    </div>
                </div>
                <div className="texualContainer">
                    <div className="headText"><strong>Congratulations!</strong> your personal loan is a few steps away…</div>
                    <div className="offerContainer">
                        <div className="offerBox">
                            <div className="offerHead">Loan Amount</div>
                            <div className="offerText">₹ 15,00,000</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Loan Tenure</div>
                            <div className="offerText">5 Years</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Interest Rate</div>
                            <div className="offerText">10.25%</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">EMI</div>
                            <div className="offerText">₹ 27,575</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Processing Fee</div>
                            <div className="offerText">₹ 1,999</div>
                        </div>
                    </div>
                </div>
                <div className="offerBorder"></div>
                <FormContainer Name="Personal Reference" isSaveNextButton={true} onClick={() => {
                    hdfcPersonalReferenceHandler(leadid);
                }}>
                    <TextField
                        autoFocus
                        className="textField"
                        id="outlined-full-width"
                        label="First Name"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={refFirstName}
                        onChange={(e) => setRefFirstName(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Last Name"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={refLastName}
                        onChange={(e) => setRefLastName(e.target.value)}
                    />
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
                        value={refMobileNo}
                        onChange={(e) => setRefMobileNo(e.target.value)}
                    />
                </FormContainer>
            </div> : ''}
            {isUploadDocument ? <div className="adjustBackground">
                <div className="headerContainer">
                    <div className="backButton" onClick={() => {
                        setisReferenceProgress(false)
                        setisUploadDocument(false)
                        setisPersonalReference(true)
                    }}>
                        <img src={back} alt="" />
                    </div>
                    <div className="needHelpContainer">
                        <div className="needHelpText">Need Help?</div>
                        <div className="rightPart">
                            <div className="phoneCall">
                                <img src={phoneCall} alt="" />
                            </div>
                            <div className="numberText">7045330702</div>
                        </div>
                    </div>
                </div>
                <div className="texualContainer">
                    <div className="headText"><strong>Congratulations!</strong> your personal loan is a few steps away…</div>
                    <div className="offerContainer">
                        <div className="offerBox">
                            <div className="offerHead">Loan Amount</div>
                            <div className="offerText">₹ 15,00,000</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Loan Tenure</div>
                            <div className="offerText">5 Years</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Interest Rate</div>
                            <div className="offerText">10.25%</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">EMI</div>
                            <div className="offerText">₹ 27,575</div>
                        </div>
                        <div className="offerBox">
                            <div className="offerHead">Processing Fee</div>
                            <div className="offerText">₹ 1,999</div>
                        </div>
                    </div>
                </div>
                <div className="offerBorder"></div>
                <div className="uploadContainer">
                    <div className="uploadDocumentContainer">
                        <div className="headText">Upload Bank Statement</div>
                        <div className='uploadDocumentTextRow'>
                            <div className="uploadDocumentText documentType">Document Type</div>
                            <div className="uploadDocumentText selectFromEach">Select (1 from each)</div>
                            <div className="uploadDocumentText fileName">File Name</div>
                            <div className="uploadDocumentText uploadStatus">Upload Status</div>
                        </div>
                        {uploadDocumentGet.map((item) => {
                            if (uploadDocumentGet.length !== 0) {
                                if (item.Parent_Doc_Desc === "ADDRESS PROOF") {
                                    return (
                                        <div className="uploadDocumentRow">
                                            <h3 className='documentTypeText'>{item.Parent_Doc_Desc}</h3>
                                            <select className='documentTypeSelect'>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="actual-btn" hidden onClick={() => {
                                                actualBtn.addEventListener('change', function () {
                                                    fileChosen.textContent = this.files[0].name
                                                })
                                            }} />
                                            <label className='fileButton' for="actual-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div id="file-chosen">No file chosen</div>
                                            <div className='uploadStatusButton'>
                                                <div className='uploadStatusText'>Uploaded</div>
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.Parent_Doc_Desc === "INCOME PROOF") {
                                    return (
                                        <div className="uploadDocumentRow">
                                            <h3 className='documentTypeText'>{item.Parent_Doc_Desc}</h3>
                                            <select className='documentTypeSelect'>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="actual-btn" hidden onClick={() => {
                                                actualBtn.addEventListener('change', function () {
                                                    fileChosen.textContent = this.files[0].name
                                                })
                                            }} />
                                            <label className='fileButton' for="actual-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div id="file-chosen">No file chosen</div>
                                            <div className='uploadStatusButton'>
                                                <div className='uploadStatusText'>Uploaded</div>
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.Parent_Doc_Desc === "BANK STATEMENT") {
                                    return (
                                        <div className="uploadDocumentRow">
                                            <h3 className='documentTypeText'>{item.Parent_Doc_Desc}</h3>
                                            <select className='documentTypeSelect'>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="actual-btn" hidden onClick={() => {
                                                actualBtn.addEventListener('change', function () {
                                                    fileChosen.textContent = this.files[0].name
                                                })
                                            }} />
                                            <label className='fileButton' for="actual-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div id="file-chosen">No file chosen</div>
                                            <div className='uploadStatusButton'>
                                                <div className='uploadStatusText'>Uploaded</div>
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.Parent_Doc_Desc === "IDENTITY PROOF") {
                                    return (
                                        <div className="uploadDocumentRow">
                                            <h3 className='documentTypeText'>{item.Parent_Doc_Desc}</h3>
                                            <select className='documentTypeSelect'>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="actual-btn" hidden onClick={() => {
                                                actualBtn.addEventListener('change', function () {
                                                    fileChosen.textContent = this.files[0].name
                                                })
                                            }} />
                                            <label className='fileButton' for="actual-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div id="file-chosen">No file chosen</div>
                                            <div className='uploadStatusButton'>
                                                <div className='uploadStatusText'>Uploaded</div>
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.Parent_Doc_Desc === "LOAN TRANSFER DOCUMENTS(ONLY FOR LOAN TRANSFER APPLICANTS)") {
                                    return (
                                        <div className="uploadDocumentRow">
                                            <h3 className='documentTypeText'>{item.Parent_Doc_Desc}</h3>
                                            <select className='documentTypeSelect'>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="actual-btn" hidden onClick={() => {
                                                actualBtn.addEventListener('change', function () {
                                                    fileChosen.textContent = this.files[0].name
                                                })
                                            }} />
                                            <label className='fileButton' for="actual-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div id="file-chosen">No file chosen</div>
                                            <div className='uploadStatusButton'>
                                                <div className='uploadStatusText'>Uploaded</div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                </div>
                <FormContainer isSaveNextButton={true} className="uploadDocumentFormContainer" onClick={() => {
                    setisApprovalStatus(true)
                    setisApprovalStatusProgress(true)
                    setisUploadDocument(false)
                    setisUploadProgress(true)
                    setisBankStatement(true)
                }}>
                    <div className="checkboxContainer">
                        <Checkbox className="check" />
                        <p>By submitting I provide my consent to retrieve my credit information from Credit Bureaus including CIBIL to check eligibility for this application. I understand that this may impact my credit score.</p>
                    </div>
                </FormContainer>
            </div> : ''}
            {isApprovalStatus ? <div className="adjustBackground" style={{ height: '100vh' }}>
                <div className="headerContainer">
                    <div className="backButton" onClick={() => {
                        setisApprovalStatus(false)
                        setisPersonalDetail(true)
                        setisUploadProgress(false)
                        setisApprovalStatusProgress(false)
                        setisPersonalProgress(false)
                        setisBankStatement(false)
                        setisCurrentProgress(false)
                        setisBusinessProgress(false)
                        setisReferenceProgress(false)
                    }}>
                        <img src={back} alt="" />
                    </div>
                    <div className="needHelpContainer">
                        <div className="needHelpText">Need Help?</div>
                        <div className="rightPart">
                            <div className="phoneCall">
                                <img src={phoneCall} alt="" />
                            </div>
                            <div className="numberText">7045330702</div>
                        </div>
                    </div>
                </div>
                <div className="texualContainer">
                    <div className="headText2"><strong>Congratulations!</strong></div>
                    <div className="subText">Your Application has been <strong>successfully submitted.</strong> Our Team will get back to you in 24-48 hours.</div>
                    <div className="trackStatus">
                        <div className="btnText">TRACK STATUS</div>
                    </div>
                </div>
            </div> : ''}
        </div>
    </div>
}