export const getBank = () => {
    const banks = ["SBI", "HDFC", "Canara Bank", "ICICI", "Kotak Mahindra Bank", "SCB", "PNB", "IDFC",
        "CBI", "BOB", "Indian Bank", "Bank Of India", "Yes Bank", "City Bank", "Bank Of Maharashtra", "OBC", "Indusind Bank",
        "HSBC", "DBS", "Uco Bank", "Axis Bank", "Others"];
    return banks;
}

export const getResidentType = () => {
    const residentType = ["Self/Spouse Owned", " Parental Owned", "Rented With Family", "Rented With Friend",
        "Rented Bachelor", "PG/Holtel", "Company Provided"];
    return residentType;
}
export const getSalaryModeType = () => {
    const salaryMode = ["Bank Transfer", "Cheque Transfer", "Cash Salary"];
    return salaryMode;
}
export const getProfileData = () => {
    const profileData = JSON.parse(localStorage.getItem("user_info"));
    return profileData;
}
export const getStatusData = () => {
    let statusData = JSON.parse(localStorage.getItem('status_info'));
    return statusData;
}
export const getCampaign = () => {
    // const campaign = ['FRESH_PL_OD','BT_PL_OD','PL_OD_TOP_UP','PRE_APPROVED','HOT_LEAD', 'HOT_LEAD_PLATINUM', 'HOT_LEAD_GOLD', 'HOT_LEAD_SILVER',
    // 'WEBSITE_LEAD','OTHER','ABHISHEK_NOIDA_TEAM_1','ABHISHEK_NOIDA_TEAM_2','ABHISHEK_NOIDA_TEAM_3','ABHISHEK_NOIDA_TEAM_4',
    // 'VISHAL_NOIDA_TEAM_1','VISHAL_NOIDA_TEAM_2','VISHAL_NOIDA_TEAM_3','VISHAL_NOIDA_TEAM_4'];
    const campaign = ['FRESH_PL_OD','BT_PL_OD','PL_OD_TOP_UP', 'HOT_LEAD',
    'WEBSITE_LEAD','OTHER','ABHISHEK_NOIDA_TEAM_1','ABHISHEK_NOIDA_TEAM_2','ABHISHEK_NOIDA_TEAM_3','ABHISHEK_NOIDA_TEAM_4',
    'VISHAL_NOIDA_TEAM_1','VISHAL_NOIDA_TEAM_2','VISHAL_NOIDA_TEAM_3','VISHAL_NOIDA_TEAM_4','ELITE_CUSTOMER','SURAJ_TEAM_PL',
    'SURAJ_BT_CAMPAIGN','VISHAL_BT_CAMPAIGN','ABHISHEK_BT_CAMPAIGN','IMTIYAZ_BT_CAMPAIGN','ROHIT_PQ_CAMPAIGN',
    'ROHIT_PQ_HOT_CAMPAIGN'];
    return campaign;
}
export const getDialer = () => {
    const dialer = ['HALOOCOM-Noida', 'HALOOCOM-Mumbai'];
    return dialer;
}

