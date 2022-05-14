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
import LandingPage from './parts/LandingPage';
import Slogin from './security/Slogin';
import SHome from './security/SHome';
import Alogin from './admin/Alogin';
import AHome from './admin/AHome';
import Notification from './admin/Notification';

function App() {
  const history = useHistory();
  const [studentData,setStudentData] = useState(null);
  const [securityData,setSecurityData] = useState(null);
  const [isAdmin,setIsAdmin] = useState(false);

  const onStudentSign = (data) => {
    setStudentData(data);
  }

  return (
    <BrowserRouter>
    <div style={{backgroundImage:`url("https://images.indianexpress.com/2019/12/JP04IIT-Ropar-05_759.jpg")`,height:'100vh',width:'100vw',backgroundSize:'cover'}}>
      <Header isAdmin={isAdmin}/>
      <Container maxWidth='md' >
        <main className='app' style={{zIndex:'1',position: "relative",backgroundColor: 'white',
opacity: 1}}>
          <Route path='/landing' component={()=><LandingPage student={studentData}/>} exact />
          <Route path='/' component={()=><Home student={studentData}/>} exact />
          <Route path='/login' component={()=><Login user={"student"} onLogin={onStudentSign}/>} exact />
          <Route path='/security/login' component={()=><Slogin user={"student"} onLogin={setSecurityData}/>} exact />
          <Route path='/security' component={()=><SHome security={securityData}/>} exact />
          <Route path='/admin/login' component={()=><Alogin setIsAdmin={setIsAdmin}/>} exact />
          <Route path='/admin' component={()=><AHome />} exact />
          <Route path='/register' component={()=><Register user={"student"} onRegister={onStudentSign}/>}exact />
          <Route path='/confirm' component={()=><ConfirmPage student={studentData} />} exact/>
          <Route path='/admin/notify' component={()=><Notification  />} exact/>
        </main>
      </Container>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
