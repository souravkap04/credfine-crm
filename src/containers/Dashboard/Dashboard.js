import React, { useState } from 'react';
import NoDataFound from '../NoDataFound/NoDataFound';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import EligibilityCalculator from '../EligibilityCalculator/EligibilityCalculator';
export default function Dashboard() {
    const [openCalculate, setopenCalculate] = useState(false);
    const [checkEligibility, setCheckEligibility] = useState(false);
    const openEligibility = () => {
        setCheckEligibility(true);
    }
    const closeEligibility = () => {
        setCheckEligibility(false);
    }
    const openCalculator = () => {
        setopenCalculate(true);
    }
    const closeCalculator = () => {
        setopenCalculate(false);
    }
    return (
        <PageLayerSection isDisplaySearchBar={false} ActualEmiCalculate={openCalculator} ActualEligibilityCalculate={openEligibility}>
            <EligibilityCalculator isOpenEligibilityCalculator={checkEligibility} isCloseEligibilityCalculator={closeEligibility} />
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            <iframe src="https://credfine.slashrtc.in/index.php/ssoLogin?crmUniqueId=CeuCxaZUVpk+Stxmt5qIWA==&usernameId=sourav1994&requestOrigin=http://crm.credfine.com/" width="300px" height="300px" frameBorder="0" title="description"></iframe>
            <NoDataFound text="No Data Found" />
        </PageLayerSection>
    )
}