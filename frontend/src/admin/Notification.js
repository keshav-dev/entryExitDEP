import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { Fragment } from 'react'
import { useEffect,useState } from 'react';
import { Checkmark } from 'react-checkmark';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Modal } from 'react-modal-overlay';
import 'react-modal-overlay/dist/index.css';

const Notification = () => {
    const [reports,setReports] = useState([]);
    const [student,setStudent] = useState(null);
    const [isOpen, setIsOpen] = useState(false)

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    const upfetch = () => {
        const fetchReports = async() => {
            try {
                const {data} = await axios.get('/api/admin/reports',config);
                console.log(data);
                setReports(data);
            } catch (error) {
                
            }
        }
        fetchReports();
    }
    const upStudent = (index) => {
        const fetchStudent = async() => {
            try {
                const {data} = await axios.post('/api/users/studentInfo',{studentId:reports[index].studentId},config);
                console.log(data);
                setStudent(data);
            } catch (error) {
                
            }
        }
        fetchStudent();
    }
    const upApprove = (index) => {
        const approveReport = async() => {
            try {
                const {data} = await axios.post('/api/admin/approve',{index:index},config);
                if(data.msg){
                    upfetch();
                }
            } catch (error) {
                console.log(error);
            }
        }
        approveReport();
    }
    const upDisapprove = (index) => {
        const disapproveReport = async() => {
            try {
                const {data} = await axios.post('/api/admin/deny',{index:index},config);
                if(data.msg){
                    upfetch();
                }
            } catch (error) {
                console.log(error);
            }
        }
        disapproveReport();
    }
    useEffect(()=>{
        upfetch();
    },[reports]);
  return (
    <div>
        <Modal show={isOpen} closeModal={() => setIsOpen(false)}>
            <h2 style={{margin:'10rem 0 1rem 0'}}>Student Information</h2>
            <div style={{display:'flex',justifyContent:'space-bewteen',alignItems:'center',height:'2rem',fontSize:'1rem',textAlign:'center'}}>
                <div style={{textAlign:'left',width:'50%'}}>Name </div>
                <div>{student?.name}</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-bewteen',alignItems:'center',height:'2rem',fontSize:'1rem',textAlign:'center'}}>
                <div style={{textAlign:'left',width:'50%'}}>{'    '}Entry Number </div>
                <div>{student?.entryNumber}</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-bewteen',alignItems:'center',height:'2rem',fontSize:'1rem',textAlign:'center'}}>
                <div style={{textAlign:'left',width:'50%'}}>{'       '}Email address </div>
                <div>{student?.email}</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-bewteen',alignItems:'center',height:'2rem',fontSize:'1rem',textAlign:'center'}}>
                <div style={{textAlign:'left',width:'50%'}}>Address </div>
                <div>{student?.address}</div>
            </div>
            
        </Modal>
        {reports.map((report,index)=>{
            return <div key={report.studentId} style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'1.2rem',border:'1px solid black',padding:'4px'}}>
                Request to change {report.entry} from {report.previousEntry} to {report.currentEntry}
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Button style={{margin:'0rem',border:'0px solid white'}} onClick={()=>{
                        upApprove(index);
                        upfetch();
                    }}><Checkmark size='medium'/></Button>
                    <Button style={{margin:'0rem',border:'0px solid white'}} onClick={()=>{
                        upDisapprove(index);
                        upfetch();
                    }}>
                        <div style={{width:'1.5rem',borderRadius:'50%',border:'0px solid black',backgroundColor:'red',color:'white'}}>X</div>
                    </Button>
                    <Button onClick={
                        ()=>{
                            setIsOpen(true)
                            upStudent(index);
                        }
                    }>
                        <QuestionMarkIcon />
                    </Button>
                </div>
            </div>
        })}
    </div>
  )
}

export default Notification