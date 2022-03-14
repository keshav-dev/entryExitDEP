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

function App() {
  const history = useHistory();
  const [studentData,setStudentData] = useState(null);

  const onStudentSign = (data) => {
    setStudentData(data);
  }
  return (
    <BrowserRouter>
    <div style={{backgroundImage:`url("https://images.indianexpress.com/2019/12/JP04IIT-Ropar-05_759.jpg")`,height:'100vh',width:'100vw',backgroundSize:'contain'}}>
      <Header />
      <Container maxWidth='md' >
        <main className='app' style={{zIndex:'1',position: "relative",backgroundColor: 'white',
opacity: 1}}>
          {/* <Route path='/landing' component={()=><LandingPage student={studentData}/>} exact /> */}
          <Route path='/' component={()=><Home student={studentData}/>} exact />
          <Route path='/login' component={()=><Login user={"student"} onLogin={onStudentSign}/>} exact />
          <Route path='/register' component={()=><Register user={"student"} onRegister={onStudentSign}/>}exact />
          <Route path='/confirm' component={()=><ConfirmPage student={studentData} />} exact/>
        </main>
      </Container>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
