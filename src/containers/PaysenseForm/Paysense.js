import React, { useState, useEffect } from 'react';
import './Paysense.css';
import axios from 'axios';
import { paysenseApi } from '../../global/bankingApis';
import { useHistory, useParams } from 'react-router-dom';
import { getProfileData } from "../../global/leadsGlobalData";
import back from '../../images/forms/back.svg';
import logo from '../../images/forms/paysense.svg'
import phoneCall from '../../images/forms/phoneCall.svg';
import { List, TextField } from '@material-ui/core';
import FormContainer from '../FormContainer/FormContainer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Paysense = () => {
    const history = useHistory();
    const profileData = getProfileData();
    const { leadid } = useParams();
    const [isBasicDetails, setIsBasicDetails] = useState(true)
    const [isBasicProgress, setisBasicProgress] = useState(false);
    const [isPersonalDetail, setisPersonalDetail] = useState(false);
    const [isPersonalProgress, setisPersonalProgress] = useState(false);
    const [isApprovalStatus, setIsApprovalStatus] = useState(false);
    const [isApprovalProgress, setIsApprovalProgress] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [panCardNo, setPanCardNo] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState('');
    const [employmentType, setEmploymentType] = useState("");
    const [gender, setGender] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [emailID, setEmailID] = useState("");
    const [isError, setIsError] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    useEffect(() => {
        getBasicdetailsData(leadid);
        getPersonaldetailsData(leadid);
    }, [])
    const getBasicdetailsData = async (leadID) => {
        const headers = { Authorization: `Token ${profileData.token}` };
        await axios.get(`${paysenseApi}/leads/sendLeadPartner/${leadID}/3/1`, { headers })
            .then((response) => {
                setPanCardNo(response.data.panNo);
                setMobileNo(response.data.phone)
            }).catch((error) => {
                console.log(error);
            })
    }
    const getPersonaldetailsData = async (leadID) => {
        const headers = { Authorization: `Token ${profileData.token}` };
        await axios.get(`${paysenseApi}/leads/sendLeadPartner/${leadID}/3/2`, { headers })
            .then((response) => {
                setPanCardNo(response.data.pan);
                setMobileNo(response.data.phone)
                setFirstName(response.data.first_name.split(' ').slice(0, -1).join(' '))
                setLastName(response.data.last_name.split(' ').slice(-1).join(' '))
                setDob(response.data.date_of_birth)
                setEmploymentType(response.data.employment_type)
                setGender(response.data.gender)
                setEmailID(response.data.email)
                setMonthlyIncome(response.data.monthly_income)
                setPostalcode(response.data.postal_code)
            }).catch((error) => {
                console.log(error);
            })
    }
    const basicDetailsHandler = async () => {
        if (panCardNo === '') {
            setAlertMessage('Invalid Pancard Number')
            setIsError(true)
            return;
        }
        if (mobileNo === '') {
            setAlertMessage('Invalid Mobile Number')
            setIsError(true)
            return;
        }
        const headers = { Authorization: `Token ${profileData.token}` };
        let items = { panNo: panCardNo, phone: mobileNo }
        await axios.post(`${paysenseApi}/leads/sendLeadPartner/${leadid}/3/1`, items, { headers })
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.leads[0].status === 'not-registered') {
                        setIsBasicDetails(false);
                        setisBasicProgress(true);
                        setisPersonalDetail(true);
                        setisPersonalProgress(true);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })

    }
    const pesonalDetailsHandle = async () => {
        if (panCardNo === '') {
            setAlertMessage('Invalid Pancard Number')
            setIsError(true)
            return;
        }
        if (firstName === '') {
            setAlertMessage('Invalid First Name')
            setIsError(true)
            return;
        }
        if (lastName === '') {
            setAlertMessage('Invalid Last Name')
            setIsError(true)
            return;
        }
        if (dob === '') {
            setAlertMessage('Invalid Date of Birth')
            setIsError(true)
            return;
        }
        if (employmentType === '') {
            setAlertMessage('Invalid Employment Type')
            setIsError(true)
            return;
        }
        if (gender === '') {
            setAlertMessage('Invalid Gender')
            setIsError(true)
            return;
        }
        if (monthlyIncome === '') {
            setAlertMessage('Invalid Monthly Income')
            setIsError(true)
            return;
        }
        if (postalcode === '') {
            setAlertMessage('Invalid Postal Code')
            setIsError(true)
            return;
        }
        if (mobileNo === '') {
            setAlertMessage('Invalid Mobile Number')
            setIsError(true)
            return;
        }
        if (emailID === '') {
            setAlertMessage('Invalid Email ID')
            setIsError(true)
            return;
        }
        const headers = { Authorization: `Token ${profileData.token}` };
        let items = {
            pan: panCardNo, phone: mobileNo, first_name: firstName, last_name: lastName, gender, date_of_birth: dob,
            employment_type: employmentType, monthly_income: monthlyIncome, postal_code: postalcode, email: emailID,
            product_offering: "product_offering", terms_accepted: true, "phone_verified": true
        }
        await axios.post(`${paysenseApi}/leads/sendLeadPartner/${leadid}/3/2`, items, { headers })
            .then((response) => {
                if (response.data.status_code === 200) {
                    setIsBasicDetails(false);
                    setisPersonalDetail(false);
                    setIsApprovalStatus(true);
                    setIsApprovalProgress(true);
                }
                else if (response.data.status_code === 400) {
                    setAlertMessage(response.data.message)
                    setIsError(true)
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    const closeSnackbar = () => {
        setIsError(false);
        setIsCopy(false)
    }
    const copyUniqueIDNumber = (clip) => {
        navigator.clipboard.writeText(clip).then(function () {
            setIsCopy(true)
        }, function () {
            setIsError(true)
            alertMessage('uniqueID Not Copied!')
        })
    }
    return (
        <div className='PaysenseContainer'>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isError} autoHideDuration={1500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCopy} autoHideDuration={1500} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success">
                    Successfully copied to clipboard
                </Alert>
            </Snackbar>
            <div className='leftSection'>
                <div className='image'>
                    <img src={logo} alt="" />
                </div>
                <List className='list'>
                    <div className='progressContainer'>
                        <div className='progressBox'>
                            <div className='progressIconBox'>
                                <div className={isBasicProgress ? 'iconBar activeiconBar' : isBasicDetails ? "iconBar activeCurrent" : "iconBar"}></div>
                                <div className='bottomProgressBar'></div>
                            </div>
                            <div className='iconText'>Basic Details</div>
                        </div>
                        <div className='progressBox'>
                            <div className='progressIconBox'>
                                <div className={isPersonalProgress ? 'iconBar activeiconBar' : isPersonalDetail ? "iconBar activeCurrent" : "iconBar"}></div>
                                <div className='bottomProgressBar'></div>
                            </div>
                            <div className='iconText'>Personal & Income Details</div>
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
                {isBasicDetails && <div>
                    <div className='texualContainer'>
                        <div className='headText'> <strong>Congratulations!</strong> your personal loan is a few steps away…</div>
                    </div>
                    {/* <div className='offerContainer'>
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
                    </div> */}
                    <div className="offerBorder"></div>
                    <FormContainer Name="Basic Details" btnColor='#1C86FC' isSaveNextButton={true} onClick={() => basicDetailsHandler()}>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Personal PAN Number"
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
                            value={panCardNo}
                            onChange={(e) => setPanCardNo(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Mobile Number"
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
                    </FormContainer>
                </div>
                }
                {isPersonalDetail && <div>
                    <div className='texualContainer'>
                        <div className='headText'> <strong>Congratulations!</strong> your personal loan is a few steps away…</div>
                    </div>
                    {/* <div className='offerContainer'>
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
                    </div> */}
                    <div className="offerBorder"></div>
                    <FormContainer Name="Personal & Income Details" btnColor='#1C86FC' isSaveNextButton={true} onClick={() => pesonalDetailsHandle()}>
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Personal PAN Number"
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
                            value={panCardNo}
                            onChange={(e) => setPanCardNo(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="First Name"
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Last Name"
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            type='date'
                            className="textField"
                            id="outlined-full-width"
                            label="Dath of Birth"
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
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Employment Type"
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
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Gender"
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
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Monthly Income"
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
                            value={monthlyIncome}
                            onChange={(e) => setMobileNo(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Postal Code (Current Address)"
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
                            value={postalcode}
                            onChange={(e) => setPostalcode(e.target.value)}
                        />
                        <TextField
                            className="textField"
                            id="outlined-full-width"
                            label="Phone Number"
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
                            label="Email ID"
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
                            value={emailID}
                            onChange={(e) => setEmailID(e.target.value)}
                        />
                    </FormContainer>
                </div>}
                {
                    isApprovalStatus && <div className="texualContainer">
                        <div className="headText2"><strong>Thank you for applying your Personal Loan</strong></div>
                        <div className="subText">Your Application has been <strong>successfully submitted.</strong> Our Team will get back to you in 24-48 hours.</div>
                        <div className='subText2'>CredFine.com doesn’t charge any money from customers for it’s Loan or Credit Card offerings. In case you<br />
                            receive such communication from anyone claiming to be a CredFine representative, please contact us at <strong>care@credfine.com</strong></div>
                        <div className='losContainer'>
                            <div className='losHeader'><strong>Loan Tracking Number</strong></div>
                            <div className='losNumber'>1234567890</div>
                            <div className='copyIcon' onClick={() => copyUniqueIDNumber("1234567890")}>
                                <i class="far fa-copy"></i>
                            </div>
                        </div>
                        <hr />
                        <div className='trackStatus'>
                            <div className="statusBtn">
                                <div className="btnText">TRACK STATUS</div>
                            </div>
                            <div className='statusText'>or email us with the Reference No:<br /><strong>info@credfine.com</strong></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};


export default Paysense;