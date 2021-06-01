export const getBank = ()=>{
    const banks = ["SBI","HDFC","Canara Bank","ICICI","Kotak Mahindra Bank","SCB","PNB","IDFC",
"CBI","BOB","Indian Bank","Bank Of India","Yes Bank","City Bank","Bank Of Maharashtra","OBC","Indusind Bank",
"HSBC","DBS","Uco Bank","Axis Bank"];
return banks;
}

export const getResidentType = () => {
    const residentType = ["Self/Spouse Owned"," Parental Owned","Rented With Family","Rented With Friend",
"Rented Bachelor","PG/Holtel","Company Provided"];
return residentType;
}
export const getSalaryModeType = ()=>{
   const salaryMode = ["Bank Transfer","Cheque Transfer","Cash Salary"];
   return salaryMode;
}
export const getProfileData = ()=>{
    const profileData = JSON.parse(localStorage.getItem("user_info"));
    return profileData;
}

