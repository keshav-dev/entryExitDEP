import { Button, Divider, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import './confirmPage.css';
import { Link, useHistory } from 'react-router-dom';

const ConfirmPage = ({student}) => {

  const history = useHistory();

  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [entryNo,setEntryNo] = useState('');
  const [phone,setPhone] = useState('');
  const [parentPhone,setParentPhone] = useState('');
  const [hostel,setHostel] = useState('');
  const [room,setRoom] = useState('');

  useEffect(()=>{
      if(student){
          setEntryNo(student.entryNumber);
          setEmail(student.email);
          setName(student.name);
          setParentPhone(student.parentPhone);
          setPhone(student.phone);
          setHostel(student.hostel);
          setRoom(student.room);
      }
  },[student]);

  const submitHandler = () => {
      history.push('/');
  }
  console.log(student);

  return (
    <div>
      <div className='icon'>
        <div className='text'>Is this you ?</div>
      </div>

      <div className='row m-2'>
        
        <div className='flexer'>
            <div className='p-2 left'>
                <TextField id="name" className='p-2' type='text' variant='outlined' label='Name' fullWidth onChange={(e)=>setName(e.target.value)} value={name} disabled/>
            </div>
            <div className='p-2 right' style={{textAlign:'center'}}>
                <Button variant='contained' color="secondary" onClick={submitHandler}>Report</Button>
            </div>
        </div>
        <div className='flexer'>
            <div className='p-2 left'>
                <TextField id="email" className='p-2' type='email' variant='outlined' label='Email' fullWidth onChange={(e)=>setEmail(e.target.value)} value={email} disabled/>
            </div>
            <div className='p-2 right' style={{textAlign:'center'}}>
                <Button variant='contained' color="secondary" onClick={submitHandler}>Report</Button>
            </div>
        </div>
        <div className='flexer'>
            <div className='p-2 left'>
                <TextField id="entryNumber" className='p-2' type='text' variant='outlined' label='Entry Number' fullWidth onChange={(e)=>setEntryNo(e.target.value)} value={entryNo} disabled/>
            </div>
            <div className='p-2 right' style={{textAlign:'center'}}>
                <Button variant='contained' color="secondary" onClick={submitHandler}>Report</Button>
            </div>
        </div>
        <div className='flexer'>
            <div className='p-2 left'>
                <TextField id="phone" className='p-2' type='text' variant='outlined' label='your Phone Number' fullWidth onChange={(e)=>setPhone(e.target.value)} value={phone} disabled/> 
            </div>
            <div className='p-2 right' style={{textAlign:'center'}}>
                <Button variant='contained' color="secondary" onClick={submitHandler}>Report</Button>
            </div>
        </div>
        <div className='flexer'>
            <div className='p-2 left'>
                <TextField id="parentPhone" className='p-2' type='text' variant='outlined' label='Parents Phone Number' fullWidth onChange={(e)=>setParentPhone(e.target.value)} value={parentPhone} disabled/> 
            </div>
            <div className='p-2 right' style={{textAlign:'center'}}>
                <Button variant='contained' color="secondary" onClick={submitHandler}>Report</Button>
            </div>
        </div>
        <div className='flexer'>
            <div className='p-2 left'>
                <TextField id="hostel" className='p-2' type='text' variant='outlined' label='hostel Name' fullWidth onChange={(e)=>setHostel(e.target.value)} value={hostel} disabled/> 
            </div>
            <div className='p-2 right' style={{textAlign:'center'}}>
                <Button variant='contained' color="secondary" onClick={submitHandler}>Report</Button>
            </div>
        </div>
        <div className='flexer'>
            <div className='p-2 left'>
                <TextField id="phone" className='p-2' type='text' variant='outlined' label='Room' fullWidth onChange={(e)=>setRoom(e.target.value)} value={room} disabled/> 
            </div>
            <div className='p-2 right' style={{textAlign:'center'}}>
                <Button variant='contained' color="secondary" onClick={submitHandler}>Report</Button>
            </div>
        </div>
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

export default ConfirmPage