import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (with Popper)
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from './context/context';
import LoadingPage from './components/LoadingPage';

import Footer from './components/Footer';

import Users from './pages/Users';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import UsersPlus from './pages/UsersPlus';

function App() {
  const {checkauth,isLogIn,ProtectAuth,ProtectRoute } = useContext(MyContext);

  useEffect(()=>{
    checkauth()
  },)


  return (
    
    <>
    {isLogIn!=null?<>
       <Navbar/>

      <div className='allapp w-100'>
        <Routes>
      {/* Auth Routes*/}
        <Route path="/login" element={<ProtectAuth><Login/> </ProtectAuth>} />   


      {/* Protected Routes  */}
        <Route path="/users" element={  <ProtectRoute> <Users/>  </ProtectRoute> }  />
        <Route path="/usersplus" element={  <ProtectRoute> <UsersPlus/>  </ProtectRoute> }  />
        <Route path="/orders" element={  <ProtectRoute> <Orders/>  </ProtectRoute> }  />
        <Route path="/messages" element={  <ProtectRoute> <Messages/>  </ProtectRoute> }  />



        <Route path="/*" element={  <ProtectRoute> <Users/>  </ProtectRoute> }  />


      
        
    </Routes>
      </div>
    <Footer/>
    
    </>:<>
    <LoadingPage/>
    
    </>}
  
  




    </>
  );
}

export default App;
