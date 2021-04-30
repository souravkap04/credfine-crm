import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    loanAmount: 100000,
    employmentType: "salaried",
    monthlyIncome: 30000,
    dob: "12/05/1972",
    mobileNo: 7589856589,
    pincode: 580068,
    fullName: "Josef Martin",
    companyName: "xyz pvt ltd",
  },
];

var dataSet2 = [
  {
    loanAmount: 100000,
    annualTurnover: 2500000,
    annualProfit: 500000,
    mobileNo: 7425898658,
    employmentType: "salaried",
    dob: "18/10/1955",
    fullName: "Anthony Gonsalves",
    pincode: 580068,
  },
];
 
 export default function SampleData({loanType}) {
   console.log(loanType);
        return (
            <ExcelFile element={<button disabled={!loanType} >Download </button>}>
                {loanType === 'personal loan' ? 
                <ExcelSheet data={dataSet1} name="Personal Loan">
                    <ExcelColumn label="Loan Amount" value="loanAmount"/>
                    <ExcelColumn label="Employment Type" value="employmentType"/>
                    <ExcelColumn label="DOB" value="dob"/>
                    <ExcelColumn label="Mobile No" value="mobileNo"/>
                    <ExcelColumn label="Pincode" value="pincode"/>
                    <ExcelColumn label="Full Name" value="fullName"/>
                    <ExcelColumn label="Company Name" value="companyName"/>
                </ExcelSheet> :
                <ExcelSheet data={dataSet2} name="Business Loan">
                    <ExcelColumn label="Loan Amount" value="loanAmount"/>
                    <ExcelColumn label="Annual Turnover" value="annualTurnover"/>
                    <ExcelColumn label="Annual Profit" value="annualProfit"/>
                    <ExcelColumn label="Mobile No" value="mobileNo"/>
                    <ExcelColumn label="Employment Type" value="employmentType"/>
                    <ExcelColumn label="DOB" value="dob"/>
                    <ExcelColumn label="Full Name" value="fullName"/>
                    <ExcelColumn label="Pincode" value="pincode"/>
                </ExcelSheet>}
            </ExcelFile>
        );
    }
