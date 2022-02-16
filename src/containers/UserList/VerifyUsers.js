import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, Button } from '@material-ui/core';
import * as ReactBootstrap from 'react-bootstrap';
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
const useStyles = makeStyles({
    container: {
        overflow: 'auto',
        marginBottom: '25px',
        boxShadow: 'none'
    },

    table: {
        width: '100%',
    },
    tableheading: {
        backgroundColor: '#8f9bb3',
        color: '#ffffff',
        fontSize: '14px',
    },
    tabledata: {
        fontSize: '12px',
    },
    loader: {
        position: "relative",
        left: "35em"
    },
    oddEvenRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f7f9fc',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#fff',
        },
    }
});

export default function VerifyUsers() {
    const classes = useStyles();
    const profileData = getProfileData();
    const [verifyUsers, setVerifyUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                'Authorization': `Token ${profileData.token}`,
                'userRoleHash': profileData.user_roles[0].user_role_hash,
            };
            try {
                const response = await axios.get(`${baseUrl}/user/userVerifiedByAdmin/`, { headers });
                await response.data.map((item) => {
                    item['disabled'] = false

                })
                setVerifyUsers(response.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    const usersVerifyHandler = async (userName, index) => {
        const userList = [...verifyUsers];
        await axios.post(`${baseUrl}/user/userVerifiedByAdmin/`, { username: userName })
            .then((response) => {
                userList[index].disabled = true;
                setVerifyUsers(userList);
            })
    }
    const [openCalculate, setopenCalculate] = useState(false);
    const [checkEligibility,setCheckEligibility] = useState(false);
  
  const openEligibility = () =>{
    setCheckEligibility(true);
  }
  const closeEligibility = () =>{
    setCheckEligibility(false);
  }
    const openCalculator = () => {
        setopenCalculate(true);
    }
    const closeCalculator = () => {
        setopenCalculate(false);
    }
    return (
        <PageLayerSection ActualEmiCalculate={openCalculator} ActualEligibilityCalculate={openEligibility}>
            <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility}/>
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} aria-label="user table">
                    <TableHead className={classes.tableheading}>
                        <TableRow>
                            <TableCell className={classes.tableheading}>Sr No</TableCell>
                            <TableCell className={classes.tableheading}>User Name</TableCell>
                            <TableCell className={classes.tableheading}>First Name</TableCell>
                            <TableCell className={classes.tableheading}>Last Name</TableCell>
                            <TableCell className={classes.tableheading}>Email</TableCell>
                            <TableCell className={classes.tableheading}>Dialer ID</TableCell>
                            <TableCell className={classes.tableheading}>Dialer PASS</TableCell>
                            <TableCell className={classes.tableheading}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? verifyUsers.map((row, index) => (
                            <TableRow key={index} className={classes.oddEvenRow}>
                                <TableCell className={classes.tabledata}>{index + 1}</TableCell>
                                <TableCell className={classes.tabledata}>{row.username}</TableCell>
                                <TableCell className={classes.tabledata}>{row.first_name}</TableCell>
                                <TableCell className={classes.tabledata}>{row.last_name}</TableCell>
                                <TableCell className={classes.tabledata}>{row.email}</TableCell>
                                <TableCell className={classes.tabledata}>{row.dialer_id}</TableCell>
                                <TableCell className={classes.tabledata}>{row.dialer_pass}</TableCell>
                                <TableCell className={classes.tabledata}>
                                    <Button variant="outlined" color="secondary" disabled={row.disabled}
                                        onClick={() => usersVerifyHandler(row.username, index)}>
                                        verify
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : <div className={classes.loader}>
                            <ReactBootstrap.Spinner animation="border" />
                        </div>
                        }
                    </TableBody>
                </Table>
            </TableContainer >
        </PageLayerSection>
    )
}
