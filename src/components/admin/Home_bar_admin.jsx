import React from "react";
import { Link } from "react-router-dom";




export default function HomeBar(){
    return (
        <div>
            <div className="homebar_admin">
            <h2>Produtos</h2>
            <Link to="/platesAdmin">Pratos</Link>
            <Link to="/winesAdmin">Vinhos</Link>
            <Link to="/beerAdmin">Cervejas</Link>
            <Link to="/cokeAdmin">Bebidas sem Álcool</Link>

            <h2>Clientes</h2>
            <Link to="/clientsAdmin">Usuários Clientes</Link>
            <Link to="/ordersAdmin">Pedidos Clientes</Link>
            </div>
        </div>
    )
}