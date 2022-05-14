import React, { useState } from 'react';
import axios from "axios";
import './Register.css'
import '../../App.css';
import {Button, Divider, TextField} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ErrorMessage from '../../parts/ErrorMessage';

const Register = ({onRegister}) => {

  const history = useHistory();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [entryNo,setEntryNo] = useState('');
  const [otp,setOtp] = useState('');
  const [showOtp,setShowOtp] = useState(false);
  const [showPass,setShowPass]=useState(false);
  const [error,setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }

    if(showPass){
      const passwordChange = async()=>{
        try {
          const {data} = await axios.post("/api/users/register/password",{email,entryNumber:entryNo,password,otp},config);
          onRegister(data);
          setShowPass(false);
          history.push('/confirm')
        } catch (error) {
          setError(error.response.data.message);
          return;
        }
      }

      passwordChange();
      return;
    }

    if(showOtp){
      const confirmOtp = async()=>{
        try {
          const {data} = await axios.post("/api/users/register/otp",{email,entryNumber:entryNo,password,otp},config);
          setError(null);
          setShowOtp(false);
          setShowPass(true);
          //onRegister(data);
        } catch (error) {
          setError(error.response.data.message)
          console.log(error.message);
          return;
        }
      }
      confirmOtp()
      //history.push('/confirm')
      return;
    }

    const getOtp = async()=>{
      try {
        const data = await axios.post("/api/users/register",{email,entryNumber:entryNo,password},config);
        console.log(data);
        setPassword('');
        setShowOtp(true);
        setError(null);
      } catch (error) {
        setError(error.response.data.message);
        console.log(error.message);
      }
    }

    getOtp();
  }

  return (
    <div>
      <div className='icon'>
        <div className='icon_class'>
          <PersonAddIcon fontSize='large' />
        </div>
        <div className='text'>Sign up</div>
      </div>

      <div className='row m-2'>
        {error && 
          <div className='p-2'>
            <ErrorMessage variant='danger'>{error}</ErrorMessage>
          </div>
        }
        {showOtp &&
        <div className='p-2'>
          <TextField id="otp" className='p-2' type='text' variant='outlined' label='Enter OTP' fullWidth onChange={(e)=>setOtp(e.target.value)}/>
        </div>
        }
        {!showPass && !showOtp &&
        <>
          <div className='p-2'>
            <TextField id="email" className='p-2' type='email' variant='outlined' label='Enter Email' fullWidth onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className='p-2'>
            <TextField id="entryNumber" className='p-2' type='text' variant='outlined' label='Enter Entry Number' fullWidth onChange={(e)=>setEntryNo(e.target.value)}/>
          </div>
          <div className='p-2'>
            <TextField id="password" className='p-2' type='password' variant='outlined' label='Enter Password' fullWidth onChange={(e)=>setPassword(e.target.value)}/> 
          </div>
        </>
        }

        {showPass && 
        <div className='p-2'>
          <TextField id="password" className='p-2' type='password' variant='outlined' label='Enter New Password' fullWidth onChange={(e)=>setPassword(e.target.value)}/> 
        </div>
        }

        <div className='p-2' style={{textAlign:'center'}}>
          <Button variant='contained' color='primary' onClick={submitHandler}>Create Account</Button>
        </div>
      </div>

      <Divider variant='middle'/>
      <p className='text-center'>
        <Link to="/login" className='text-black-50'>
          <h5>Already have an Account?</h5>
        </Link>
      </p>

    </div>
  )
}

export default Register