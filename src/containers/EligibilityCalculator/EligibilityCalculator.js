import React,{useState,useEffect} from 'react';
import './eligibilitycalculator.css';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
const EligibilityCalculator = (props) => {
    const [customerSalary,setCustomerSalary] = useState(100000);
    const [tenure,setTenure] =useState(5);
    const [foir,setFoir] = useState(70);
    const [multiplier,setMultiplier] = useState(10);
    const [allEmi,setAllEmi] = useState(20000);
    const [creditcardOutstanding,setCreditcardOutstanding] = useState(100000)
    const [creditCardMinDue,setCreditCardMinDue] = useState(0);
    const [totalEmi,setTotalEmi] = useState(0);
    const [eligibleEmiForFoir,setEligibleEmiForFoir] = useState(0);
    const [eligibleEmiForMultiplier,setEligibleEmiForMultiplier] = useState(0)
    const [eligibleAsPerFoir,setEligibleAsPerFoir] = useState(0)
    const [eligibleAsPerMultiplier,setEligibleAsPerMultiplier] = useState(0)

    useEffect(() =>{
        if(creditcardOutstanding !== ''){
            claculateMinDue(creditcardOutstanding);
            getTotalEmi();
            getEligibleEmiForFoir();
            getEligibleEmiForMultiplier();
            getEligibleEmiAsPerFoir();
            getEligibleEmiAsPerMultiplier();
        }
    },[customerSalary,tenure,foir,multiplier,allEmi,creditcardOutstanding,creditCardMinDue,totalEmi,eligibleEmiForFoir])
    const claculateMinDue = (data) =>{
        const  minimumDue = (data * 5)/100;
        setCreditCardMinDue(minimumDue);
     }
    const getTotalEmi = () => {
        const emi = allEmi + creditCardMinDue;
        setTotalEmi(emi)
    }
    const getEligibleEmiForFoir = () => {
        const eligible_emi_foir = (70 /100 * creditcardOutstanding) - totalEmi;
        setEligibleEmiForFoir(eligible_emi_foir)
    }
    const getEligibleEmiForMultiplier = () => {
        const eligible_emi_multiplier = (customerSalary - totalEmi);
        setEligibleEmiForMultiplier(eligible_emi_multiplier)
    }
    const getEligibleEmiAsPerFoir = () =>{
        const eligible_As_per_foir = (eligibleEmiForFoir/2400);
        setEligibleAsPerFoir(eligible_As_per_foir);
    }
    const getEligibleEmiAsPerMultiplier = (data) => {
        const eligible_As_per_multiplier = eligibleEmiForMultiplier * multiplier;
        setEligibleAsPerMultiplier(eligible_As_per_multiplier);
    }
    
    return (
        <Drawer anchor='right' open={props.isOpenEligibilityCalculator} onClose={props.isCloseEligibilityCalculator}>
            <div className='eligibilityContainer'>
                <Grid container >
                    <Grid><h4>Eligibility Calculator</h4></Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Customer Salary"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={customerSalary}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setCustomerSalary(e.target.value)
                            }
                        }}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        select
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Tenure"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={tenure}
                        onChange={(e)=>setTenure(e.target.value)}
                        >
                        <option value="1">1 year</option>
                        <option value="2">2 year</option>
                        <option value="3">3 year</option>
                        <option value="4">4 year</option>
                        <option value="5">5 year</option>
                        <option value="6">6 year</option>
                        <option value="7">7 year</option>
                        </TextField>
                    </Grid>
                    <Grid container>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Foir"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={foir}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setFoir(e.target.value)
                            }
                        }}
                         />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Multiplier"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={multiplier}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setMultiplier(e.target.value)
                            }
                        }}
                        />
                    </Grid>
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="All Emi Exclude Credit Card"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={allEmi}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setAllEmi(e.target.value)
                            }
                        }}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Credit Card Outstanding"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={creditcardOutstanding}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (e.target.value === '' || re.test(e.target.value)) {
                                setCreditcardOutstanding(e.target.value)
                            }
                        }}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Credit card min due"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={creditCardMinDue}
                        onChange={(e)=>setCreditCardMinDue(e.target.value)}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Total Emi"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={totalEmi}
                        onChange={(e)=>setTotalEmi(e.target.value)}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Eligible Emi for Foir"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={eligibleEmiForFoir}
                        onChange={(e)=>setEligibleEmiForFoir(e.target.value)}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Eligible Emi for Multiplier"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={eligibleEmiForMultiplier}
                        onChange={(e)=>setEligibleEmiForMultiplier(e.target.value)}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Eligible As Per Foir"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={eligibleAsPerFoir}
                        onChange={(e)=>setEligibleAsPerFoir(e.target.value)}
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Eligible As Per Multiplier"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={eligibleAsPerMultiplier}
                        onChange={(e)=>setEligibleAsPerMultiplier(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </div>
        </Drawer>
    );
};


export default EligibilityCalculator;