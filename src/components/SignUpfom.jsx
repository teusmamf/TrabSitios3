import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !username || !password) {
      console.error('Todos os campos são obrigatórios!');
      return;
    }
    // Dados do novo usuário
    const userData = {
      name: name,
      email: email,
      username: username,
      password: password
    };
    console.log(userData);
    
    // Envia a requisição POST para criar o usuário
    axios.post('http://localhost:80/API/createUser.php', userData)
      .then((response) => {
        console.log('Usuário criado com sucesso!');
        // Limpa os campos do formulário
        setName('');
        setEmail('');
        setUsername('');
        setPassword('');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
      });
  }
  
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
