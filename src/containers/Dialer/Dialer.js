import React from 'react'
import axios from 'axios'
import PageLayerSection from '../PageLayerSection/PageLayerSection'

export default function Dialer() {
    return (
        <PageLayerSection isDisplaySearchBar={true} >
            <iframe src='https://credfine.slashrtc.in/index.php/ssoLogin?crmUniqueId=CeuCxaZUVpk+Stxmt5qIWA==&usernameId=sourav1994&requestOrigin=http://crm.credfine.com/' 
            width='100%' 
            height='540' 
            frameBorder='0'
            allow='camera; microphone'
            ></iframe>
        </PageLayerSection>
    )
}
