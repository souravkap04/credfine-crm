import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, Button } from '@material-ui/core';
import * as ReactBootstrap from 'react-bootstrap';
import axios from 'axios';
import baseUrl from '../../global/api';
import { getProfileData } from '../../global/leadsGlobalData'
import PageLayerSection from '../PageLayerSection/PageLayerSection';
const useStyles = makeStyles({
    container: {
        overflow: 'auto',
        maxHeight: '550px',
        // margin: '25px'
    },

    table: {
        Width: '100%',
    },
    loader: {
        position: "relative",
        left: "35em"
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
    return (
        <PageLayerSection>
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr No</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Dialer ID</TableCell>
                            <TableCell>Dialer PASS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? verifyUsers.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.dialer_id}</TableCell>
                                <TableCell>{row.dialer_pass}</TableCell>
                                <TableCell>
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
