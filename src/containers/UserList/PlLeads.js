import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    Width: '100%',
  },
  tableheading:{
    padding:'0 25px'
  }
  
});

function createData(leadId, name, phoneNo, loanAmount, pincode, companyName,dateOfBirth, monthlyIncome, loanType) {
  return { leadId, name, phoneNo, loanAmount, pincode, companyName,dateOfBirth, monthlyIncome, loanType};
}

const rows = [
  createData(100466789, "max", 8478589886, 200000.00, 721428, "valtech", "02/05/1985", "25k", "personal" ),
  createData(100466568, "paul", 7856898568, 300000.00, 721428, "valtech", "02/05/1985", "25k", "personal" ),
  createData(100466256, "jhon", 8478589886, 200000.00, 721428, "valtech", "02/05/1985", "25k", "personal" ),
  createData(100466228, "merry", 8478589886, 200000.00, 721428, "valtech", "02/05/1985", "25k", "personal" ),
  createData(100466789, "tom", 8478589886, 200000.00, 721428, "valtech", "02/05/1985", "25k", "personal" ,)
];

export default function BasicTable() {
  const classes = useStyles();

  return (
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableheading}>Lead Id</TableCell>
            <TableCell className={classes.tableheading} align="right">Name</TableCell>
            <TableCell className={classes.tableheading} align="right">Phone No</TableCell>
            <TableCell className={classes.tableheading} align="right">Loan Amount</TableCell>
            <TableCell className={classes.tableheading} align="right">Pin Code</TableCell>
            <TableCell className={classes.tableheading} align="right">Company Name</TableCell>
            <TableCell className={classes.tableheading} align="right">Date of Birth</TableCell>
            <TableCell  className={classes.tableheading}align="right">Monthly Income</TableCell>
            <TableCell className={classes.tableheading} align="right">Loan Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.leadId}>
              <TableCell component="th" scope="row">
                {row.leadId}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.phoneNo}</TableCell>
              <TableCell align="center">{row.loanAmount}</TableCell>
              <TableCell align="center">{row.pincode}</TableCell>
              <TableCell align="center">{row.companyName}</TableCell>
              <TableCell align="center">{row.dateOfBirth}</TableCell>
              <TableCell align="center">{row.monthlyIncome}</TableCell>
              <TableCell align="center">{row.loanType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     
  );
}