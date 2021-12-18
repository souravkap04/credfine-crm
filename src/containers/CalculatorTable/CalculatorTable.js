import React, { useState, useEffect } from 'react';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import WhatsApp from '../../images/whatsapp.svg';
import iconEmail from '../../images/iconEmail.svg';
import iconDownload from '../../images/iconDownload.svg';
import clsx from 'clsx';
import './calculatortable.css';
import $ from 'jquery';
const useStyles = makeStyles({
    container: {
        marginBottom: '50px'
    },
    table: {
        width: '100%',
    },
    tableheading: {
        backgroundColor: '#8f9bb3',
        color: '#ffffff',
        fontSize: '14px'
    },
    statusHeading: {
        textAlign: 'center'
    },
    checkboxFix: {
        color: '#ffffff'
    },
    tabledata: {
        fontSize: '12px'
    },
    emptydata: {
        position: 'relative',
        left: '35vw',
        fontSize: '15px',
        whiteSpace: 'nowrap'
    },
    click: {
        cursor: 'pointer',
        color: 'blue'
    },
    callButton: {
        backgroundColor: '#14cc9e',
        padding: '9px',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.4)'
        }
    },
    callIcon: {
        color: '#ffffff',
        fontSize: '17px'
    },
    callingBtn: {
        margin: '20px'
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
    }
});
function emi_calculator(p, r, t) {
    let emi;
    r = r / (12 * 100); // one month interest
    emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    return price_comma(Math.round(emi));
}
function price_comma(price) {
    var x = Math.floor(price);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}
