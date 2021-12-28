import React, { useState } from 'react';
import NoDataFound from '../NoDataFound/NoDataFound';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import EmiCalculator from '../Emicalculator/EmiCalculator';
export default function Dashboard() {
    const [openCalculate, setopenCalculate] = useState(false);
    const openCalculator = () => {
        setopenCalculate(true);
    }
    const closeCalculator = () => {
        setopenCalculate(false);
    }
    return (
        <PageLayerSection isDisplaySearchBar={false} ActualEmiCalculate={openCalculator}>
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            <NoDataFound text="No Data Found" />
        </PageLayerSection>
    )
}