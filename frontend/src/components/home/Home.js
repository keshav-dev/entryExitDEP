import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import './Home.css'

const Home = ({student}) => {
    const [src,setSrc] = useState('');

    useEffect(()=>{
        const studentStr = JSON.stringify(student)
        QRCode.toDataURL(studentStr).then(setSrc);
    },[student])

  return (
    <div>
        <img src={src} />
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