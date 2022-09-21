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
            <NoDataFound text="No Data Found" />
        </PageLayerSection>
    )
}