import React, { useState, useEffect } from 'react';
import PageLayerSection from '../PageLayerSection/PageLayerSection';
import EmiCalculator from '../Emicalculator/EmiCalculator';
import './calculatortable.css';
export default function CalculatorTable(props) {
    const [openCalculate, setopenCalculate] = useState(false);
    const openCalculator = () => {
        setopenCalculate(true);
    }
    const closeCalculator = () => {
        setopenCalculate(false);
    }
    return (
        <PageLayerSection isDisplaySearchBar={true} ActualEmiCalculate={openCalculator}>
            <EmiCalculator isOpenCalculator={openCalculate} isCloseCalculator={closeCalculator} />
            <div className="EMIHeaderContainer">
                <h3>EMI Table</h3>
            </div>
        </PageLayerSection>
    )
}