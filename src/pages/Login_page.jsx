import React from 'react';
import Login from '../components/login_form';
import logo from '../assets/1.png';

function LoginPage() {
  return (
    <div className="LoginPage">
      <div className="logo">
        <img src={logo} alt="Logo do meu negócio" />
      </div>
      <div className="form-container">
        <Login/>
       
      </div>
    </div>
  );
}

export default LoginPage;
