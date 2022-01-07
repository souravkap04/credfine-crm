import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const PLData = [
  {
    loanAmount: 100000,
    employmentType: "Salaried",
    loanType: "PL",
    monthlyIncome: 100000,
    dob: "18-11-1991",
    mobileNo: 9999999999,
    pincode: 122001,
    name: "Naveen",
    companyName: "TCS",
    campaignCategory: "Low_credit",
    vendor: "Dummy Vendor",
    panNumber:"BCDPXXXXXC",
    roi:23
  },
];

var BLData = [
  {
    loanAmount: 1000000,
    loanType: "BL",
    annualTurnover: 10000000,
    annualProfit: 10000000,
    mobileNo: 7042359090,
    employmentType: "Business",
    dob: "18-11-1991",
    name: "Naveen",
    pincode: 122001,
    campaignCategory: "Low_credit",
    vendor: "Dummy Vendor",
  },
];

export default function SampleData(props) {
  return (
    <ExcelFile
      element={<button disabled={!props.loanType}>Download_Sample </button>}>
      {props.loanType === 'personal loan' ?
        <ExcelSheet data={PLData} name="Personal Loan">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Loan Amount" value="loanAmount" />
          <ExcelColumn label="Phone No" value="mobileNo" />
          <ExcelColumn label="Loan Type" value="loanType" />
          <ExcelColumn label="Employment Type" value="employmentType" />
          <ExcelColumn label="MonthLy Income" value="monthlyIncome" />
          <ExcelColumn label="DOB" value="dob" />
          <ExcelColumn label="Res Pincode" value="pincode" />
          <ExcelColumn label="Company Name" value="companyName" />
          <ExcelColumn label="Campaign Category" value="campaignCategory" />
          <ExcelColumn label="Vendor" value="vendor" />
          <ExcelColumn label="PanNumber" value="panNumber" />
          <ExcelColumn label="ROI" value="roi" />
        </ExcelSheet> :
        <ExcelSheet data={BLData} name="Business Loan">
          <ExcelColumn label="Full Name" value="name" />
          <ExcelColumn label="Loan Amount" value="loanAmount" />
          <ExcelColumn label="Phone no" value="mobileNo" />
          <ExcelColumn label="Loan Type" value="loanType" />
          <ExcelColumn label="Employment Type" value="employmentType" />
          <ExcelColumn label="Gross Annual Turnover" value="annualTurnover" />
          <ExcelColumn label="Net Annual Profit" value="annualProfit" />
          <ExcelColumn label="Res Pincode" value="pincode" />
          <ExcelColumn label="DOB" value="dob" />
          <ExcelColumn label="Campaign Category" value="campaignCategory" />
          <ExcelColumn label="Vendor" value="vendor" />
        </ExcelSheet>}
    </ExcelFile>
  );
}
