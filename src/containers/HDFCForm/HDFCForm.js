import React, { useState, useEffect } from 'react';
import axios from "axios";
import AWS from 'aws-sdk'
import { bankApi } from "../../global/bankingApis";
import './HDFC.css';
import Grid from '@material-ui/core/Grid';
import logo from '../../images/forms/hdfc.svg';
import back from '../../images/forms/back.svg';
import TextField from '@material-ui/core/TextField';
import FormContainer from '../FormContainer/FormContainer';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import { useHistory, useParams } from 'react-router-dom';
import phoneCall from '../../images/forms/phoneCall.svg';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ListGroup } from 'react-bootstrap';
import Moment from 'moment';
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
    const [isCopy, setisCopy] = useState(false);
    const [hangUpSnacks, sethangUpSnacks] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [monthlyTakeHomeSalary, setmonthlyTakeHomeSalary] = useState("");
    const [residanceTypeDap, setResidanceTypeDap] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [highestQualification, setHighestQualification] = useState("");
    const [totalDependent, setTotalDependent] = useState("");
    const [yearsInCurrentResidence, setYearsInCurrentResidence] = useState("");
    const [yearsInCurrentCity, setyYearsInCurrentCity] = useState("");
    const [panCardNo, setPanCardNo] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [addressLineThree, setAddressLineThree] = useState("");
    const [emi, setEmi] = useState("")
    const [cityIdd, setCityIdd] = useState("");
    const [cityName, setCityName] = useState("");
    const [stateIdd, setStateIdd] = useState("");
    const [stateName, setStateName] = useState("");
    const [pincode, setPincode] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [phoneNoWork, setPhoneNoWork] = useState("")
    const [residentialEmailId, setResidentialEmailId] = useState("");
    const [employerIdd, setEmployerIdd] = useState("");
    const [employerName, setEmployerName] = useState("");
    const [officeAddressOne, setofficeAddressOne] = useState("");
    const [officeAddressTwo, setofficeAddressTwo] = useState("");
    const [officeStateIdd, setOfficeStateIdd] = useState("");
    const [officeStateName, setOfficeStateName] = useState("");
    const [officeCityIdd, setOfficeCityIdd] = useState("");
    const [officeCityName, setOfficeCityName] = useState("");
    const [officePincode, setOfficePincode] = useState("");
    const [brabchCodeIdd, setbranchCodeIdd] = useState("");
    const [brabchCodeName, setbranchCodeName] = useState("");
    const [rmCodeIdd, setRmCodeIdd] = useState("");
    const [rmCodeName, setRmCodeName] = useState("");
    const [seCodeIdd, setSeCodeIdd] = useState("");
    const [seCodeName, setSeCodeName] = useState("");
    const [refFirstName, setRefFirstName] = useState("");
    const [refLastName, setRefLastName] = useState("");
    const [refMobileNo, setRefMobileNo] = useState("");
    const [uploadDocumentGet, setuploadDocumentGet] = useState([]);
    const addressProofBtn = document.getElementById('addressProof-btn');
    const incomeProofBtn = document.getElementById('incomeProof-btn');
    const bankStatementBtn = document.getElementById('bankStatement-btn');
    const identityProofBtn = document.getElementById('identityProof-btn');
    const loanTransferDocBtn = document.getElementById('loanTransferDoc-btn');
    const actualProofFileChosen = document.getElementById('actualProof-file-chosen');
    const incomeProofFileChosen = document.getElementById('incomeProof-file-chosen');
    const bankStatementFileChosen = document.getElementById('bankStatement-file-chosen');
    const identityProofFileChosen = document.getElementById('identityProof-file-chosen');
    const loanTransferDocFileChosen = document.getElementById('loanTransferDoc-file-chosen');
    const [addressProof, setAddressProof] = useState("");
    const [incomeProof, setIncomeProof] = useState("");
    const [bankStatement, setBankstatement] = useState("");
    const [identityProof, setIdentityProof] = useState("");
    const [loanTransferDoc, setLoanTransferDoc] = useState("");
    const [showHdfcCompany, setShowHdfcCompany] = useState(false);
    const [searchHdfcCompany, setSearchHdfcCompany] = useState([]);
    const [showHdfcCity, setShowHdfcCity] = useState(false);
    const [searchHdfcCity, setSearchHdfcCity] = useState([]);
    const [showHdfcOfficeCity, setShowHdfcOfficeCity] = useState(false);
    const [searchHdfcOfficeCity, setSearchHdfcOfficeCity] = useState([]);
    const [losNo,setLosNo] = useState('');
    useEffect(() => {
        fetchHdfcData(leadid);
        fetchPersonalReferenceData(leadid);
    }, [])

    AWS.config.update({
        accessKeyId: 'AKIA6KIAPG76SEOLIPN6',
        secretAccessKey: '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'
    })
    const myBucket = new AWS.S3({
        params: { Bucket: 'cred-lead-docs-uat' },
        region: 'ap-south-1',
    })

    const getHdfcCompany = async (e) => {
        setEmployerName(e.target.value);
        let item = { search_key: employerName, type: 'hdfc_company' }
        const headers = { 'Content-Type': 'application/json' };
        if (employerName.length >= 2) {
            await axios.post(`${bankApi}/getHdfcCompanies/`, item, { headers })
                .then((response) => {
                    setSearchHdfcCompany(response.data)
                    setShowHdfcCompany(true);
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const getHdfcCity = async (e) => {
        setCityName(e.target.value);
        let item = { search_key: cityName, type: 'city_name' }
        if (cityName.length >= 2) {
            await axios.post(`${bankApi}/getHdfcCompanies/`, item)
                .then((response) => {
                    setSearchHdfcCity(response.data);
                    setShowHdfcCity(true);
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const getHdfcOfficeCity = async (e) => {
        setOfficeCityName(e.target.value);
        let item = { search_key: officeCityName, type: 'city_name' }
        if (officeCityName.length >= 2) {
            await axios.post(`${bankApi}/getHdfcCompanies/`, item)
                .then((response) => {
                    setSearchHdfcOfficeCity(response.data);
                    setShowHdfcOfficeCity(true);
                }).catch((error) => {
                    console.log(error)
                })
        }
    }
    const selectHdfcCompany = (companyID, companyName) => {
        setShowHdfcCompany(false);
        setEmployerIdd(companyID);
        setEmployerName(companyName);
    }
    const selectHdfcCity = (cityId, stateId) => {
        setCityIdd(cityId);
        setShowHdfcCity(false);
        setStateIdd(stateId)
    }
    const selectHdfcOfficeCity = (cityId, stateId) => {
        setOfficeCityIdd(cityId)
        setShowHdfcOfficeCity(false);
        setOfficeStateIdd(stateId)
    }
    const fetchHdfcData = async (leadId) => {
        await axios.get(`${bankApi}/sendHdfcLead/${leadId}/2`)
            .then((response) => {
                let getDobfromApi = response.data.applyLoan.Date_Of_Birth__req;
                let dateRegex = /^\d{4}-\d{2}-\d{2}$/.test(getDobfromApi);
                if (dateRegex) {
                    setDob(response.data.applyLoan.Date_Of_Birth__req);
                } else {
                    let changeDateFormat = Moment(getDobfromApi, 'DDMMYYYY').format("YYYY-MM-DD");
                    setDob(changeDateFormat);
                }

                setFirstName(response.data.applyLoan.First_Name__req);
                setLastName(response.data.applyLoan.Last_Name__req);
                setGender(response.data.applyLoan.Gender__req);
                setLoanAmount(response.data.applyLoan.Loan_Amount__req);
                setEmi(response.data.applyLoan.EMI);
                setmonthlyTakeHomeSalary(response.data.applyLoan.Monthly_take_home_Salary__req);
                setResidanceTypeDap(response.data.applyLoan.residence_type_dap__req);
                setEmploymentType(response.data.applyLoan.employment_type__req);
                setHighestQualification(response.data.applyLoan.Educational_Qualification__req);
                setTotalDependent(response.data.applyLoan.No_of_Dependent__req);
                setYearsInCurrentResidence(response.data.applyLoan.Year_at_Current_Address);
                setyYearsInCurrentCity(response.data.applyLoan.Year_at_City);
                setPanCardNo(response.data.applyLoan.PAN_AC_No__req);
                setAddressLineOne(response.data.applyLoan.Address1_Resi__req);
                setAddressLineTwo(response.data.applyLoan.Address2_Resi__req);
                setAddressLineThree(response.data.applyLoan.Address3_Resi__req);
                setCityIdd(response.data.applyLoan.City_Resi__req.id);
                setCityName(response.data.applyLoan.City_Resi__req.name);
                setStateIdd(response.data.applyLoan.State_Resi__req.id);
                setStateName(response.data.applyLoan.State_Resi__req.name);
                setPincode(response.data.applyLoan.Pin_Code_Resi__req);
                setMobileNo(response.data.applyLoan.Mobile1_Resi__req);
                setPhoneNoWork(response.data.applyLoan.Phone1_Work);
                setResidentialEmailId(response.data.applyLoan.Email_Resi__req);
                setEmployerName(response.data.applyLoan.Employer_Name__req);
                setofficeAddressOne(response.data.applyLoan.Address1_Work__req);
                setofficeAddressTwo(response.data.applyLoan.Address2_Work__req);
                setOfficeStateIdd(response.data.applyLoan.State_Work__req.id);
                setOfficeStateName(response.data.applyLoan.State_Work__req.name);
                setOfficeCityIdd(response.data.applyLoan.City_Work__req.id);
                setOfficeCityName(response.data.applyLoan.City_Work__req.name);
                setbranchCodeIdd(response.data.applyLoan.Branch_code__req.id);
                setbranchCodeName(response.data.applyLoan.Branch_code__req.name);
                setRmCodeIdd(response.data.applyLoan.RM_code.id);
                setRmCodeName(response.data.applyLoan.RM_code.name);
                setSeCodeIdd(response.data.applyLoan.SE_code.id);
                setSeCodeName(response.data.applyLoan.SE_code.name);
                setOfficePincode(response.data.applyLoan.Pin_Code_Work__req);
            }).catch((error) => {
                console.log(error);
            })
    };
    const fetchPersonalReferenceData = async (leadId) => {
        await axios.get(`${bankApi}/sendHdfcLead/${leadId}/3`)
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
        } if (totalDependent === '') {
            setAlertMessage('Invalid Total Dependents')
            setIsError(true);
            return;

        }
        if (addressLineOne === '') {
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
        } if (cityName === '') {
            setAlertMessage('Invalid City')
            setIsError(true);
            return;
        } if (stateName === '') {
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
        }  if (employerName === '') {
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
        } if (officeCityName === '') {
            setAlertMessage('Invalid Office City')
            setIsError(true);
            return;
        } if (officeStateName === '') {
            setAlertMessage('Invalid Office State')
            setIsError(true);
            return;
        } if (officePincode === '' || !officePinRegex) {
            setAlertMessage('Invalid Office Pincode')
            setIsError(true);
            return;
        } if (brabchCodeName === '') {
            setAlertMessage('Invalid Branch Code Name');
            setIsError(true);
            return;
        } if (rmCodeName === '') {
            setAlertMessage('Invalid RM Code Name');
            setIsError(true);
            return;
        }
        if (employmentType === '') {
            setAlertMessage('Invalid Employment Type')
            setIsError(true);
            return;
        }
        let chechEmployerType = '';
        if (typeof employerIdd === 'number'){
            chechEmployerType = true
        }else{
            chechEmployerType = false;
        }
        let applyLoan = {
            Employer_Name : chechEmployerType ? employerIdd : '',  Employer_Name_other: chechEmployerType ? '' : employerName,
            First_Name: firstName, Last_Name: lastName, Gender: gender, Date_Of_Birth: dob, Educational_Qualification: highestQualification,
            Loan_Amount: loanAmount, PAN_AC_No: panCardNo, EMI: emi, Landmark_Resi: "", Landmark_Work: "", Passport_no: "", Voter_iD: "",
            City_Resi: cityIdd,State_Resi: stateIdd, Pin_Code_Resi: pincode, Address1_Resi: addressLineOne, Address2_Resi: addressLineTwo, 
            Address3_Resi: addressLineThree,Mobile1_Resi: mobileNo,STD_Code_Resi: "", Email_Resi: residentialEmailId, 
            Year_at_Current_Address: yearsInCurrentResidence,Year_at_City: yearsInCurrentCity,Address1_Work: officeAddressOne,
            Address2_Work: officeAddressTwo, Phone1_Work: phoneNoWork,Pin_Code_Work: officePincode, City_Work: officeCityIdd,
             State_Work: officeStateIdd, Monthly_take_home_Salary: monthlyTakeHomeSalary,  residence_type_dap: residanceTypeDap,
            employment_type: employmentType, No_of_Dependent: totalDependent, Branch_code: brabchCodeIdd, RM_code: rmCodeIdd, SE_code: seCodeIdd,
            Aadhar: "", Driving_License: "",
        }
        let items = { loan_data: { applyLoan } };
        const headers = { 'Content-Type': 'application/json' };
        await axios.post(`${bankApi}/sendHdfcLead/${leadId}/2`, items, { headers })
            .then((response) => {
                if (response.data.response_status === 'Success') {
                    setIsHdfcData(true);
                    setisPersonalDetail(false)
                    setisPersonalProgress(true)
                    setisCurrentProgress(true)
                    setisBusinessProgress(true)
                    setisPersonalReference(true)
                } if (response.data.response_status == 'failed') {
                    setAlertMessage(response.data.message);
                    setIsError(true);
                }
            }).catch((error) => {
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
        let loan_data = { ref_1_FirstName: refFirstName, ref_1_LastName: refLastName, ref_1_Mobile: refMobileNo, ref_1_Relationship: "" }
        let items = { loan_data };
        await axios.post(`${bankApi}/sendHdfcLead/${leadId}/3`, items)
            .then((response) => {
                if (response.data.response_status === 'Success') {
                    setisUploadDocument(true)
                    setisPersonalReference(false)
                    setisReferenceProgress(true)
                    setIsHdfcPersonalRefData(true)
                    hdfcUploadDocumentGetHandler(leadid);
                } if (response.data.response_status === 'failed') {
                    setAlertMessage(response.data.message);
                    setIsError(true);
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    const hdfcUploadDocumentGetHandler = async (leadId) => {
        await axios.get(`${bankApi}/sendHdfcLead/${leadId}/4`)
            .then((response) => {
                if (response.data.documents === "") {
                    history.goBack();
                } else {
                    setuploadDocumentGet(response.data.documents.Parent_Doc)
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    const disableHangUpSnacks = () => {
        sethangUpSnacks(false);
        setIsError(false);
        setIsHdfcData(false);
        setIsHdfcPersonalRefData(false);
        setisCopy(false);
    }
    const handleUpload = (file, folderName, parentId, childId) => {
        let fileExt = file.name.split('.').pop();
        const params = {
            Body: file,
            Bucket: 'cred-lead-docs-uat',
            Key: `${leadid}/hdfcDocs/${folderName}/${file.name}`
        };
        myBucket.upload(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else {
                let getUrl = data.Location;
                let loan_data = { s3_url: getUrl, fileName: `images.${fileExt}`, ContentType: `image/${fileExt}`, Parent_Doc_Id: parentId, Child_Doc_Id: childId };
                let items = { loan_data };
                axios.post(`${bankApi}/sendHdfcLead/${leadid}/4`, items)
                    .then((response) => {
                        console.log(response.data)
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        })
    }
    const uploadAllDocumentsHandler = async () => {
        let item = {}
        await axios.post(`${bankApi}/sendHdfcLead/${leadid}/5`, { item })
            .then((response) => {
                if (response.data.response_status === 'Success') {
                    setisApprovalStatus(true)
                    setisApprovalStatusProgress(true)
                    setisUploadDocument(false)
                    setisUploadProgress(true)
                    setisBankStatement(true)
                    setLosNo(response.data.los_no)
                } if (response.data.response_status === 'failed') {
                    setAlertMessage("something wrong please check");
                    setIsError(true);
                }
            }).catch((error) => {
                console.log(error);
            })
    }
    const copyLosNumber = (clip) =>{
        navigator.clipboard.writeText(clip).then(function(){
            setisCopy(true)
        },function(){
            setAlertMessage('Los No not copied!');
            setIsError(true)
        })
    }
    const trackStatusHandler = async () => {
        await axios.get(`${bankApi}/trackHdfcApi/${leadid}`)
            .then((response) => {
                console.log(response.data.response)
            }).catch((error) => {
                console.log(error)
            })
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
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCopy} autoHideDuration={1500} onClose={disableHangUpSnacks}>
                <Alert onClose={disableHangUpSnacks} severity="success">
                    Successfully copied to clipboard
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
                            required: true
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
                            required: true
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
                            required:true
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

                    </TextField>
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Highest Qualification"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
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
                        <option value="GRAD">Graduation</option>
                        <option value="POSTGRAD">Post Graduation</option>
                        <option value="DOCTRATE">Doctrate</option>
                        <option value="OTHERS">Others</option>
                    </TextField>
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Total Dependents"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
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
                        <option value="0">0</option>
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
                            required:false
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
                            required:false
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
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={panCardNo}
                        onChange={(e) => setPanCardNo(e.target.value.toUpperCase())}
                    />
                </FormContainer>
                <FormContainer Name="Residential Details" >
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Address Line 1"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
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
                            required:true
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
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={addressLineThree}
                        onChange={(e) => setAddressLineThree(e.target.value)}
                    />
                    <div>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="City"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required:true
                            }}
                            variant="outlined"
                            size="small"
                            value={cityName}
                            onChange={(e) => getHdfcCity(e)}
                        />
                        <ListGroup className="listGroup">
                            {showHdfcCity ? searchHdfcCity.map((city) => (
                                <ListGroup.Item key={city.value.city_id}
                                    onClick={() => selectHdfcCity(city.value.city_id, city.value.state_id)}
                                >{city.city_name}</ListGroup.Item>
                            )) : ''}
                        </ListGroup>
                    </div>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="State"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Pincode"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
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
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={mobileNo}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Email ID"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={residentialEmailId}
                        onChange={(e) => setResidentialEmailId(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Residence Type Dap"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:false
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
                            className="textField"
                            id="outlined-full-width"
                            label="Employer Name"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required:true
                            }}
                            variant="outlined"
                            size="small"
                            value={employerName}
                            onChange={(e) => getHdfcCompany(e)}
                        />
                        <ListGroup className="listGroup">
                            {showHdfcCompany ? searchHdfcCompany.map((company) => (
                                <ListGroup.Item key={company.value.id}
                                    onClick={() => selectHdfcCompany(company.value.id, company.city_name)}
                                >{company.city_name}</ListGroup.Item>
                            )) : ''}
                        </ListGroup>
                    </div>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Office Address 1"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
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
                            required:true
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
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={officeStateName}
                        onChange={(e) => setOfficeStateName(e.target.value)}
                    />
                    <div>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Office City"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required:true
                            }}
                            variant="outlined"
                            size="small"
                            value={officeCityName}
                            onChange={(e) => getHdfcOfficeCity(e)}
                        />
                        <ListGroup className="listGroup">
                            {showHdfcOfficeCity ? searchHdfcOfficeCity.map((city) => (
                                <ListGroup.Item key={city.value.city_id}
                                    onClick={() => selectHdfcOfficeCity(city.value.city_id, city.value.state_id)}
                                >{city.city_name}</ListGroup.Item>
                            )) : ''}
                        </ListGroup>
                    </div>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Office Pincode"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={officePincode}
                        onChange={(e) => setOfficePincode(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Branch Code"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={brabchCodeName}
                        onChange={(e) => setbranchCodeName(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="RM Code"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
                        }}
                        variant="outlined"
                        size="small"
                        value={rmCodeName}
                        onChange={(e) => setRmCodeName(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="SE Code"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:false
                        }}
                        variant="outlined"
                        size="small"
                        value={seCodeName}
                        onChange={(e) => setSeCodeName(e.target.value)}
                    />
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Employment Type"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required:true
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    >
                        <option value="">select One</option>
                        <option value="S">Salaried</option>
                        <option value="E">Self Employed</option>
                    </TextField>
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
                            required:true
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
                            required:true
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
                            required:true
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
                                            <select
                                                className='documentTypeSelect'
                                                value={addressProof}
                                                onChange={(e) => setAddressProof(e.target.value)}
                                            >
                                                <option value="">select one</option>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="addressProof-btn" hidden onClick={() => {
                                                addressProofBtn.addEventListener('change', function () {
                                                    actualProofFileChosen.textContent = this.files[0].name
                                                    if (this.files[0] != '') {
                                                        handleUpload(this.files[0], item.Parent_Doc_Desc, item.Parent_Doc_Id, addressProof)
                                                    }
                                                })
                                            }} />
                                            <label className='fileButton' for="addressProof-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div className='fileChosen' id="actualProof-file-chosen">No file chosen</div>
                                            <div className='uploadStatusButton'>
                                                <div
                                                    className='uploadStatusText'>Uploaded</div>
                                            </div>
                                        </div>
                                    )
                                }
                                if (item.Parent_Doc_Desc === "INCOME PROOF") {
                                    return (
                                        <div className="uploadDocumentRow">
                                            <h3 className='documentTypeText'>{item.Parent_Doc_Desc}</h3>
                                            <select
                                                className='documentTypeSelect'
                                                value={incomeProof}
                                                onChange={(e) => setIncomeProof(e.target.value)}
                                            >
                                                <option value="">select one</option>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="incomeProof-btn" hidden onClick={() => {
                                                incomeProofBtn.addEventListener('change', function () {
                                                    incomeProofFileChosen.textContent = this.files[0].name
                                                    if (this.files[0] != '') {
                                                        handleUpload(this.files[0], item.Parent_Doc_Desc, item.Parent_Doc_Id, incomeProof)
                                                    }
                                                })
                                            }} />
                                            <label className='fileButton' for="incomeProof-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div className='fileChosen' id="incomeProof-file-chosen">No file chosen</div>
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
                                            <select className='documentTypeSelect'
                                                value={bankStatement}
                                                onChange={(e) => setBankstatement(e.target.value)}
                                            >
                                                <option value="">select one</option>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="bankStatement-btn" hidden onClick={() => {
                                                bankStatementBtn.addEventListener('change', function () {
                                                    bankStatementFileChosen.textContent = this.files[0].name
                                                    if (this.files[0] != '') {
                                                        handleUpload(this.files[0], item.Parent_Doc_Desc, item.Parent_Doc_Id, bankStatement)
                                                    }
                                                })
                                            }} />
                                            <label className='fileButton' for="bankStatement-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div className='fileChosen' id="bankStatement-file-chosen">No file chosen</div>
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
                                            <select className='documentTypeSelect'
                                                value={identityProof}
                                                onChange={(e) => setIdentityProof(e.target.value)}
                                            >
                                                <option value="">select one</option>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="identityProof-btn" hidden onClick={() => {
                                                identityProofBtn.addEventListener('change', function () {
                                                    identityProofFileChosen.textContent = this.files[0].name
                                                    if (this.files[0] != '') {
                                                        handleUpload(this.files[0], item.Parent_Doc_Desc, item.Parent_Doc_Id, identityProof)
                                                    }
                                                })
                                            }} />
                                            <label className='fileButton' for="identityProof-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div className='fileChosen' id="identityProof-file-chosen">No file chosen</div>
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
                                            <select className='documentTypeSelect'
                                                value={loanTransferDoc}
                                                onChange={(e) => setLoanTransferDoc(e.target.value)}
                                            >
                                                <option value="">select one</option>
                                                {item.ChildDocMaster.Child_Doc.map(item => {
                                                    return <option value={item.Child_Doc_Id}>{item.Child_Doc_Desc}</option>
                                                })}
                                            </select>
                                            <input type="file" id="loanTransferDoc-btn" hidden onClick={() => {
                                                loanTransferDocBtn.addEventListener('change', function () {
                                                    loanTransferDocFileChosen.textContent = this.files[0].name
                                                    if (this.files[0] != '') {
                                                        handleUpload(this.files[0], item.Parent_Doc_Desc, item.Parent_Doc_Id, loanTransferDoc)
                                                    }
                                                })
                                            }} />
                                            <label className='fileButton' for="loanTransferDoc-btn">
                                                <div className='fileText'>Upload</div>
                                                <div className='plus'>+</div>
                                            </label>
                                            <div className='fileChosen' id="loanTransferDoc-file-chosen">No file chosen</div>
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
                    uploadAllDocumentsHandler();
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
                <div className="texualContainer" style={{paddingRight:'104px'}}>
                    <div className="headText2"><strong>Congratulations!</strong></div>
                    <div className="subText">Your Application has been <strong>successfully submitted.</strong> Our Team will get back to you in 24-48 hours.</div>
                    <div className='subText2'>CredFine.com doesn’t charge any money from customers for it’s Loan or Credit Card offerings. In case you<br/>
                             receive such communication from anyone claiming to be a CredFine representative, please contact us at <strong>care@credfine.com</strong></div>
                    <div className='losContainer'>
                        <div className='losHeader'><strong>Loan Tracking Number</strong></div>
                        <div className='losNumber'>{losNo}</div>
                        <div className='copyIcon' onClick={()=>copyLosNumber(losNo)}>
                            <i class="far fa-copy"></i>
                        </div>
                    </div>
                    <hr/>
                    <div className="trackStatus">
                        <div className="btnText" onClick={trackStatusHandler}>TRACK STATUS</div>
                    </div>
                </div>
            </div> : ''}
        </div>
    </div>
}