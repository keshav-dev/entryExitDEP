import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import DateTimePicker from 'react-datetime-picker';
// import "react-datepicker/dist/react-datepicker.css";

import { CSVLink } from "react-csv";
import FileUpload from './FileUpload';

const AHome = () => {

    const [history,setHistory] = useState(null);
    const [csvreport,setCsvreport] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());
    const [status,setStatus] = useState('inside');
    const [hostel,setHostel] = useState('satluj');

    // const csvreport = null;

    // console.log(security);
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    const headers = [
        { label: "Name", key: "name" },
        { label: "Entry-Number", key: "entryNumber" },
        { label: "Hostel", key: "hostel" }
    ];

    const getStudentsIn = async() => {
        try {
            const {data} = await axios.post('api/admin/download/studentsIn',{beginTime:startDate,finishTime:lastDate,hostel,status},config);
            console.log(data);
            setCsvreport({
                data: data,
                headers: headers,
                filename: 'Report.csv'
            });
            
        } catch (error) {
            
        }
    }

    return (
        <div>
            <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            <FileUpload />
            </div>
            <h2 style={{margin:'3rem 0 0 0'}}>Download reports for -- </h2>

            <form>
                <div style={{margin:'0.5rem'}}>
                    <label htmlFor='sDate' style={{margin:'0.1rem',width:'30%'}}>Start date:-</label>
                    <DateTimePicker id='sDate' value={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div style={{margin:'0.5rem'}}>
                    <label htmlFor='lDate' style={{margin:'0.1rem',width:'30%'}}>Last date:-</label>
                    <DateTimePicker id='lDate' value={lastDate} onChange={(date) => setLastDate(date)} />
                </div>
                <div style={{margin:'0.5rem'}}>
                    <label htmlFor='status' style={{margin:'0.1rem',width:'30%'}}>Inside/Outside Campus</label>
                    <select name="Status" id='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="inside">Inside</option>
                        <option value="outside">Outside</option>
                    </select>
                </div>
                <div style={{margin:'0.5rem'}}>
                    <label htmlFor='hostel' style={{margin:'0.1rem',width:'30%'}}>Hostel name</label>
                    <input id='hostel' value={hostel} onChange={(e)=>setHostel(e.target.value)}/>
                </div>
                <Button variant='contained' onClick={()=>getStudentsIn()} color='primary'>Load CSV file</Button>
                {csvreport && <Button variant='contained' color='secondary' style={{textAlign:'center',margin:'0 4.5rem'}}><CSVLink style={{color:'white'}} {...csvreport}>Export to CSV</CSVLink></Button>}
            </form>
            {/* <div>
                (1) Students currently inside campus
                <div style={{display:'flex',justifyContent:'space-between',alignContent:'center',height:'2rem'}}>
                    <h4>Pick Date -</h4>
                    <div style={{width:'50%',margin:'1rem'}}><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignContent:'center'}}>
                    <h4>set hostel name -</h4>
                    <input value={hostel} style={{margin:'1rem',height:'1rem',width:'50%'}} onChange={(e)=>setHostel(e.target.value)} />
                </div>
                <Button variant='contained' onClick={()=>getStudentsIn()} color='primary'>Load CSV file</Button>
                {csvreport && <div style={{textAlign:'center'}}><CSVLink {...csvreport}>Export to CSV</CSVLink></div>}
            </div> */}
        </div>
    )
}

export default AHome