function interestCalculate(p, r, t) {
    let interest;
    r = r / (12 * 100);
    var emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    var full = t * emi;
    interest = full - p;
    return price_comma(Math.round(interest))
}
function fullEMICalculate(p, r, t) {
    let actualEMI;
    r = r / (12 * 100);
    var emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    actualEMI = t * emi;
    return price_comma(Math.round(actualEMI))
}
function interestPercentage(p, r, t) {
    let interest;
    r = r / (12 * 100);
    var emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    var full = t * emi;
    interest = full - p;
    interest = (interest / full) * 100;
    return interest.toFixed(1);
}
function principalPercentage(p, r, t) {
    let percentage;
    r = r / (12 * 100);
    var emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    var full = t * emi;
    percentage = (p / full) * 100;
    return percentage.toFixed(1);
}
export default function CalculatorTable(props) {
    const [repaymentData, setrepaymentData] = useState([]);
    const [whatsapp, setwhatsapp] = useState('');
    const [emailSent, setemailSent] = useState('');
    const [isWhatsapp, setisWhatsapp] = useState(true);
    const [isEmail, setisEmail] = useState(false);
    const [isDownload, setisDownload] = useState(false);
    const classes = useStyles();
    const [openCalculate, setopenCalculate] = useState(false);
    const openCalculator = () => {
        setopenCalculate(true);
    }
    const closeCalculator = () => {
        setopenCalculate(false);
    }
    const Data = [
        {
            month: '1',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '2',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '3',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '4',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '5',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '6',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '7',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '8',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '9',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '10',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '11',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        },
        {
            month: '12',
            principal: '30,611',
            interestPaid: ' 25,000',
            monthEndBalance: '24,69,389'
        }
    ]
    const calculateRepayment = (p, numberOfMonths, rateOfInterest, emi) => {
        var detailDesc = [];
        var bb = p;
        var int_dd = 0;
        var pre_dd = 0;
        var end_dd = 0;
        var principalPer = 0;
        var interetPer = 0;
        for (var j = 1; j <= numberOfMonths; j++) {
            int_dd = bb * ((rateOfInterest / 100) / 12);
            pre_dd = emi - int_dd.toFixed(2);
            end_dd = bb - Math.round(pre_dd);
            principalPer = (pre_dd / emi) * 100;
            interetPer = (int_dd / emi) * 100;
            var detailDescJson = {
                month: j,
                currentLoan: Math.round(bb),
                EMI: emi,
                preLoan: Math.round(pre_dd),
                intLoan: Math.round(int_dd),
                endLoan: Math.round(end_dd),
                principalPercentage: principalPer.toFixed(1),
                interestPercentage: interetPer.toFixed(1)
            }
            bb = bb - Math.round(pre_dd);
            detailDesc.push(detailDescJson)
        }
        return setrepaymentData(detailDesc);
    }
    useEffect(() => {
        calculateRepayment(localStorage.getItem('LoanAmount'), localStorage.getItem('LoanTenure'), localStorage.getItem('Interest'), localStorage.getItem('EMI'))
    }, []);
    return (
        <PageLayerSection isDisplaySearchBar={true} ActualEmiCalculate={openCalculator}>
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            <div className="EMIHeaderContainer">
                <h3>EMI Table</h3>
            </div>
            <Grid container style={{ justifyContent: "flex-start" }}>
                <Grid lg={9}>
                    <TableContainer className={classes.container}>
                        <div className={classes.table} style={{ display: 'iniline-block' }}>
                            <Button
                                className="yearTableBtnActive"
                                color="primary"
                                variant="contained"
                            >
                                Year 1
                            </Button>
                            <Button
                                className="yearTableBtn"
                                color="primary"
                                variant="contained"
                            >
                                Year 2
                            </Button>
                            <Button
                                className="yearTableBtn"
                                color="primary"
                                variant="contained"
                            >
                                Year 3
                            </Button>
                            <Button
                                className="yearTableBtn"
                                color="primary"
                                variant="contained"
                            >
                                Year 4
                            </Button>
                            <Button
                                className="yearTableBtn"
                                color="primary"
                                variant="contained"
                            >
                                Year 5
                            </Button>
                            <Button
                                className="yearTableBtn"
                                color="primary"
                                variant="contained"
                            >
                                Year 6
                            </Button>
                            <Button
                                className="yearTableBtn"
                                color="primary"
                                variant="contained"
                            >
                                Year 7
                            </Button>
                        </div>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableheading}>
                                <TableRow>
                                    <TableCell className={clsx(classes.tableheading, classes.statusHeading)}>Month</TableCell>
                                    <TableCell className={classes.tableheading}>Principal Paid</TableCell>
                                    <TableCell className={classes.tableheading}>EMI</TableCell>
                                    <TableCell className={classes.tableheading}>Principal Paid</TableCell>
                                    <TableCell className={classes.tableheading}>Interest Paid</TableCell>
                                    <TableCell className={classes.tableheading}>Principal vs Interest</TableCell>
                                    <TableCell className={classes.tableheading}>Month End Balance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* <div className="loader">
                                    <CircularProgress size={100} thickness={3} />
                                </div> */}
                                {repaymentData.length !== 0 ? repaymentData.map(item => {
                                    return <TableRow className={classes.oddEvenRow}>
                                        <TableCell className={clsx(classes.tabledata, classes.statusHeading)}>{item.month}</TableCell>
                                        <TableCell className={classes.tabledata}>₹ {price_comma(item.currentLoan)}</TableCell>
                                        <TableCell className={classes.tabledata}>₹ {price_comma(item.EMI)}</TableCell>
                                        <TableCell className={classes.tabledata}>₹ {price_comma(item.preLoan)}</TableCell>
                                        <TableCell className={classes.tabledata}>₹ {price_comma(item.intLoan)}</TableCell>
                                        <TableCell className={classes.tabledata}>
                                            <div className="progressTableContainer">
                                                <div className="progressBarLine">
                                                    <div className="leftPart" style={{ width: `${item.principalPercentage}%` }}></div>
                                                    <div className="rightPart" style={{ width: `${item.interestPercentage}%` }}></div>
                                                </div>
                                                <div className="bottomSection">
                                                    <div className="textProgress" style={{ color: '#5DC699' }}>{item.principalPercentage}%</div>
                                                    <div className="textProgress" style={{ color: '#F18A8A' }}>{item.interestPercentage}%</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className={classes.tabledata}>₹ {price_comma(item.endLoan)}</TableCell>
                                    </TableRow>
                                }) : ''}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid lg={3}>
                    <div className="summaryConatiner">
                        <div>
                            <h3 className='summaryText'>Summary</h3>
                            <div className="totalPriceContainer">
                                <div className="textPrice">₹ {emi_calculator(localStorage.getItem('LoanAmount'), localStorage.getItem('Interest'), localStorage.getItem('LoanTenure'))}</div>
                                <div className="subTextPrice">EMI Per Month x {localStorage.getItem('LoanTenure')} Months</div>
                            </div>
                            <div className="progressContainer">
                                <div className="leftBarPart">
                                    <div className="textProgress">Principal</div>
                                    <div className="textProgress">{principalPercentage(localStorage.getItem('LoanAmount'), localStorage.getItem('Interest'), localStorage.getItem('LoanTenure')) + '%'}</div>
                                </div>
                                <div className="progressBarLine">
                                    <div className="leftPart" style={{ width: `${principalPercentage(localStorage.getItem('LoanAmount'), localStorage.getItem('Interest'), localStorage.getItem('LoanTenure')) + '%'}` }}></div>
                                    <div className="rightPart" style={{ width: `${interestPercentage(localStorage.getItem('LoanAmount'), localStorage.getItem('Interest'), localStorage.getItem('LoanTenure')) + '%'}` }}></div>
                                </div>
                                <div className="rightBarPart">
                                    <div className="textProgress">Interest</div>
                                    <div className="textProgress">{interestPercentage(localStorage.getItem('LoanAmount'), localStorage.getItem('Interest'), localStorage.getItem('LoanTenure')) + '%'}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Loan Amount</div>
                                <div className="subTextPrice">₹ {price_comma(localStorage.getItem('LoanAmount'))}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Total Interest</div>
                                <div className="subTextPrice">₹ {interestCalculate(localStorage.getItem('LoanAmount'), localStorage.getItem('Interest'), localStorage.getItem('LoanTenure'))}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Total Payment</div>
                                <div className="subTextPrice">₹ {fullEMICalculate(localStorage.getItem('LoanAmount'), localStorage.getItem('Interest'), localStorage.getItem('LoanTenure'))}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">No. of EMI</div>
                                <div className="subTextPrice">{localStorage.getItem('LoanTenure')}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Rate of Interest</div>
                                <div className="subTextPrice">{localStorage.getItem('Interest')}%</div>
                            </div>
                            <Button
                                className="showEMITableBtn"
                                color="primary"
                                variant="contained"
                                onClick={() => openCalculator()}
                            >
                                RECALCULATE
                            </Button>
                        </div>
                    </div>
                    <div className="shareConatiner">
                        <div>
                            <h3 className="shareText">Share EMI Table (PDF)</h3>
                        </div>
                        <div className='socialMediaContainer'>
                            <div className={isWhatsapp ? 'socialIconActive' : 'socialIcon'} onClick={() => {
                                setisEmail(false)
                                setisWhatsapp(true)
                                setisDownload(false)
                            }}>
                                <img src={WhatsApp} alt="" />
                            </div>
                            <div className={isEmail ? 'socialIconActive' : 'socialIcon'} onClick={() => {
                                setisEmail(true)
                                setisWhatsapp(false)
                                setisDownload(false)
                            }}>
                                <img src={iconEmail} alt="" />
                            </div>
                            <div className={isDownload ? 'socialIconActive' : 'socialIcon'} onClick={() => {
                                setisEmail(false)
                                setisWhatsapp(false)
                                setisDownload(true)
                            }}>
                                <img src={iconDownload} alt="" />
                            </div>
                        </div>
                        {isWhatsapp ? <div className='whatsappFieldContainer'>
                            <TextField
                                className="calculatorTableTextField"
                                id="outlined-full-width"
                                label="WhatsApp Number"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                autoComplete='off'
                                value={whatsapp}
                                onChange={(e) => {
                                    const re = /^[0-9\b]+$/;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        setwhatsapp(e.target.value)
                                    }
                                }}
                            />
                            <Button
                                className="sendBtn"
                                color="primary"
                                variant="contained"
                            >
                                Send
                            </Button>
                        </div> : ''}
                        {isEmail ? <div className='whatsappFieldContainer'>
                            <TextField
                                className="calculatorTableTextField"
                                id="outlined-full-width"
                                label="Email ID"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                autoComplete='off'
                                value={emailSent}
                                onChange={(e) => {
                                    const re = /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i;
                                    if (e.target.value === '' || re.test(e.target.value)) {
                                        setemailSent(e.target.value)
                                    }
                                }}
                            />
                            <Button
                                className="sendBtn"
                                color="primary"
                                variant="contained"
                            >
                                Send
                            </Button>
                        </div> : ''}
                        {isDownload ? <div className='downloadContainer'>
                            <p className='downloadText'>Download a copy of EMI Table
                                to be sent after review.</p>
                            <Button
                                className="downloadBtn"
                                color="primary"
                                variant="contained"
                            >
                                Download
                            </Button>
                        </div> : ''}
                    </div>
                </Grid>
            </Grid>
        </PageLayerSection>
    )
}