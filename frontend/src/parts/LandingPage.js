import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';
//import page from '../../images/landing.jpeg';
import './LandingPage.css'

const LandingPage = () => {
  const history = useHistory();
  return (
    <div >
        {/* <img src= /> */}
        <div style={{textAlign:'center'}}>
          <div className='p-2' style={{textAlign:'center',font:'2rem'}}>
            <Button variant='contained'  color='primary' style={{width:'30%'}} onClick={()=>{
              history.push('/login')
            }}>Students</Button>
          </div>
          <div className='p-2' style={{textAlign:'center'}}>
            <Button variant='contained'  color='primary' style={{width:'30%'}} onClick={()=>{
              history.push('/security/login')
            }}>Securities</Button>
          </div>
          <div className='p-2' style={{textAlign:'center'}}>
            <Button variant='contained'  color='primary' style={{width:'30%'}} onClick={()=>{
              history.push('/admin/login')
            }}>Admin</Button>
          </div>
        </div>
    </div>
  )
}

export default LandingPage