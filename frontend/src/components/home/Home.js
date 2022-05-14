import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import './Home.css';
import {useHistory} from 'react-router-dom'

const Home = ({student}) => {
  const history = useHistory();
  if(!student){
    history.push('/landing')
  }
    const [src,setSrc] = useState('');
    const [use,setUse] = useState(false);

    useEffect(()=>{
      const stud = {
        id:student._id,
        status:student.status
      }
        const studentStr = JSON.stringify(stud)
        QRCode.toDataURL(studentStr).then(setSrc);
    },[student])

  return (
    <div>
      {student && 
      <>
      <div className='p-2' style={{textAlign:'center',padding:'1rem',border:'1px solid black',margin:'0 0 1rem 0',fontSize:'2rem'}}>
      {`You are currently ${student.status} the campus`}
    </div>

    <div style={{border:'1px solid black'}}>
      <div className='p-2' style={{textAlign:'center',padding:'2rem'}}>
        <Button variant='contained' color='primary' style={{fontSize:'2rem',padding:'1rem 4rem'}} onClick={()=>{setUse(true)}}>{student.status==='outside'?'enter':'exit'}</Button>
      </div>
      {use && <div style={{display:'flex',justifyContent:'center'}}><img src={src}/></div>}
    </div>

    <div style={{border:'1px solid black',margin:'1rem 0 0 0'}}>
      {student.history.slice(0).reverse().map((item)=>{
        return <div className='p-2' style={{textAlign:'center',padding:'2rem'}}>
          {`${item.entry} on ${item.date.substring(0,10)} at ${item.date.substring(11,19)}`}
        </div>
      })}
    </div>
    </>
    }
      
        
        {/* <div className='p-2' style={{textAlign:'center',padding:'2rem'}}>
          <Button variant='contained' color='primary' style={{fontSize:'2rem',padding:'1rem 4rem'}}>Enter</Button>
        </div>
        <div className='p-2' style={{textAlign:'center',padding:'2rem'}}>
          <Button variant='contained' color='primary' style={{fontSize:'2rem',padding:'1rem 4rem'}}>Exit</Button>
        </div> */}
    </div>
  )
}

export default Home