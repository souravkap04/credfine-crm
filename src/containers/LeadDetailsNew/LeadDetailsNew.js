import React, { useState, useEffect } from 'react';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import './leadDetailsNew.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from 'react-bootstrap';
const useStyles = makeStyles({
    circleTick: {
        opacity: '0.4'
    },
    headerText: {
        fontFamily: 'Lato',
        fontSize: '17px',
        fontWeight: '400',
        letterSpacing: '0.4px'
    }
});
const Accordion = withStyles({
    root: {
        boxShadow: '0 3px 4.7px 0 rgba(0, 0, 0, 0.27)',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: '#8f9bb3',
        borderBottom: '2px solid #fff',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
            backgroundColor: '#4046b2',
        },
        color: '#fff'
    },
    content: {
        justifyContent: 'space-between',
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expandIcon: {
        color: '#fff',
        '&$expanded': {
            transform: 'rotate(90deg)'
        }
    },
    expanded: {
    },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);
export default function LeadDetailsNew(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <PageLayerSection>
            <div className="headerSection">
                <h3>Lead Details</h3>
            </div>
            <Grid className="accordianContainer" lg={9}>
                <Accordion square defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1d-content" id="panel1d-header">
                        <Typography className={classes.headerText}>Personal Details</Typography>
                        <CheckCircleIcon className={classes.circleTick} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container
                            direction="row"
                            justifyContent="center"
                        >
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Lead ID"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Loan Amount"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Full Name"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    type="date"
                                    className="textField"
                                    placeholder="DD / MM / YYYY"
                                    id="outlined-full-width"
                                    label="Date of Birth"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    error
                                    className="textField"
                                    id="outlined-full-width"
                                    label="PAN Number"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText="Invalid PAN"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Email ID"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid container direction="row"
                                justifyContent="space-between"
                                alignItems="center" >
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Mobile Number"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <Button onClick={handleChange('panel2')} className="saveAndNextBtn">SAVE &amp; NEXT</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion square>
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel2d-content" id="panel2d-header">
                        <Typography className={classes.headerText}>Current Residential Details</Typography>
                        <CheckCircleIcon className={classes.circleTick} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row"
                            justifyContent="center">
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Pincode"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText="Current Residence"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    select
                                    label="City"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                >
                                    <option key="" value="">
                                        Select
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    select
                                    label="State"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                >
                                    <option key="" value="">
                                        Select
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid container direction="row"
                                justifyContent="space-between"
                                alignItems="center" >
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        select
                                        label="Resident Type"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                    >
                                        <option key="" value="">
                                            Select
                                        </option>
                                    </TextField>
                                </Grid>
                                <Grid lg={4}>
                                    <Button className="saveAndNextBtn">SAVE &amp; NEXT</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion square >
                    <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel3'} onChange={handleChange('panel3')} aria-controls="panel3d-content" id="panel3d-header">
                        <Typography className={classes.headerText}>Employment &amp; Income Details</Typography>
                        <CheckCircleIcon className={classes.circleTick} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row" justifyContent="center">
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    select
                                    label="Employment Type"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                >
                                    <option key="" value="">
                                        Select
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Company Name"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Vintage in Current Company"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Total Work Experience"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Net Monthly Income"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Mode of Salary"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid lg={4}>
                                    <TextField
                                        className="textField"
                                        id="outlined-full-width"
                                        label="Salary Credit Bank Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid lg={4}>
                                    <Button className="saveAndNextBtn">SAVE &amp; NEXT</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion square >
                    <AccordionSummary expandIcon={<ArrowRightIcon />} expanded={expanded === 'panel4'} onChange={handleChange('panel4')} aria-controls="panel4d-content" id="panel4-header">
                        <Typography className={classes.headerText}>Obligation Details</Typography>
                        <CheckCircleIcon className={classes.circleTick} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row" justifyContent="center">
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Total EMI"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Credit Card Outstanding"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid lg={4}>
                                <TextField
                                    className="textField"
                                    id="outlined-full-width"
                                    label="Credit Card Balance Transfer"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                                <Grid lg={4}>
                                    <Button className="saveAndNextBtn">SAVE &amp; NEXT</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </PageLayerSection>
    )
}