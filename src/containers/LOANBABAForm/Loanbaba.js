import React, { useState, useEffect } from 'react';
import './Loanbaba.css';
import axios from 'axios';
import Moment from 'moment';
import { bankApi } from '../../global/bankingApis';
import { useHistory, useParams } from 'react-router-dom';
import logo from '../../images/forms/loanbaba.png';
import back from '../../images/forms/back.svg';
import phoneCall from '../../images/forms/phoneCall.svg';
import { List, TextField } from '@material-ui/core';
import FormContainer from '../FormContainer/FormContainer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Loanbaba = () => {
    const history = useHistory();
    const { leadid } = useParams();
    const [isPersonalDetail, setisPersonalDetail] = useState(true);
    const [isPersonalProgress, setisPersonalProgress] = useState(false);
    const [isApprovalStatus, setIsApprovalStatus] = useState(false);
    const [isApprovalProgress, setIsApprovalProgress] = useState(false);
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [panCardNo, setPanCardNo] = useState('');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');
    const [emailID, setEmailID] = useState('');
    const [isError, setIsError] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [uniqueID, setUniqueID] = useState('');
    console.log("dob:" + dob);
    useEffect(() => {
        fetchLoanbabaData(leadid)
    }, [])
    const fetchLoanbabaData = async (leadId) => {
        await axios.get(`${bankApi}/sendLeadPartner/${leadId}/2/0`)
            .then((response) => {
                setFullName(response.data.nameOnPan);
                setMobileNo(response.data.phone);
                setPanCardNo(response.data.panNo);
                setCity(response.data.city);
                setSalary(response.data.salary);
                setEmailID(response.data.email);
                setDob(response.data.dateOfBirth);
            }).catch((error) => {
                console.log(error);
            })
    }
    const loanBabaPresonalDetailsHandler = async (leadID) => {
        let mobRegex = /^[6-9]\d{9}$/.test(mobileNo);
        let panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(panCardNo)
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailID);
        if (fullName === '') {
            setAlertMessage('Invalid Full Name')
            setIsError(true)
            return;
        }
        if(dob === '') {
            setAlertMessage('Invalid Date of Birth')
            setIsError(true)
            return;
        }
        if (mobileNo === '' || !mobRegex) {
            setAlertMessage('Invalid Mobile Number')
            setIsError(true)
            return;
        }
        if (panCardNo === '' || !panRegex) {
            setAlertMessage('Invalid Pancard Number')
            setIsError(true)
            return;
        }
        if (city === '') {
            setAlertMessage('Invalid City')
            setIsError(true)
            return;
        }
        if (salary === '') {
            setAlertMessage('Invalid Salary')
            setIsError(true)
            return;
        }
        if (emailID === '' || !emailRegex) {
            setAlertMessage('Invalid Mail ID')
            setIsError(true)
            return;
        }
        let items = {panNo:panCardNo,nameOnPan:fullName,phone:mobileNo,email:emailID,dateOfBirth:dob,city:city,salary:salary}
        await axios.post(`${bankApi}/sendLeadPartner/${leadID}/2/0`, items)
            .then((response) => {
                if (response.data.response.statusCode === '200') {
                    setAlertMessage(response.data.response.message)
                    setIsSuccess(true);
                    setisPersonalDetail(false)
                    setisPersonalProgress(true)
                    setIsApprovalProgress(true)
                    setIsApprovalStatus(true);
                    setUniqueID(response.data.response.lbUniqueId)
                }
                if(response.data.response.statusCode === '400') {
                    setAlertMessage(response.data.response.message)
                    setIsError(true);
                }
                if(response.data.response.statusCode === '401') {
                    setIsError(true);
                    setAlertMessage('Unauthorized Token')
                }
                if(response.data.response.statusCode === '500') {
                    setIsError(true);
                    setAlertMessage('Internal Server Error')
                }
            }).catch((error) => {
                if(error.response.status === 400){
                    setIsError(true);
                    setAlertMessage('Bad Request')
                }else{
                    setIsError(true);
                    setAlertMessage('Something Wrong')
                }
            })

    }
    const copyUniqueIDNumber = (clip) => {
        navigator.clipboard.writeText(clip).then(function () {
            setIsCopy(true)
        }, function () {
            setIsError(true)
            alertMessage('uniqueID Not Copied!')
        })
    }
    const trackStatusHandler = () => {
        console.log('trackStatusHandler');
    }
    const closeSnackbar = () => {
        setIsError(false);
        setIsSuccess(false);
        setIsCopy(false);
    }
    return (
        <div className='LoanbabaContainer'>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isError} autoHideDuration={1500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isSuccess} autoHideDuration={1500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCopy} autoHideDuration={1500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success">
                    Successfully copied to clipboard
                </Alert>
            </Snackbar>
            <div className='leftSection'>
                <div className='loanbabaimg'>
                    <img src={logo} alt="" />
                </div>
                <List className='list'>
                    <div className='progressContainer'>
                        <div className='progressBox'>
                            <div className='progressIconBox'>
                                <div className={isPersonalProgress ? 'iconBar activeiconBar' : isPersonalDetail ? "iconBar activeCurrent" : "iconBar"}></div>
                                <div className='bottomProgressBar'></div>
                            </div>
                            <div className='iconText'>Personal Details</div>
                        </div>
                        <div className='progressBox'>
                            <div className='progressIconBox'>
                                <div className={isApprovalProgress ? 'iconBar activeiconBar' : isApprovalStatus ? "iconBar activeCurrent" : "iconBar"}></div>
                            </div>
                            <div className='iconText'>Loan Approval Status</div>
                        </div>
                    </div>
                </List>
            </div>
            <div className='rightSection'>
                <div className='headerContainer'>
                    <div className="backButton" onClick={() => history.goBack()}>
                        <img src={back} alt="" />
                    </div>
                    <div className='needHelpContainer'>
                        <div className="needHelpText">Need Help?</div>
                        <div className="rightPart">
                            <div className="phoneCall">
                                <img src={phoneCall} alt="" />
                            </div>
                            <div className="numberText">7045330702</div>
                        </div>
                    </div>
                </div>
                {isPersonalDetail && <div>
                    <div className='texualContainer'>
                        <div className='headText'> <strong>Congratulations!</strong> your personal loan is a few steps away…</div>
                    </div>
                    <div className='offerContainer'>
                        <div className='offerBox'>
                            <div className='offerHead'>Loan Amount</div>
                            <div className='offerText'>₹ 15,00,000</div>
                        </div>
                        <div className='offerBox'>
                            <div className='offerHead'>Loan Tenure</div>
                            <div className='offerText'>5 Years</div>
                        </div>
                        <div className='offerBox'>
                            <div className='offerHead'>Interest Rate</div>
                            <div className='offerText'>10.25%</div>
                        </div>
                        <div className='offerBox'>
                            <div className='offerHead'>EMI</div>
                            <div className='offerText'>₹ 27,575</div>
                        </div>
                        <div className='offerBox'>
                            <div className='offerHead'>Processing Fee</div>
                            <div className='offerText'>₹ 1,999</div>
                        </div>
                    </div>
                    <div className="offerBorder"></div>
                    <FormContainer Name="Personal Details" isSaveNextButton={true} onClick={() => loanBabaPresonalDetailsHandler(leadid)}>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Full Name as Per Pancard"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required: true
                            }}
                            variant="outlined"
                            size="small"
                            value={fullName}
                            onChange={(e) => {
                                const re = /^[A-Za-z\\s]+/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setFullName(e.target.value)
                                }
                            }}
                        />
                        <TextField
                            type="date"
                            className="textField"
                            id="outlined-full-width"
                            label="Dath of Birth"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required: true
                            }}
                            variant="outlined"
                            size="small"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Mobile No"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required: true
                            }}
                            inputProps={{
                                maxLength: 10
                            }}
                            variant="outlined"
                            size="small"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Personal PAN Number"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required: true
                            }}
                            variant="outlined"
                            size="small"
                            value={panCardNo}
                            onChange={(e) => setPanCardNo(e.target.value.toUpperCase())}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            type='text'
                            label="City"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required: true
                            }}
                            variant="outlined"
                            size="small"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Salary"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required: true
                            }}
                            variant="outlined"
                            size="small"
                            value={salary}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setSalary(e.target.value)
                                }
                            }}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Email ID"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                                required: true
                            }}
                            inputProps={{
                                maxLength: 128
                            }}
                            variant="outlined"
                            size="small"
                            value={emailID}
                            onChange={(e) => setEmailID(e.target.value)}
                        />
                    </FormContainer>
                </div>}
                {isApprovalStatus &&
                    <div className="texualContainer">
                        <div className="headText2"><strong>Congratulations!</strong></div>
                        <div className="subText">Your Application has been <strong>successfully submitted.</strong> Our Team will get back to you in 24-48 hours.</div>
                        <div className='subText2'>CredFine.com doesn’t charge any money from customers for it’s Loan or Credit Card offerings. In case you<br />
                            receive such communication from anyone claiming to be a CredFine representative, please contact us at <strong>care@credfine.com</strong></div>
                        <div className='losContainer'>
                            <div className='losHeader'><strong>Loan Tracking Number</strong></div>
                            <div className='losNumber'>{uniqueID}</div>
                            <div className='copyIcon' onClick={() => copyUniqueIDNumber(uniqueID)}>
                                <i class="far fa-copy"></i>
                            </div>
                        </div>
                        <hr />
                        <div className='trackStatus'>
                        <div className="statusBtn">
                            <div className="btnText" onClick={trackStatusHandler}>TRACK STATUS</div>
                        </div>
                        <div className='statusText'>or email us with the Reference No:<br/><strong>info@credfine.com</strong></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};


export default Loanbaba;