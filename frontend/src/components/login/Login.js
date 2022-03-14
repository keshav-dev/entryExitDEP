import { Button, Divider, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../App.css';
import './Login.css'
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios';
import ErrorMessage from '../../parts/ErrorMessage';

const Login = ({onLogin}) => {

  const history = useHistory();

  const [entryNumber,setEntryNumber] = useState('');
  const [password,setPassword] = useState('');
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
        const {data} = await axios.post("/api/users/login",{entryNumber,password},config);
        console.log(data);
        onLogin(data);
        history.push('/');
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
          <TextField id="entryNumber" className='p-2' type='text' variant='outlined' label='Enter Entry Number' fullWidth value={entryNumber} onChange={(e)=>setEntryNumber(e.target.value)}/>
        </div>
        <div className='p-2'>
          <TextField id="password" className='p-2' type='password' variant='outlined' label='Enter Password' fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}/> 
        </div>
        <div className='p-2' style={{textAlign:'center'}}>
          <Button variant='contained' onClick={submitHander} color='primary'>Login</Button>
        </div>
      </div>

      <Divider variant='middle'/>
      <p className='text-center'>
        <Link to="/register" className='text-black-50'>
          <h5>Create Account</h5>
        </Link>
      </p>

    </div>
  )
}

export default Login