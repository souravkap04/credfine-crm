import React, { useState } from 'react';
import RightArrow from '../../images/forms/iconArrowRight.svg';
import './formcontainer.css';
export default function FormContainer(props) {
    return (
        <React.Fragment>
            <div className={"iconTextContainer " + props.className}>
                <div className="icon">
                    <img src={props.iconImage} alt="" />
                </div>
                <div className="text">{props.TitleText}</div>
            </div>
            <div className={"formMainContainer " + props.className}>
                <h3>{props.Name}</h3>
                <div className="formContainer">
                    {props.children}
                </div>
                <div className="borderBottom"></div>
                {props.isSaveNextButton ? <div className="saveButton" onClick={props.onClick}>
                    <div className="btnText">SAVE &amp; NEXT</div>
                    <div className="arrowIcon">
                        <img src={RightArrow} alt="" />
                    </div>
                </div> : ''}
            </div>
        </React.Fragment>
    )
}