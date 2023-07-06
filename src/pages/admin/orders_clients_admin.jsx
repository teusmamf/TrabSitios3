import React, { useEffect, useState } from "react";
import HomeBar from "../../components/admin/Home_bar_admin";
import axios from "axios";




export default function ClientsOrderAdmin(){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchPratos() {
          try {
            const response = await fetch("http://localhost/API/conexao.php");
            const data = await response.json();
            setOrders(data.pedidos);
            console.log(data.pedidos);
          } catch (error) {
            console.error("Erro ao buscar os pratos:", error);
          }
        }
        fetchPratos();
      }, []);
    

      const handleDelete = async (id) => {
        try {
          const response = await axios.post('http://localhost/API/delete_orders.php', {
            orderId: id,
          });
          console.log(response);
          const data = response.data;
          if (data === 'success') {
            console.log('pedido deletado com sucesso');
            window.location.reload();
          } else {
            console.error('Erro ao deletar a cerveja:', data);
          }
        } catch (error) {
          console.error('Erro ao deletar a cerveja:', error);
        }
      };

      const handleDownload = async () => {
        try {
          const response = await axios.get(
            "http://localhost/API/download_pedidos.php",
            {
              responseType: "blob",
            }
          );
    
          const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", "orders.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error("Erro ao fazer o download da tabela de clientes:", error);
        }
      };

console.log(orders);

    return (
       <div>
        <div>

      <h2 className="title_drinks_no_alcool">Pedidos</h2>
      <button className="btn_download_admin" onClick={handleDownload}>
      Exportar como csv
        </button>
      <HomeBar />
      <table className="table_orders_admin">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Pratos</th>
            <th>Bebidas</th>
            <th>Preço</th>
          </tr>
        </thead>
        
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.nomeCliente}</td>
              <td>{order.pratos}</td>
              <td>{order.bebidas}</td>
              <td className="price_admin">R${order.precos}</td>
              <td>
                <button className="btn_exclud_admin" onClick={() => handleDelete(order.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>

      
    </div>
       </div> 
       )
}