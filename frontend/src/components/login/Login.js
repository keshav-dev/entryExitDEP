import { Button, Divider, TextField } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css';
import './Login.css'
import PersonIcon from '@material-ui/icons/Person';

const Login = ({history}) => {

  const submitHander = (e) => {
    e.preventDefault();
    history.push('/')
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
        <div className='p-2'>
          <TextField id="email" className='p-2' type='email' variant='outlined' label='Enter Email' fullWidth />
        </div>
        <div className='p-2'>
          <TextField id="password" className='p-2' type='password' variant='outlined' label='Enter Password' fullWidth /> 
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