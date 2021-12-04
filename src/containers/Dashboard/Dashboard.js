import React, { useState } from 'react';
import NoDataFound from '../NoDataFound/NoDataFound';
import PageLayerSection from '../PageLayerSection/PageLayerSection'
export default function Dashboard() {
    return (
        <PageLayerSection isDisplaySearchBar={false}>
            <NoDataFound text="No Data Found" />
        </PageLayerSection>
    )
}