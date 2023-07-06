import React from 'react';
import logo from '../../assets/1.png';
import LoginAdminForm from '../../components/admin/login_form_admin';

function LoginAdmin() {
  return (
    <div className="LoginPage">
      <div className="logo">
        <img src={logo} alt="Logo do meu negócio" />
      </div>
      <div className="form-container">
        <LoginAdminForm/>
       
      </div>
    </div>
  );
}

export default LoginAdmin;
