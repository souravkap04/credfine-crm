import React, { useState, useEffect } from 'react';
import './productLogin.css';
import logosign from '../../images/forms/logosign.svg';
import logosuccess from '../../images/forms/logosuccess.svg';
import back from '../../images/forms/back.svg';
import cross from '../../images/forms/cross.svg';
import OtpInput from 'react-otp-input';
import axios from "axios";
import base_url from "../../global/backendurl";
// import { useSelector } from 'react-redux';
import PL from '../../images/newIcons/PL.svg';
import CC from '../../images/newIcons/CC.svg';
import BL from '../../images/newIcons/BL.svg';
import HL from '../../images/newIcons/HL.svg';
import LAP from '../../images/newIcons/lap.svg';
import AL from '../../images/newIcons/AL.svg';
import EDU from '../../images/newIcons/EDU.svg';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ProductLogin() {
    // const activeTabTitle = useSelector((state) => state.activeTabTitle)
    const [isMobileNo, setisMobileNo] = useState(true);
    const [isOTP, setisOTP] = useState(false);
    const [otpValue, setotpValue] = useState('');
    const [otpError] = useState(false);
    const [isPhoneNumber, setisPhoneNumber] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [mobileError, setmobileError] = useState('');
    const [isError, setisError] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    let history = useHistory();
    const handleChange = (otp) => {
        setotpValue(otp)
    }
    const timer = (remaining, timerOn) => {
        var m = Math.floor(remaining / 60);
        var s = remaining % 60;

        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        document.getElementById('timer').innerHTML = m + ':' + s;
        remaining -= 1;

        if (remaining >= 0 && timerOn) {
            setTimeout(function () {
                timer(remaining);
            }, 1000);
            return;
        }

        if (!timerOn) {
            // Do validate stuff here
            return;
        }

        // Do timeout stuff here
        alert('Timeout for otp');
    }
    const getOTP = () => {
        if (isPhoneNumber === null || isPhoneNumber.length != 10) {
            setisError(true)
            setAlertMessage('Please enter 10 digit valid mobile number')
            return;
        } else {
            axios.post(`${base_url}/common/send_otp`, {
                mobile: isPhoneNumber
            }).then(response => {
                if (response.status === 200) {
                    setisMobileNo(false)
                    setisOTP(true)
                    setisSuccess(true)
                    setAlertMessage('OTP sent successfully....')
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    setisError(true)
                    setAlertMessage(error.response.data)
                }
                if (error) {
                    setisError(true)
                    setAlertMessage(error.response.data)
                }
            });
        }
    }
    const verifyOtp = () => {
        let items = { mobile: isPhoneNumber, otp: otpValue }
        axios.post(`${base_url}/common/verify_otp`, items)
            .then(response => {
                if (response.status === 200) {
                    setisSuccess(true)
                    setAlertMessage(response.data)
                    history.push(`/dashboards/PersonalLoanForm/${localStorage.getItem('getID')}`)
                }
            }).catch((error) => {
                if (error.response.status === 404) {
                    setisError(true)
                    setAlertMessage(error.response.data)
                }
                if (error) {
                    setisError(true)
                    setAlertMessage(error.response.data)
                }
            });
    }
    // const getActiveTitle = () => {
    //     if (activeTabTitle === "Personal Loan") {
    //         return "Personal Loan made simple on"
    //     }
    //     if (activeTabTitle === "Credit Card") {
    //         return "Instant Credit Card on"
    //     }
    //     if (activeTabTitle === "Business Loan") {
    //         return "Business Loan made simple on"
    //     }
    //     if (activeTabTitle === "Home Loan") {
    //         return "Home Loan made simple on"
    //     }
    //     if (activeTabTitle === "Loan Against Property") {
    //         return "Loan against Property made simple on"
    //     }
    //     if (activeTabTitle === "Auto Loan") {
    //         return "Auto Loan made simple on"
    //     }
    //     if (activeTabTitle === "Education Loan") {
    //         return "Education Loan made simple on"
    //     }
    // }
    // const getActiveImage = () => {
    //     if (activeTabTitle === "Personal Loan") {
    //         return PL
    //     }
    //     if (activeTabTitle === "Credit Card") {
    //         return CC
    //     }
    //     if (activeTabTitle === "Business Loan") {
    //         return BL
    //     }
    //     if (activeTabTitle === "Home Loan") {
    //         return HL
    //     }
    //     if (activeTabTitle === "Loan Against Property") {
    //         return LAP
    //     }
    //     if (activeTabTitle === "Auto Loan") {
    //         return AL
    //     }
    //     if (activeTabTitle === "Education Loan") {
    //         return EDU
    //     }
    // }
    // const getRightActiveTitle = () => {
    //     if (activeTabTitle === "Personal Loan") {
    //         return <div className="welcomeBackTitle">Get Personal Loan up to <strong>₹60 lacs!</strong></div>
    //     }
    //     if (activeTabTitle === "Credit Card") {
    //         return <div className="welcomeBackTitle">Apply for Credit Card Online</div>
    //     }
    //     if (activeTabTitle === "Business Loan") {
    //         return <div className="welcomeBackTitle">Get Business Loan up to<strong>₹5 Cr!</strong></div>
    //     }
    //     if (activeTabTitle === "Home Loan") {
    //         return <div className="welcomeBackTitle">Get Home Loan at just <strong>6.5%</strong></div>
    //     }
    //     if (activeTabTitle === "Loan Against Property") {
    //         return <div className="welcomeBackTitle">Get Home Loan at just <strong>6.5%</strong></div>
    //     }
    //     if (activeTabTitle === "Auto Loan") {
    //         return <div className="welcomeBackTitle">Get Home Loan at just <strong>6.5%</strong></div>
    //     }
    //     if (activeTabTitle === "Education Loan") {
    //         return <div className="welcomeBackTitle">Get Home Loan at just <strong>6.5%</strong></div>
    //     }
    // }
    const disableSnacks = () => {
        setisSuccess(false)
        setisError(false)
    }
    return (
        <div className="productLoginPageContainer">
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isSuccess} autoHideDuration={1500} onClose={disableSnacks}>
                <Alert onClose={disableSnacks} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isError} autoHideDuration={1500} onClose={disableSnacks}>
                <Alert onClose={disableSnacks} severity="error">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <div className="loginBox">
                <div className="leftBox">
                    {isMobileNo ? <React.Fragment>
                        <h2 className="loginText"><strong>Personal Loan made simple on</strong> Credfine.com</h2>
                        <div className="whiteBoxContainer">
                            <div className='logoImages'>
                                <img src={PL} alt="" />
                            </div>
                        </div>
                        <div className='contentTextContainer'>
                            <p>Quick Approval in <strong>20 minutes</strong></p>
                            <p><strong>100% Digital</strong> Documentation</p>
                            <p><strong>Unified Dashboard</strong> to manage Loans</p>
                            <p><strong>Flexible</strong> EMI Options</p>
                            <p>Lowest Interest Rate from <strong>10.25%</strong></p>
                        </div>
                        <div className="loginLogoSignImage">
                            <img src={logosign} alt="" />
                        </div></React.Fragment> : ''}
                    {isOTP ? <React.Fragment>
                        <div className="blackBtn">
                            <div className="btnText">Did you know</div>
                        </div>
                        <h2 className="loginTitle loginTitleAdjust">Approaching or checking your <strong>credit limit</strong> will not negatively impact your credit scores.</h2>
                        <div className="logoSuccessImage">
                            <img src={logosuccess} alt="" />
                        </div>
                    </React.Fragment> : ''}
                </div>
                <div className="rightBox">
                    {isMobileNo ? <React.Fragment>
                        <div className="welcomeBackTitle">Get Personal Loan up to <strong>₹60 lacs!</strong></div>
                        <div className="fieldContainer">
                            <div className="label">Mobile Number</div>
                            <div className="numberField">
                                <div className="leftPart">
                                    <div className="Text91">+91</div>
                                </div>
                                <div className="rightPart">
                                    <input type="text" value={isPhoneNumber} onChange={(e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setisPhoneNumber(e.target.value)
                                        }
                                    }} maxLength={10} />
                                </div>
                            </div>
                        </div>
                        <div className="otpSubmit" onClick={() => getOTP()}>
                            <div className="btnText">GET OTP</div>
                        </div>
                        <div id="my-signin2" className="my-signin2"></div>
                        <div className="bottomText">By logging in, you agree to the following <a href="#">Credit Report Terms of Use</a> and <a href="#">Terms of Use</a></div></React.Fragment> : <React.Fragment />}
                    {isOTP ? <React.Fragment>
                        <div className="backContainer">
                            <div className='backImage' onClick={() => {
                                setisMobileNo(true)
                                setisOTP(false)
                                timer(0, false)
                                setotpValue('')
                                setisPhoneNumber('')
                            }}>
                                <img src={back} alt="" />
                            </div>
                            <div className='crossImage' onClick={() => {
                                setisMobileNo(true)
                                setisOTP(false)
                                timer(0, false)
                                setotpValue('')
                                setisPhoneNumber('')
                            }}>
                                <img src={cross} alt="" />
                            </div>
                        </div>
                        <div className="enterOTPlabel">Enter OTP</div>
                        <div className="otpAdjustContainer" method="get" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                            <OtpInput
                                value={otpValue}
                                onChange={handleChange}
                                numInputs={4}
                                hasErrored={otpValue == '' ? true : false}
                                errorStyle="otpError"
                            />
                            {otpError ? <div className="otpTextError">Incorrect OTP, try again</div> : ''}
                        </div>
                        <div className="otpSubmit" onClick={() => verifyOtp()}>
                            <div className="btnText">CONTINUE</div>
                        </div>
                        <div id="timer"></div>
                        <div className="resentText">Did not get OTP? <span>Resend</span></div>
                    </React.Fragment> : <React.Fragment />}
                </div>
            </div>
        </div>
    )
}