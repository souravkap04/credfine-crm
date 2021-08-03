import React, { useState } from 'react';
import './pageLayerSection.css';
import Menu from '../Menu/Menu';
export default function AdjustSection(props) {
    return (
        <div className="pageAdjustSection">
            <div className="leftSection">
                <Menu />
            </div>
            <div className="rightSection">
                {props.children}
            </div>
        </div>
    )
}
