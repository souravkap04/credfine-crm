import React,{useState} from 'react'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti';
export default function Remarks({remarks,completeRemark,removeRemark}) {
    return remarks.map((remark,index)=>(
        <div className={remark.iscomplete? 'remarks-row complete':'remarks row'} key={index}>
          <div key={remark.id} onClick={()=>completeRemark(remark.id)}>
              {remark.text}
          </div>
        </div>
    ))
}
