import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginAdminForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Dados do formulário de login
    const loginData = {
      username: username,
      password: password
    };
  
    console.log(loginData); // Verifique se os dados estão corretos antes de enviar a requisição
  
    axios.post('http://localhost:80/API/login_admin.php', loginData)
    .then((response) => {
      if (response.data.Status === 200) {
        window.location.href = '/homeAdmin';
        window.localStorage.setItem('nome', response.data.name);
        window.localStorage.setItem('userId', response.data.id);
        window.localStorage.setItem('authenticated', 'true');
        console.log(response.data);
      } else {
        alert('Invalid User');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setError('Ocorreu um erro ao processar a solicitação');
    });
  
  }
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="btns_login_form">
          <button type="submit">Entrar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
      <label htmlFor="">ainda não possui uma conta?</label>
      <Link to="/signup" className="link_to_signup">
        Criar conta
      </Link>
    </div>
  );
}

export default LoginAdminForm;
