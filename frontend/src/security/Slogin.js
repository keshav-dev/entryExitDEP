import { Button, Divider, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import '../../App.css';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios';
import ErrorMessage from '../parts/ErrorMessage';

const Slogin = ({onLogin}) => {

  const history = useHistory();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [gate,setGate] = useState('');
  const [error,setError] = useState(null);

  const submitHander = (e) => {
    e.preventDefault();
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }

    const loginStudent = async()=>{
      try {
        const {data} = await axios.post("/api/security/login",{email,password,gate},config);
        console.log(data);
        onLogin(data);
        history.push('/security');
      } catch (error) {
        //console.log(error.response.data.message);
        setError(error.response.data.message);
        return;
      }
    }

    loginStudent();
    
  }

  return (
    <div>
      <div className='icon'>
        <div className='icon_class'>
          <PersonIcon fontSize="large"></PersonIcon>
        </div>
        <div className='text'>Login</div>
      </div>


      <div className='row m-2'>
        {error && 
          <div className='p-2'>
            <ErrorMessage variant='danger'>{error}</ErrorMessage>
          </div>
        }
        <div className='p-2'>
          <TextField id="email" className='p-2' type='text' variant='outlined' label='Enter email' fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='p-2'>
          <TextField id="password" className='p-2' type='password' variant='outlined' label='Enter Password' fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}/> 
        </div>
        <div className='p-2'>
          <TextField id="gate" className='p-2' type='text' variant='outlined' label='Enter Gate Number' fullWidth value={gate} onChange={(e)=>setGate(e.target.value)}/> 
        </div>
        <div className='p-2' style={{textAlign:'center'}}>
          <Button variant='contained' onClick={submitHander} color='primary'>Login</Button>
        </div>
      </div>

    </div>
  )
}

export default Slogin