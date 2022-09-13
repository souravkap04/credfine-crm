import React from 'react'
import axios from 'axios'
import PageLayerSection from '../PageLayerSection/PageLayerSection'

export default function Dialer() {
    const loginHandler = async () => {
        await axios.post('https://credfine.slashrtc.in/index.php/ssoLogin?crmUniqueId=CeuCxaZUVpk+Stxmt5qIWA==&usernameId=sourav1994&requestOrigin=http://localhost:3000/')
        .then((response)=>{
            console.log("working")
        }).catch((error)=>{
            console.log("error")
        })
    }
    return (
        <PageLayerSection isDisplaySearchBar={true} >
            {/* <iframe src='https://credfine.slashrtc.in/index.php/ssoLogin?crmUniqueId=CeuCxaZUVpk+Stxmt5qIWA==&usernameId=sourav1994&requestOrigin=http://localhost:3000/' width='100%' height='540' frameBorder='0'></iframe> */}
            <button onClick={loginHandler}>login</button>
        </PageLayerSection>
    )
}
