import React, { useState, useEffect } from 'react';
import './HDFC.css';
import logo from '../../images/forms/hdfc.svg';
import back from '../../images/forms/back.svg';
import TextField from '@material-ui/core/TextField';
import FormContainer from '../FormContainer/FormContainer';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import uploadSRC from '../../images/forms/fileUpload.svg';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router-dom';
import phoneCall from '../../images/forms/phoneCall.svg';
export default function HDFCFrom() {
    const history = useHistory();
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
    return <div className="HDFCFormContainer">
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
                <FormContainer Name="Personal Details" onClick={() => {
                    setisPersonalDetail(false)
                    setisCurrentResidentialDetail(true)
                    setisPersonalProgress(true)
                }}>
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
                    // value={name}
                    // onChange={(e) => setname(e.target.value)}
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
                    // value={name}
                    // onChange={(e) => setname(e.target.value)}
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
                    // value={loanAmount}
                    // onChange={(e) => {
                    //     const re = /^[0-9\b]+$/;
                    //     if (e.target.value === '' || re.test(e.target.value)) {
                    //         setLoanAmount(e.target.value)
                    //     }
                    // }}
                    >
                        <option value="">Select One</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="LGBT">LGBT</option>
                    </TextField>
                    <TextField
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
                    // value={date}
                    // onChange={(e) => setDate(e.target.value)}
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                        <option value="Divorced">Divorced</option>
                    </TextField>
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
                    // value={pancardNo}
                    // onChange={(e) => setPancardNo(e.target.value.toUpperCase())}
                    >
                        <option value="">Select One</option>
                        <option value="">SSC</option>
                        <option value="">HSC / Dilopma</option>
                        <option value="">Degree</option>
                        <option value="">Masters Degree</option>
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
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
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
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Total Years in Current Residence"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                    // value={maskPhoneNo(mobileNo)}
                    // disabled
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
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Total Years in Current City"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                    // value={maskPhoneNo(mobileNo)}
                    // disabled
                    >
                        <option value="">Select One</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25+">25+</option>
                    </TextField>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Personal PAN Number"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // helperText="Invalid PAN"
                        variant="outlined"
                        size="small"
                        maxLength="10"
                    />
                    <TextField
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
                    >
                        <option value="">Select One</option>
                        <option value="Renovation">Renovation</option>
                    </TextField>
                    <TextField
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
                    >
                        <option value="">Select One</option>
                        <option value="MBA">MBA</option>
                        <option value="MCOM">MCOM</option>
                    </TextField>
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
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                </FormContainer>
                <FormContainer Name="Residential Details" onClick={() => {
                    setisCurrentResidentialDetail(false)
                    setisBusinessDetail(true)
                    setisCurrentProgress(true)
                }}>
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
                    // value={pincode}
                    // onChange={(e) => getPincodeHandler(e)}
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
                    // value={city}
                    // disabled
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
                    // value={states}
                    // disabled
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        select
                        label="City"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        size="small"
                    // value={currentResidentType}
                    // onChange={(e) => setCurrentResidentType(e.target.value)}
                    >
                        <option key="" value="">Select</option>
                    </TextField>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        select
                        label="Pincode"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        size="small"
                    // value={currentResidentType}
                    // onChange={(e) => setCurrentResidentType(e.target.value)}
                    >
                        <option key="" value="">Select</option>
                    </TextField>
                </FormContainer>
                <FormContainer Name="Business Details" onClick={() => {
                    setisBusinessDetail(false)
                    setisPersonalReference(true)
                    setisBusinessProgress(true)
                }}>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Employer Name"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                    // value={employmentType}
                    // onChange={(e) => setEmploymentType(e.target.value)}
                    />
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
                    // value={companyName}
                    // onChange={(e) => searchCompanyHandler(e)}
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
                    // value={companyName}
                    // onChange={(e) => searchCompanyHandler(e)}
                    />
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Office State"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                    // value={designation}
                    // onChange={(e) => setDesignation(e.target.value)}
                    >
                        <option value="">Select One</option>
                    </TextField>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        select
                        label="Office City"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                    // value={currentWorkExp}
                    // onChange={(e) => setCurrentWorkExp(e.target.value)}
                    >
                        <option key="" value="">Select</option>
                    </TextField>
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
                    // value={totalWorkExp}
                    // onChange={(e) => setTotalWorkExp(e.target.value)}
                    />
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Mailing Address"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                    // value={monthlyIncome}
                    // onChange={(e) => {
                    //     const re = /^[0-9\b]+$/;
                    //     if (e.target.value === '' || re.test(e.target.value)) {
                    //         setMonthlyIncome(e.target.value)
                    //     }
                    // }}
                    >
                        <option value="">Select One</option>
                    </TextField>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="HDFC Bank Account Number"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                    // value={salaryCreditMode}
                    // onChange={(e) => setSalaryCreditMode(e.target.value)}
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
                    // value={salaryBankAcc}
                    // onChange={(e) => setSalaryBankAcc(e.target.value)}
                    />
                </FormContainer>
                <FormContainer Name="Personal Reference" onClick={() => {
                    setisPersonalReference(false)
                    setisUploadDocument(true)
                    setisReferenceProgress(true)
                    setisBankStatement(true)
                }}>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="First Name"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                    // value={currentEMI}
                    // onChange={(e) => setCurrentEMI(e.target.value)}
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
                    // value={creditCardOutstanding}
                    // onChange={(e) => setcreditCardOutstanding(e.target.value)}
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
                    // value={creditCardbalanceTransfer}
                    // onChange={(e) => {
                    //     const re = /^[0-9\b]+$/;
                    //     if (e.target.value === '' || re.test(e.target.value)) {
                    //         setcreditCardOutstanding(e.target.value)
                    //     }
                    // }}
                    />
                    <div className="checkboxContainer">
                        <Checkbox className="check" />
                        <p>By submitting I provide my consent to retrieve my credit information from Credit Bureaus including CIBIL to check eligibility for this application. I understand that this may impact my credit score.</p>
                    </div>
                </FormContainer>
                <div className="uploadContainer">
                    <div className="uploadBankStatementContainer">
                        <div className="titleContainer">
                            <div className="headText">Upload Bank Statement</div>
                            <CheckCircleIcon className="tickCircle" />
                        </div>
                        <div className="subText">Last 3 months </div>
                        <div className="uploadMainBox">
                            <div className="boxBorder">
                                <div className="uploadImage">
                                    <img src={uploadSRC} alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="uploadSalaryslipContainer">
                        <div className="titleContainer">
                            <div className="headText">Upload Salary Slip</div>
                            <CheckCircleIcon className="tickCircle" />
                        </div>
                        <div className="subText">Last 2 months</div>
                        <div className="uploadMainBox">
                            <div className="boxBorder">
                                <div className="uploadImage">
                                    <img src={uploadSRC} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="uploadAddressProof">
                        <div className="titleContainer">
                            <div className="headText">Upload Address Proof</div>
                            <CheckCircleIcon className="tickCircle" />
                        </div>
                        <div className="subText">Address proof as mentioned here</div>
                        <div className="uploadAdjustContainer">
                            <div className="leftPart">
                                <div className="uploadMainBox">
                                    <div className="boxBorder">
                                        <div className="uploadImage">
                                            <img src={uploadSRC} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="front">Front</div>
                            </div>
                            <div className="rightPart">
                                <div className="uploadMainBox">
                                    <div className="boxBorder">
                                        <div className="uploadImage">
                                            <img src={uploadSRC} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="back">Back</div>
                            </div>
                        </div>
                    </div>
                </div>
                <FormContainer isSaveNextButton={true} className="uploadDocumentFormContainer" onClick={() => {
                    setisApprovalStatus(true)
                    setisPersonalDetail(false)
                    setisApprovalStatusProgress(true)
                    setisUploadProgress(true)
                    setisBankStatement(true)
                    setisPersonalProgress(true)
                    setisCurrentProgress(true)
                    setisBusinessProgress(true)
                    setisReferenceProgress(true)
                }}>
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Document Password"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                    // value={currentEMI}
                    // onChange={(e) => setCurrentEMI(e.target.value)}
                    />
                    <TextField
                        className="textField"
                        id="outlined-full-width"
                        label="Document Password"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                    // value={creditCardOutstanding}
                    // onChange={(e) => setcreditCardOutstanding(e.target.value)}
                    />
                    <TextField
                        select
                        className="textField"
                        id="outlined-full-width"
                        label="Document Type"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                        size="small"
                    // value={creditCardbalanceTransfer}
                    // onChange={(e) => setcreditCardOutstanding(e.target.value)}
                    >
                        <option value="">Select One</option>
                        <option value="voterId">Voter ID</option>
                    </TextField>
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