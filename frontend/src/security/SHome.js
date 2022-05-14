import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import {QrReader} from 'react-qr-reader'

const SHome = ({security}) => {

    const [scanned,setScanned] = useState(false);
    const [history,setHistory] = useState(null);

    console.log(security);
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    const submitHandler = (student) => {
        student = JSON.parse(student);    
        const scanHandler = async()=>{
          try {
            const statusNew = student.status==='outside' ? 'entered':'left';
            setScanned(true);
            const {data} = await axios.post("/api/security/onscan",{studentId:student.id,securityId:security._id,gate:security.gate, status:statusNew},config);
            setScanned(true);
          } catch (error) {
            setScanned(false);
            //console.log(error.response.data.message);
            // setError(error.response.data.message);
            return;
          }
        } 
        scanHandler();
      } 

      const historyHandler = async() => {
          const insideHandler = async()=>{
            // console.log(security);
          try {
            const {data} = await axios.post("/api/security/history",{securityId:security._id},config);
            console.log(data);
            setHistory(data);
          } catch (error) {
            console.log(error.response.data.message);
            // setError(error.response.data.message);
            return;
          }
        }
        insideHandler();
      }

    return (
        <div>
            {!scanned && <QrReader
            delay={3000}
            style={{width:'50%'}}
            onResult={(result, error) => {
                if (!!result) {
                    submitHandler(result.text);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
            />}
            {scanned && 
                <div className='p-2' style={{textAlign:'center'}}>
                    <Button variant='contained' onClick={()=>{setScanned(false)}} color='primary'>Scan Again</Button>
                </div>
            }
            <div className='p-2' style={{textAlign:'center'}}>
                <Button variant='contained' onClick={()=>historyHandler()} color='primary'>Show history</Button>
            </div>
            {history && 
                <div className='p-2' style={{textAlign:'center'}}>
                    <Button variant='contained' onClick={()=>{setHistory(null)}} color='primary'>Close history</Button>
                </div>
            }
            {history && history.slice(0).reverse().map((item)=>{
                return <div className='p-2' style={{textAlign:'center',padding:'2rem'}}>
                {`${item.name} ${item.status} on ${item.date.substring(0,10)} at ${item.date.substring(11,19)}`}
                </div>
            })}
        </div>
    )
}

export default SHome