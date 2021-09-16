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
        width: '98%',
        margin: 'auto',
        border: '1px solid #ededed'
    },
    tableheading: {
        backgroundColor: '#8f9bb3',
        color: '#ffffff',
        fontSize: '13px',
        border: '1px solid #ededed',
        textAlign: 'center'
    },
    tableInputLabel: {
        color: '#ffffff',
        fontSize: '13px',
    },
    tabledataRed: {
        color: '#eb5757',
        fontSize: '12px',
        overflowWrap: 'break-word',
        border: '1px solid #ededed',
        fontWeight: '600'
    },
    tabledataGreen: {
        color: '#14cc9e',
        fontSize: '12px',
        overflowWrap: 'break-word',
        border: '1px solid #ededed',
        fontWeight: '600'
    },
    tabledata: {
        fontSize: '12px',
        overflowWrap: 'break-word',
        border: '1px solid #ededed',
        fontWeight: '600',
        color: '#424242'
    },
    banksNBFC: {
        whiteSpace: 'nowrap'
    },
    tableAge: {
        whiteSpace: 'nowrap'
    },
    salaryNot: {
        textAlign: 'center'
    },
    textGreen: {
        marginLeft: '15px',
        fontSize: '16px',
        marginBottom: '2px',
        color: '#14cc9e'
    },
    textBlack: {
        marginLeft: '15px',
        fontSize: '16px',
        marginBottom: '2px',
        color: '#424242'
    },
    textRed: {
        marginLeft: '15px',
        fontSize: '16px',
        marginBottom: '2px',
        color: '#eb5757'
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
            loan_charges: 'Up to 2.5% of the loan amount include insurance ',
            part_payment: 'Part-payment allowed after 3 EMI up to 40% of principal outstanding nill charges. This is allowed only once in a principle year.',
            force_clousre: "Foreclosure allowed after 3 EMI's 4% charges plus GST",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
        },
        {
            banks_nbfc: 'IDFC PL',
            age: '23 To 60',
            salary: '20k',
            salary_not: '-',
            roi: '11.25% To 24%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 2.5% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 12 EMI's 5% charges plus GST",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
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
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
        },
        {
            banks_nbfc: 'Incred PL',
            age: '23 To 60',
            salary: '20k',
            salary_not: '-',
            roi: '16 % To 28%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '7.5 Lakhs',
            loan_charges: 'Up to 2.5% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 6 EMI's 4% charges plus GST",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
        },
        {
            banks_nbfc: 'Fullerton PL',
            age: '21 To 58',
            salary: '25k',
            salary_not: '-',
            roi: '13.99% To 28%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 3% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "6 EMI 7% 18 EMI 5% 24 EMI 3% 36 EMI NILL",
            firms_not_allowed: 'All Firm Allowed'
        },
        {
            banks_nbfc: 'Axis PL',
            age: '21 To 60',
            salary: '15k',
            salary_not: '30k',
            roi: '10.40% To 28%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 EMI 5% 0-12 months 4% 13 to 24 months 3% 25 to 36 months',
            force_clousre: 'Foreclosure allowed after 1 EMI 5% 0-12 months 4% 13 to 24 months 3% 25 to 36 months',
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
        },
        {
            banks_nbfc: 'TATA PL',
            age: '22 To 58',
            salary: '15k',
            salary_not: '35k',
            roi: '10.99% TO 28%',
            loan_tenure: '12 To 84 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 6 EMI up to 25% of principal outstanding nill charges above 25% partpayment 2.5% charges applicable. A maximum of 50% of the principle outstanding is allowed during a single year',
            force_clousre: "Foreclosure allowed after 6 EMI's 4.5% charges plus GST",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
        },
        {
            banks_nbfc: 'YES BANK PL',
            age: '22 To 60',
            salary: '25k',
            salary_not: '-',
            roi: '10.99 % TO 20%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '40 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 12 EMI up to 20% of principal outstanding nill charges. This is allowed only once in a principle year.',
            force_clousre: 'Foreclosure allowed after 12 EMI. 4% 13-24 months. 3% 25 to 36 months. 2% 37 to 48 months. nill above 48 months',
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
        },
        {
            banks_nbfc: 'HDFC BANK PL',
            age: '21 To 60',
            salary: '25k',
            salary_not: '-',
            roi: '10.50% To 20%',
            loan_tenure: '12 To 72 Months',
            max_loan_amt: '50 Lakhs',
            loan_charges: 'Up to 2.50% of the loan amount subject to a minimum of Rs. 2,999 & maximum of Rs. 25,000 for salaried customers',
            part_payment: 'Part-payment allowed after 12 EMI up to 25% of principal outstanding. This is allowed only once in a financial year and twice during the entire loan tenure.',
            force_clousre: "13-24 months – 4% of loan principal outstanding 25-36 months – 3% of loan principal outstanding >36 months – 2% of loan principal outstanding",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed'
        },
        {
            banks_nbfc: 'KOTAK Bank PL',
            age: '21 To 60',
            salary: '30k',
            salary_not: '-',
            roi: '10.5% To 20%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '30 Lakhs',
            loan_charges: 'Up to 2.5% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 12 EMI up to 20% of principal outstanding nill charges. This is allowed only once in a principle year.',
            force_clousre: 'Foreclosure allowed after 12 EMI. 1 to 3 years – 4% of loan principal outstanding after 3 years – 2% of loan principal outstanding >10 lakh 999/- after completion of locking period (Only if closing through own funds)',
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed',
        },
        {
            banks_nbfc: 'ICICI Bank PL',
            age: '23 TO 58',
            salary: '30k',
            salary_not: '-',
            roi: '10.50% To 20%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 2.5% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 12 EMI's 5% charges plus GST",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed',
        },
        {
            banks_nbfc: 'BAJAJ PL',
            age: '21 TO 58',
            salary: '40k',
            salary_not: '-',
            roi: '12.5% TO 18%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 2.5% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 EMI upto 75% with 2% charges',
            force_clousre: "Foreclosure allowed after 1 EMI's 4% charges plus GST",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed',
        },
        {
            banks_nbfc: 'BAJAJ OD',
            age: '21 TO 58',
            salary: '40k',
            salary_not: '-',
            roi: '14.75%',
            loan_tenure: '12 To 84 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 day with nill charges',
            force_clousre: "Foreclosure allowed after 6 EMI's 4% charges plus GST",
            firms_not_allowed: 'PROP/Partnership/NGO/LLP Only if Listed',
        },
        {
            banks_nbfc: 'TATA OD',
            age: '22 TO 58',
            salary: '30k',
            salary_not: '40k',
            roi: '13.75% TO 28%',
            loan_tenure: '12 To 84 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 1 day with nill charges',
            force_clousre: "Foreclosure allowed after 6 EMI's 4.5% charges plus GST",
            firms_not_allowed: 'PROP/PARTNERSHIP/NGO/LLP ONLY IF LISTED',
        },
        {
            banks_nbfc: 'INDUSIND Bank PL',
            age: '21 TO 60',
            salary: '25k',
            salary_not: '35k',
            roi: '11% TO 18%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '25 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment not allowed',
            force_clousre: "Foreclosure allowed after 12 EMI's 4% charges",
            firms_not_allowed: 'PROP/PARTNERSHIP/NGO/LLP ONLY IF LISTED',
        },
        {
            banks_nbfc: 'STANCY Bank PL',
            age: '21 TO 60',
            salary: '25k',
            salary_not: '50k',
            roi: '11% 18%',
            loan_tenure: '12 To 60 Months',
            max_loan_amt: '50 Lakhs',
            loan_charges: 'Up to 2% of the loan amount include insurance',
            part_payment: 'Part-payment allowed after 6 EMI upto 25% with 2% charges',
            force_clousre: "Foreclosure allowed after 1 EMI's 4% charges",
            firms_not_allowed: 'PROP/PARTNERSHIP/NGO/LLP ONLY IF LISTED',
        }
    ]);
    const [age, setAge] = useState('');
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <div className={classes.textGreen}>Data marked in green allowed part-payment from 2nd day with nill charges</div>
        <div className={classes.textBlack}>Data marked in black allow part-payment but after the locking period and with limitation</div>
        <div className={classes.textRed}>Data marked in red don’t  allow part-payment</div>
        <TableContainer className={classes.container}>
            <Table className={classes.table} aria-label="simple table" stickyHeader>
                <TableHead className={classes.tableheading}>
                    <TableRow>
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
                        <TableCell className={classes.tableheading}>FIRMS NOT ALLOWED</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pricingData.map((item, index) => {
                        if (age === '') {
                            if (index === 1 || index === 3 || index === 4 || index === 10 || index === 14) {
                                return <TableRow className={classes.oddEvenRow}>
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
                                </TableRow>
                            } else if (index === 12 || index === 13) {
                                return <TableRow className={classes.oddEvenRow}>
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
                                </TableRow>
                            } else {
                                return <TableRow className={classes.oddEvenRow}>
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
                                </TableRow>
                            }
                        } else if (age === item.salary) {
                            if (index === 1 || index === 3 || index === 4 || index === 10 || index === 14) {
                                return <TableRow className={classes.oddEvenRow}>
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
                                </TableRow>
                            } else if (index === 12 || index === 13) {
                                return <TableRow className={classes.oddEvenRow}>
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
                                </TableRow>
                            } else {
                                return <TableRow className={classes.oddEvenRow}>
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
                                </TableRow>
                            }
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Dialog>
}