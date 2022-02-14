import React from 'react';
import './eligibilitycalculator.css';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
const EligibilityCalculator = (props) => {
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
                        />
                    </Grid>
                    <Grid >
                        <TextField
                        className='eligibilityTextField'
                        id="outlined-full-width"
                        label="Tenure"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        />
                    </Grid>
                    <div className='multiplierContainer'>
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
                        />
                    </Grid>
                    </div>
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
                        />
                    </Grid>
                </Grid>
            </div>
        </Drawer>
    );
};


export default EligibilityCalculator;