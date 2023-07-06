import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState(null);

useEffect(() => {
  var auth = localStorage.getItem('authenticated');
  var name = localStorage.getItem('nome');
  var clienteId = localStorage.getItem('clienteId');
  setId(clienteId);
  setIsLoggedIn(auth);
  setName(name);
  console.log(name);
  console.log(clienteId);

}, []);
  

const hangleLogOut = () => {
  localStorage.setItem('authenticated', 'false'); // ou remova o item se estiver usando outro valor
  localStorage.setItem('nome', '');
  localStorage.setItem('clienteId', '');
  setIsLoggedIn(false);
  setName('');
}


  return (
    <nav>
      <ul className='navbar_information'>
        <li className='btns_navbar'>
          <Link to="/Drinks">Peça Agora</Link>
        </li>
        <li className='btns_navbar'>
        <Link to="/aboutus">Sobre Nós</Link>
        </li>
        {isLoggedIn === 'true' ? (
          <div className='div_logado_name'>
            <span>Bem vindo {name}</span>
          <li className='btns_navbar'>
              <Link to="/showOrder">Pedidos</Link>
          </li>
          <li className='btns_navbar'>
          <Link to="/dataClients">Dados</Link>
          </li>
          <li>
          <button onClick={hangleLogOut}>Logout</button>
        </li>
          </div>
        ) : (
          <li className='btns_navbar'>
            <Link to="/login" >Login</Link>
          </li>
          
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
