import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ClientsOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const clienteId = localStorage.getItem("clienteId");
        const response = await axios.post("http://localhost/API/showOrders.php", { clientId: clienteId });
        const data = response.data;
        console.log(data);
        setOrders(data);
        if (Array.isArray(data)) {
         
        } else {
          console.error("Os dados retornados não são um array:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="your_orders_title">
        <h2>Seus Pedidos</h2>
        <Link to="/home" className="btn_order_clients_showing_final">Ir para Home</Link>
      </div>
      <div className="container_showing_orders">
        <table className="table_showing_orders_clients">
          <thead>
            <tr>
              <th>N° pedido</th>
              <th>Pratos</th>
              <th>Bebidas</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.pratos}</td>
                <td>{order.bebidas}</td>
                <td>R${order.precos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
