import logo from './logo.svg';
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import './App.css';
import Header from './header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Footer from './footer/Footer';
import { Container } from '@material-ui/core';
import { useState } from 'react';
import ConfirmPage from './parts/confirmPage';

function App() {
  const history = useHistory();
  const [studentData,setStudentData] = useState(null);

  const onStudentRegister = (data) => {
    setStudentData(data);
  }
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth='md'>
        <main className='app'>
          <Route path='/' component={()=><Home student={studentData}/>} exact />
          <Route path='/login' component={()=><Login user={"student"}/>} exact />
          <Route path='/register' component={()=><Register user={"student"} onRegister={onStudentRegister}/>}exact />
          <Route path='/confirm' component={()=><ConfirmPage student={studentData} />} exact/>
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
