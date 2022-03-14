import React, { useState } from 'react';
import './Paysense.css';
import axios from 'axios';
import { bankApi } from '../../global/bankingApis';
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

const Paysense = () => {
    const history = useHistory();
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
    const basicDetailsHandler = () => {
        setIsBasicDetails(false);
        setisBasicProgress(true);
        setisPersonalDetail(true);
        setisPersonalProgress(true);
    }
    const pesonalDetailsHandle = () => {
        setIsBasicDetails(false);
        setisPersonalDetail(false);
        setIsApprovalStatus(true);
        setIsApprovalProgress(true);
    }
    return (
        <div className='PaysenseContainer'>
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
                            <div className='copyIcon' >
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