import React, { useEffect, useState } from "react";
import LoginPage from "./Login_page";
import SignUpPage from './SignUpPage';
import Home from "./Home";
import Order from "./Order";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Drinks from "./Drinks";
import ClientsOrder from "./clients_order";
import DataClients from "./data_clients";
import AboutUs from "./Aboutus";
import LoginAdmin from "./admin/login_admin";
import HomeAdmin from "./admin/Home_Admin";
import BeerAdmin from "./admin/beerAdmin";
import WinesAdmin from "./admin/wine_admin";
import PlatesAdmin from "./admin/plates_admin";
import CokeAdmin from "./admin/coke_admin";
import ClientsAdmin from "./admin/clients_admin";
import ClientsOrderAdmin from "./admin/orders_clients_admin";



export default function App(){
  
  
    
                
    return (
        
        <Router>
        <Routes>
          <Route path="/clientsAdmin" element={<ClientsAdmin/>}></Route>
          <Route path="/winesAdmin" element={<WinesAdmin/>}></Route>
          <Route path="/homeAdmin" element={<HomeAdmin/>}></Route>
          <Route path="/beerAdmin" element={<BeerAdmin/>}></Route>
          <Route path="/platesAdmin" element={<PlatesAdmin/>}></Route>
          <Route path="/LoginAdmin" element={<LoginAdmin/>}></Route>
          <Route path="/cokeAdmin" element={<CokeAdmin/>}></Route>  
          <Route path="/ordersAdmin" element={<ClientsOrderAdmin/>}></Route>  


          <Route path="/aboutus" element={<AboutUs/>}></Route>
          <Route path="/showOrder" element={<ClientsOrder/>}> </Route>
          <Route path="/dataClients" element={<DataClients/>}></Route>
          <Route path="/Order" element={<Order />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/Drinks" element={<Drinks />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>

    )
}