import React,{useState}from 'react'
import RemarkForm from './RemarkForm'
import Remarks from './Remarks';


export default function RemarkList() {
    const [remarks,setRemarks] = useState([]);
    const addRemark = (remark)=>{
        if(!remark.text || /^\s*$/.test(remark.text)){
            return;
        }
        const newRemark = [remark , ...remarks];
        setRemarks(newRemark);
        console.log(remark, ...remarks);
    }
    const completeRemarks = (id)=>{
     let updatedRemarks = remarks.map((remark)=>{
        if(remark.id===id){
            remark.isComplte = !remark.isComplte;
        }
        return remark;
     })
     setRemarks(updatedRemarks)
    }
    return (
        <div>
            {/* <RemarkForm onSubmit={addRemark}/> */}
            <Remarks 
            remarks={remarks} 
            completeRemarks={completeRemarks}/>
        </div>
    )
}
