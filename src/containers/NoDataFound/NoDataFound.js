import React, { useState } from 'react';
import './nodatafound.css';
export default function NoDataFound(props) {
    return (
        <div className="noDataFoundContainenr">
            <h1>{props.text}</h1>
        </div>
    )
}