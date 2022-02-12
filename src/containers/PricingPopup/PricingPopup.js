import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import './pricing.css';
const useStyles = makeStyles({
    container: {
        overflow: 'auto',
        marginBottom: '10px'
    },
    table: {
        width: '100%',
        margin: 'auto'
    },
    tableheading: {
        backgroundColor: '#535AD1',
        color: '#ffffff',
        fontSize: '13px',
        // textAlign: 'center'
    },
    tableheadingBorder: {
        backgroundColor: '#535AD1',
        padding: '0px !important'
    },
    tableInputLabel: {
        color: '#ffffff',
        fontSize: '13px',
    },
    tabledataRed: {
        color: '#656565',
        fontSize: '13px',
        overflowWrap: 'break-word',
        fontWeight: '600',
        backgroundColor: '#FFF2F2',
        borderBottom: '2px solid #fff !important'
    },
    tabledataRedBorder: {
        // borderLeft: '10px solid #EB5757',
        padding: '0 !important',
        backgroundColor: '#EB5757',
        borderBottom: '2px solid #fff !important',
        width: '10px !important'
    },
    tabledataGreen: {
        color: '#656565',
        fontSize: '13px',
        overflowWrap: 'break-word',
        fontWeight: '600',
        backgroundColor: '#EEFFF8',
        borderBottom: '2px solid #fff !important'
    },
    tabledataGreenBorder: {
        // borderLeft: '10px solid #5DC699',
        backgroundColor: '#5DC699',
        borderBottom: '2px solid #fff !important',
        padding: '0 !important',
        width: '10px !important'
    },
    tabledata: {
        fontSize: '13px',
        overflowWrap: 'break-word',
        fontWeight: '600',
        color: '#656565',
        backgroundColor: '#FFFBF2',
        borderBottom: '2px solid #fff !important',
        wordBreak: 'break-word'
    },
    tabledataBorder: {
        // borderLeft: '10px solid #FFBD14',
        backgroundColor: '#FFBD14',
        borderBottom: '2px solid #fff !important',
        padding: '0 !important',
        width: '10px !important'
    },
    banksNBFC: {
        whiteSpace: 'nowrap'
    },
    tableAge: {
        whiteSpace: 'nowrap'
    },
    salaryNot: {
        textAlign: 'center'
    }
});
export default function PricingPopup(props) {
    const classes = useStyles();
    const [pricingData] = useState([
        {
            banks_nbfc: 'IDFC Smart',
            age: '23 To 60',
            salary: '20k',
            salary_not: '-',
            roi: '10.49% To 24%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 1.5% of the loan amount include insurance ',
            part_payment: 'Part-payment allowed after 1 year up to 20% of principal outstanding nill charges. This is allowed only once in a principle year.',
            force_clousre: "Foreclosure allowed after 12 EMI's 4% charges plus GST",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill','Own Housed Proof']
        },
        {
            banks_nbfc: 'IDFC PL',
            age: '23 To 60',
            salary: '20k',
            salary_not: '-',
            roi: '11.25% To 24%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 1.5% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 12 EMI's 5% charges plus GST",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'ABFL PL',
            age: '23 To 60',
            salary: '20k',
            salary_not: '-',
            roi: '12.99%  To 28%',
            loan_tenure: '12 To 84 Months',
            max_loan_amt: '50 Lakhs',
            loan_charges: 'Up to 2.5% of the loan amount include insurance ',
            part_payment: 'Part-payment allowed after 6 EMI up to 20% of principal outstanding nill charges. This is allowed only once in a principle year.',
            force_clousre: "Foreclosure allowed after 12 EMI's 4% charges plus GST",
            firms_not_allowed: 'PROP / Partnership / NGO / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'Incred PL',
            age: '22 To 58',
            salary: '15k',
            salary_not: '-',
            roi: '16 % To 28%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '7.5 Lakhs',
            loan_charges: 'Up to 2.5% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 6 EMI's 4% charges plus GST",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP / PROP / Partnership / NGO',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'Fullerton PL',
            age: '22 To 58',
            salary: '25k',
            salary_not: '-',
            roi: '12.50% To 28%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 3% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "6 EMI 7% 18 EMI 5% 24 EMI 3% 36 EMI NILL",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP / PROP / Partnership / NGO',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'Axis PL',
            age: '23 To 60',
            salary: '15k',
            salary_not: '30k',
            roi: '10.40% To 28%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 EMI 5% 0-12 months 4% 13 to 24 months 3% 25 to 36 months',
            force_clousre: 'Foreclosure allowed after 1 EMI 5% 0-12 months 4% 13 to 24 months 3% 25 to 36 months',
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'TATA PL',
            age: '22 To 58',
            salary: '15k',
            salary_not: '35k',
            roi: '10.75% TO 28%',
            loan_tenure: '12 To 84 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 6 EMI up to 25% of principal outstanding nill charges above 25% partpayment 2.5% charges applicable. A maximum of 50% of the principle outstanding is allowed during a single year',
            force_clousre: "Foreclosure allowed after 6 EMI's 4.5% charges plus GST",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof','2 years Job Stability Proof']
        },
        {
            banks_nbfc: 'YES BANK PL',
            age: '23 To 60',
            salary: '20k',
            salary_not: '-',
            roi: '10.75% TO 20%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 12 EMI up to 20% of principal outstanding nill charges. This is allowed only once in a principle year.',
            force_clousre: 'Foreclosure allowed after 12 EMI. 4% 13-24 months. 3% 25 to 36 months. 2% 37 to 48 months. nill above 48 months',
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'HDFC BANK PL',
            age: '23 To 60',
            salary: '25k To 35k',
            salary_not: '-',
            roi: '10.25% To 18%',
            loan_tenure: '12 To 72 Months',
            max_loan_amt: '95 Lakhs',
            loan_charges: 'Up to 1.50% of the loan amount subject to a minimum of Rs. 2,999 & maximum of Rs. 25,000 for salaried customers',
            part_payment: 'Part-payment allowed after 12 EMI up to 25% of principal outstanding. This is allowed only once in a financial year and twice during the entire loan tenure.',
            force_clousre: "Nill for Customer Salary >75k Loan Amount 10L & Above or (4% After 13-24 months – of loan principal outstanding) (3% After 25-36 months – of loan principal outstanding) (2% Above >36 months – of loan principal outstanding)",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Current Address Original Verified Document Required','Company ID Card']
        },
        {
            banks_nbfc: 'KOTAK Bank PL',
            age: '23 To 60',
            salary: '35k',
            salary_not: '-',
            roi: '10.25% To 18%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 12 EMI up to 20% of principal outstanding nill charges. This is allowed only once in a principle year.',
            force_clousre: 'Foreclosure allowed after 12 EMI. 1 to 3 years – 4% of loan principal outstanding after 3 years – 2% of loan principal outstanding >10 lakh 999/- after completion of locking period (Only if closing through own funds)',
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'ICICI Bank PL',
            age: '23 TO 58',
            salary: '30k',
            salary_not: '-',
            roi: '10.50% To 20%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 1.5% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 12 EMI's 5% charges plus GST",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'BAJAJ PL',
            age: '23 TO 58',
            salary: '35k',
            salary_not: '40k',
            roi: '13.5%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 EMI upto 75% with 2% charges',
            force_clousre: "Foreclosure allowed after 1 EMI's 4% charges plus GST",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'BAJAJ OD',
            age: '23 TO 58',
            salary: '35k',
            salary_not: '50k',
            roi: '14% To 15.25%',
            loan_tenure: '12 To 84 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 day with nill charges',
            force_clousre: "Foreclosure allowed after 6 EMI's 4.72% charges plus GST",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'TATA OD',
            age: '23 TO 58',
            salary: '35k',
            salary_not: '40k',
            roi: '13.75% TO 18%',
            loan_tenure: '12 To 84 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 day with nill charges',
            force_clousre: "Foreclosure allowed after 6 EMI's 4.5% charges plus GST",
            firms_not_allowed: 'PROP / Partnership / NGO / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof','2 years Job Stability Proof']
        },
        {
            banks_nbfc: 'INDUSIND Bank PL',
            age: '21 TO 60',
            salary: '25k',
            salary_not: '35k',
            roi: '11% TO 18%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 1.25% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 12 EMI's 4% charges",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '4 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'STANCY Bank PL',
            age: '23 TO 60',
            salary: '25k',
            salary_not: '50k',
            roi: '11% To 18%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '50 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 6 EMI upto 25% with 2% charges',
            force_clousre: "Foreclosure allowed after 1 EMI's 4% charges",
            firms_not_allowed: 'Pvt Ltd / Ltd / Goverment / LLP Only if Listed',
            doc_req: ['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement', 'Rent Agreement if Rented and Electricity Bill', 'Own Housed Proof']
        },
        {
            banks_nbfc: 'FINNABLE',
            age: '21 To 56',
            salary: '20k',
            salary_not: '-',
            roi: '19% To 27%',
            loan_tenure: '1 To 48 Months',
            max_loan_amt: '10 Lakhs',
            loan_charges: 'Up to 4% of the loan amount include insurance',
            part_payment: 'Not Allowed',
            force_clousre: "Foreclosure allowed after 6 EMI's 6% charges",
            firms_not_allowed: 'Pvt ltd / Ltd / Goverment / LLP',
            doc_req:['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement']
        },
        {
            banks_nbfc: 'BANDHAN BANK',
            age: '21',
            salary: '20k',
            salary_not: '25K',
            roi: '10.59% TO 16%',
            loan_tenure: '12 TO 60',
            max_loan_amt: '15 Lakhs',
            loan_charges: 'Up to 1.5% of the loan amount include insurance',
            part_payment: 'Not Allowed',
            force_clousre: "Foreclosure allowed after 6 EMI's 4% charges After 12 Months 2% Charges",
            firms_not_allowed: 'Pvt ltd / Ltd / Goverment / LLP if Listed',
            doc_req:['Photo', 'KYC', '3 Month Salary Slip', '6 Month Bank Statement','Current Address Original Verified Document Required']
        }
    ]);
    const [age, setAge] = useState('');
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <div className="guideContainer">
            <div className="textGreen"><span></span>Allow Part-payment from 2nd day with nil charges</div>
            <div className="textBlack"><span></span>Allow Part-payment after the lock-in period &amp; limitation</div>
            <div className="textRed"><span></span>Part-Payment Not Allowed</div>
        </div>
        <TableContainer className={classes.container}>
            <Table className={classes.table} aria-label="simple table" stickyHeader>
                <TableHead className={classes.tableheading}>
                    <TableRow>
                        <TableCell className={classes.tableheadingBorder}></TableCell>
                        <TableCell className={classes.tableheading}>BANKS / NBFC</TableCell>
                        <TableCell className={classes.tableheading}>AGE</TableCell>
                        <TableCell className={classes.tableheading}>
                            <InputLabel id="demo-simple-select-label" className={classes.tableInputLabel}>SAL IF LISTED CAT A OR SA</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={(event) => setAge(event.target.value)}
                                className="menuItem"
                            >
                                <MenuItem value="15k">15k</MenuItem>
                                <MenuItem value="20k">20k</MenuItem>
                                <MenuItem value="25k">25k</MenuItem>
                                <MenuItem value="30k">30k</MenuItem>
                                <MenuItem value="35k">35k</MenuItem>
                                <MenuItem value="40k">40k</MenuItem>
                                <MenuItem value="50k">50k</MenuItem>
                            </Select>
                        </TableCell>
                        <TableCell className={classes.tableheading}>SAL REQ IF NOT LISTED</TableCell>
                        <TableCell className={classes.tableheading}>ROI %</TableCell>
                        <TableCell className={classes.tableheading}>LAON TENURE</TableCell>
                        <TableCell className={classes.tableheading}>MAX LOAN AMT</TableCell>
                        <TableCell className={classes.tableheading}>LOAN CHARGES</TableCell>
                        <TableCell className={classes.tableheading}>PARTPAYMENT</TableCell>
                        <TableCell className={classes.tableheading}>FORECLOSURE</TableCell>
                        <TableCell className={classes.tableheading}>FIRMS ALLOWED</TableCell>
                        <TableCell className={classes.tableheading}>DOCUMENTS REQUIRED</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pricingData.map((item, index) => {
                        if (age === '') {
                            if (index === 1 || index === 3 || index === 4 || index === 10 || index === 14 || index === 16 || index === 17) {
                                return <TableRow className={classes.oddEvenRow}>
                                    <TableCell className={classes.tabledataRedBorder}></TableCell>
                                    <TableCell className={clsx(classes.tabledataRed, classes.banksNBFC)}>{item.banks_nbfc}</TableCell>
                                    <TableCell className={clsx(classes.tabledataRed, classes.tableAge)}>{item.age}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.salary}</TableCell>
                                    <TableCell className={clsx(classes.tabledataRed, classes.salaryNot)}>{item.salary_not}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.roi}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.loan_tenure}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.max_loan_amt}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.loan_charges}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.part_payment}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.force_clousre}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.firms_not_allowed}</TableCell>
                                    <TableCell className={classes.tabledataRed}><ul>
                                            {item.doc_req.map(item => {
                                                return <li style={{ whiteSpace: 'nowrap' }}>{item}</li>
                                            })}
                                        </ul></TableCell>
                                </TableRow>
                            } else if (index === 12 || index === 13) {
                                return <TableRow className={classes.oddEvenRow}>
                                    <TableCell className={classes.tabledataGreenBorder}></TableCell>
                                    <TableCell className={clsx(classes.tabledataGreen, classes.banksNBFC)}>{item.banks_nbfc}</TableCell>
                                    <TableCell className={clsx(classes.tabledataGreen, classes.tableAge)}>{item.age}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.salary}</TableCell>
                                    <TableCell className={clsx(classes.tabledataGreen, classes.salaryNot)}>{item.salary_not}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.roi}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.loan_tenure}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.max_loan_amt}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.loan_charges}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.part_payment}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.force_clousre}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.firms_not_allowed}</TableCell>
                                    <TableCell className={classes.tabledataGreen}><ul>
                                            {item.doc_req.map(item => {
                                                return <li style={{ whiteSpace: 'nowrap' }}>{item}</li>
                                            })}
                                        </ul></TableCell>
                                </TableRow>
                            } else {
                                return <TableRow className={classes.oddEvenRow}>
                                    <TableCell className={classes.tabledataBorder}></TableCell>
                                    <TableCell className={clsx(classes.tabledata, classes.banksNBFC)}>{item.banks_nbfc}</TableCell>
                                    <TableCell className={clsx(classes.tabledata, classes.tableAge)}>{item.age}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.salary}</TableCell>
                                    <TableCell className={clsx(classes.tabledata, classes.salaryNot)}>{item.salary_not}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.roi}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.loan_tenure}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.max_loan_amt}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.loan_charges}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.part_payment}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.force_clousre}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.firms_not_allowed}</TableCell>
                                    <TableCell className={classes.tabledata}>
                                        <ul>
                                            {item.doc_req.map(item => {
                                                return <li style={{ whiteSpace: 'nowrap' }}>{item}</li>
                                            })}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            }
                        } else if (age === item.salary) {
                            if (index === 1 || index === 3 || index === 4 || index === 10 || index === 14) {
                                return <TableRow className={classes.oddEvenRow}>
                                    <TableCell className={classes.tabledataRedBorder}></TableCell>
                                    <TableCell className={clsx(classes.tabledataRed, classes.banksNBFC)}>{item.banks_nbfc}</TableCell>
                                    <TableCell className={clsx(classes.tabledataRed, classes.tableAge)}>{item.age}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.salary}</TableCell>
                                    <TableCell className={clsx(classes.tabledataRed, classes.salaryNot)}>{item.salary_not}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.roi}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.loan_tenure}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.max_loan_amt}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.loan_charges}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.part_payment}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.force_clousre}</TableCell>
                                    <TableCell className={classes.tabledataRed}>{item.firms_not_allowed}</TableCell>
                                    <TableCell className={classes.tabledata}><ul>
                                            {item.doc_req.map(item => {
                                                return <li style={{ whiteSpace: 'nowrap' }}>{item}</li>
                                            })}
                                        </ul></TableCell>
                                </TableRow>
                            } else if (index === 12 || index === 13) {
                                return <TableRow className={classes.oddEvenRow}>
                                    <TableCell className={classes.tabledataGreenBorder}></TableCell>
                                    <TableCell className={clsx(classes.tabledataGreen, classes.banksNBFC)}>{item.banks_nbfc}</TableCell>
                                    <TableCell className={clsx(classes.tabledataGreen, classes.tableAge)}>{item.age}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.salary}</TableCell>
                                    <TableCell className={clsx(classes.tabledataGreen, classes.salaryNot)}>{item.salary_not}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.roi}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.loan_tenure}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.max_loan_amt}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.loan_charges}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.part_payment}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.force_clousre}</TableCell>
                                    <TableCell className={classes.tabledataGreen}>{item.firms_not_allowed}</TableCell>
                                    <TableCell className={classes.tabledataGreen}><ul>
                                            {item.doc_req.map(item => {
                                                return <li style={{ whiteSpace: 'nowrap' }}>{item}</li>
                                            })}
                                        </ul></TableCell>
                                </TableRow>
                            } else {
                                return <TableRow className={classes.oddEvenRow}>
                                    <TableCell className={classes.tabledataBorder}></TableCell>
                                    <TableCell className={clsx(classes.tabledata, classes.banksNBFC)}>{item.banks_nbfc}</TableCell>
                                    <TableCell className={clsx(classes.tabledata, classes.tableAge)}>{item.age}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.salary}</TableCell>
                                    <TableCell className={clsx(classes.tabledata, classes.salaryNot)}>{item.salary_not}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.roi}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.loan_tenure}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.max_loan_amt}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.loan_charges}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.part_payment}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.force_clousre}</TableCell>
                                    <TableCell className={classes.tabledata}>{item.firms_not_allowed}</TableCell>
                                    <TableCell className={classes.tabledata}><ul>
                                            {item.doc_req.map(item => {
                                                return <li style={{ whiteSpace: 'nowrap' }}>{item}</li>
                                            })}
                                        </ul></TableCell>
                                </TableRow>
                            }
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Dialog>
}