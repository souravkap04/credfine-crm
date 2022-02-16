import React,{useState,useEffect} from 'react';
import './eligibilitycalculator.css';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
const EligibilityCalculator = (props) => {
    const [customerSalary,setCustomerSalary] = useState('');
    const [tenure,setTenure] =useState(5);
    const [foir,setFoir] = useState(70);
    const [multiplier,setMultiplier] = useState(10);
    const [allEmi,setAllEmi] = useState('');
    const [creditcardOutstanding,setCreditcardOutstanding] = useState('')
    const [creditCardMinDue,setCreditCardMinDue] = useState();
    const [totalEmi,setTotalEmi] = useState();
    const [eligibleEmiForFoir,setEligibleEmiForFoir] = useState();
    const [eligibleEmiForMultiplier,setEligibleEmiForMultiplier] = useState()
    const [eligibleAsPerFoir,setEligibleAsPerFoir] = useState()
    const [eligibleAsPerMultiplier,setEligibleAsPerMultiplier] = useState()

    useEffect(() =>{
        if(customerSalary !== '' && allEmi !== '' && creditcardOutstanding !== ''){
            claculateMinDue(creditcardOutstanding);
            getTotalEmi();
            getEligibleEmiForFoir();
            getEligibleEmiForMultiplier();
            getEligibleEmiAsPerFoir();
            getEligibleEmiAsPerMultiplier();
        }
    },[customerSalary,tenure,foir,multiplier,allEmi,creditcardOutstanding,creditCardMinDue,totalEmi,eligibleEmiForFoir,eligibleEmiForMultiplier])
   
    const claculateMinDue = (data) =>{
        const  minimumDue = (data * 5)/100;
        setCreditCardMinDue(minimumDue);
     }
    const getTotalEmi = () => {
        const emi = parseInt(allEmi,10) + parseInt(creditCardMinDue,10);
        setTotalEmi(emi)
    }
    const getEligibleEmiForFoir = () => {
        const eligible_emi_foir = (foir /100 * customerSalary) - totalEmi;
        setEligibleEmiForFoir(eligible_emi_foir)
    }
    const getEligibleEmiForMultiplier = () => {
        const eligible_emi_multiplier = (customerSalary - totalEmi);
        setEligibleEmiForMultiplier(eligible_emi_multiplier)
    }
    const getEligibleEmiAsPerFoir = () =>{
        if(tenure === 1){
            const eligible_As_per_foir = (eligibleEmiForFoir/9073).toFixed(2);
        setEligibleAsPerFoir(eligible_As_per_foir);
        }else if(tenure === 2){
            const eligible_As_per_foir = (eligibleEmiForFoir/4896).toFixed(2);
        setEligibleAsPerFoir(eligible_As_per_foir);
        }else if(tenure === 3){
            const eligible_As_per_foir = (eligibleEmiForFoir/3516).toFixed(2);
        setEligibleAsPerFoir(eligible_As_per_foir);
        }else if(tenure === 4){
            const eligible_As_per_foir = (eligibleEmiForFoir/2834).toFixed(2);
        setEligibleAsPerFoir(eligible_As_per_foir);
        }else if(tenure === 5){
            const eligible_As_per_foir = (eligibleEmiForFoir/2400).toFixed(2);
        setEligibleAsPerFoir(eligible_As_per_foir);
        }else if(tenure === 6){
            const eligible_As_per_foir = (eligibleEmiForFoir/2169).toFixed(2);
        setEligibleAsPerFoir(eligible_As_per_foir);
        }else if(tenure === 7){
            const eligible_As_per_foir = (eligibleEmiForFoir/1986).toFixed(2);
        setEligibleAsPerFoir(eligible_As_per_foir);
        }
    }
    const getEligibleEmiAsPerMultiplier = () => {
        const eligible_As_per_multiplier = eligibleEmiForMultiplier * multiplier;
        setEligibleAsPerMultiplier(eligible_As_per_multiplier);
    }
    
    return (
        <Drawer anchor='right' open={props.isOpenEligibilityCalculator} onClose={props.isCloseEligibilityCalculator}>
            <div className='eligibilityContainer'>
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <h4>Eligibility Calculator</h4>
                    </Grid>
                    <Grid item lg={6}>
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Customer Salary"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required: true
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
                    <Grid item lg={6}>
                        <TextField
                        select
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Tenure"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required: true
                        }}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={tenure}
                        onChange={(e)=>setTenure(parseInt(e.target.value,10))}
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
                    <Grid item lg={6}>
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Foir"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required: true
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
                    <Grid item lg={6}>
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Multiplier"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required: true
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
                    <Grid item lg={12}>
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Total Monthly Emi Exclude Credit Card"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required: true
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
                    <Grid item lg={6}>
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Credit Card Outstanding"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            required: true
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
                    <Grid item lg={6}>
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
                    <Grid item lg={12}>
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Total Monthly Emi"
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
                    <Grid item lg={6}>
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
                    <Grid item lg={6}>
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
                    <Grid item lg={12}>
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
                    <Grid item lg={12}>
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