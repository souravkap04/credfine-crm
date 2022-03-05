import React from 'react';
import './Loanbaba.css';
import logo from '../../images/forms/loanbaba.png';
import back from '../../images/forms/back.svg';
import phoneCall from '../../images/forms/phoneCall.svg';
import { List } from '@material-ui/core';

const Loanbaba = () => {
    return (
        <div className='LoanbabaContainer'>
            <div className='leftSection'>
                <div className='loanbabaimg'>
                    <img src={logo} alt="" />
                </div>
                <List className='list'>
                    <div className='progressContainer'>
                        <div className='progressBox'>
                            <div className='progressIconBox'>
                                <div className='iconBar'></div>
                                <div className='bottomProgressBar'></div>
                            </div>
                            <div className='iconText'>Personal Details</div>
                        </div>
                        <div className='progressBox'>
                            <div className='progressIconBox'>
                                <div className='iconBar'></div>
                            </div>
                            <div className='iconText'>Loan Approval Status</div>
                        </div>
                    </div>
                </List>
            </div>
            <div className='rightSection'>
                <div className='headerContainer'>
                <div className="backButton">
                        <img src={back} alt="" />
                    </div>
                    <div className='needHelpContainer'>
                        <div className="needHelpText">Need Help?</div>
                        <div className="rightPart">
                            <div className="phoneCall">
                                <img src={phoneCall} alt="" />
                            </div>
                            <div className="numberText">7045330702</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Loanbaba;