import React, { useState, useEffect } from "react";
import './emicalculator.css';
import { Drawer } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
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
export default function EmiCalculator(props) {
    const [loanAmount, setLoanAmount] = useState('');
    const [Roi, setRoi] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [isCalculate, setisCalculate] = useState(false);
    const [yearly, setyearly] = useState(true);
    const [monthly, setmonthly] = useState(false);
    const filterSubmit = () => {
        setisCalculate(true);
    };
    const yearlyButton = () => {
        setyearly(true);
        setmonthly(false);
        if (monthly === true) {
            var Yearly = loanTerm / 12;
            setLoanTerm(Yearly)
        }
    }
    const monthlyButton = () => {
        setyearly(false);
        setmonthly(true);
        if (yearly === true) {
            var Monthly = loanTerm * 12;
            setLoanTerm(Monthly)
        }
    }
    return (
        <Drawer anchor="right" open={props.isOpenCalculator} onClose={props.isCloseCalculator} className="calculateContainer">
            <div className="rightContainerForm">
                <form>
                    <Grid container justifyContent="flex-start">
                        <h4>EMI Calculator</h4>
                    </Grid>
                    <Grid>
                        <TextField
                            className="calculateTextField"
                            id="outlined-full-width"
                            label="Loan Amount"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            autoComplete='off'
                            value={loanAmount}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setLoanAmount(e.target.value)
                                }
                            }}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            className="calculateTextField"
                            id="outlined-full-width"
                            label="Rate of Interest (%)"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 5
                            }}
                            variant="outlined"
                            size="small"
                            autoComplete='off'
                            value={Roi}
                            onChange={(e) => {
                                const re = /^[0-9\b.]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setRoi(e.target.value)
                                }
                            }}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            className="calculateTextField"
                            id="outlined-full-width"
                            label="Loan Term"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 2
                            }}
                            variant="outlined"
                            size="small"
                            autoComplete='off'
                            value={loanTerm}
                            onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                    setLoanTerm(e.target.value)
                                }
                            }}
                        />
                    </Grid>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Button
                            className={yearly ? "calculateCommonBtn calculateActive" : "calculateCommonBtn"}
                            color="primary"
                            variant="contained"
                            onClick={() => yearlyButton()}
                        >
                            Yearly
                        </Button>
                        <Button
                            className={monthly ? "calculateCommonBtn calculateActive" : "calculateCommonBtn"}
                            color="primary"
                            variant="contained"
                            onClick={() => monthlyButton()}
                        >
                            Monthly
                        </Button>
                    </Grid>
                    <Button
                        onClick={() => filterSubmit()}
                        className="calculateBtn"
                        color="primary"
                        variant="contained"
                    >
                        CALCULATE EMI
                    </Button>
                    {isCalculate ? <React.Fragment>
                        <Grid>
                            <div className="totalPriceContainer">
                                <div className="textPrice">₹ {yearly ? emi_calculator(loanAmount, Roi, loanTerm * 12) : emi_calculator(loanAmount, Roi, loanTerm)}</div>
                                <div className="subTextPrice">EMI Per Month x {yearly ? loanTerm * 12 : loanTerm} Months</div>
                            </div>
                            <div className="progressContainer">
                                <div className="leftSection">
                                    <div className="textProgress">Principal</div>
                                    <div className="textProgress">74.9%</div>
                                </div>
                                <div className="progressBarLine">
                                    <div className="leftPart" style={{ width: `74.9%` }}></div>
                                    <div className="rightPart" style={{ width: `25.1%` }}></div>
                                </div>
                                <div className="rightSection">
                                    <div className="textProgress">Interest</div>
                                    <div className="textProgress">25.1%</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Loan Amount</div>
                                <div className="subTextPrice">₹ {price_comma(loanAmount)}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Total Interest</div>
                                <div className="subTextPrice">₹ {yearly ? interestCalculate(loanAmount, Roi, loanTerm * 12) : interestCalculate(loanAmount, Roi, loanTerm)}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Total Payment</div>
                                <div className="subTextPrice">₹ {yearly ? fullEMICalculate(loanAmount, Roi, loanTerm * 12) : fullEMICalculate(loanAmount, Roi, loanTerm)}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">No. of EMI</div>
                                <div className="subTextPrice">{yearly ? loanTerm * 12 : loanTerm}</div>
                            </div>
                            <div className="listOfTextAmountContainer">
                                <div className="textPrice">Rate of Interest</div>
                                <div className="subTextPrice">{Roi}%</div>
                            </div>
                            <NavLink to="/dashboards/EMIcalculator">
                                <Button
                                    className="showEMITableBtn"
                                    color="primary"
                                    variant="contained"
                                >
                                    SHOW EMI TABLE
                                </Button>
                            </NavLink>
                        </Grid>
                    </React.Fragment> : ''}
                </form>
            </div>
        </Drawer >
    )
}