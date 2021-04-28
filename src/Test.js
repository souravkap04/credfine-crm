import React,{useState} from 'react'
import DatePicker from "react-datepicker"
export default function Test() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
              <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
    )
}
