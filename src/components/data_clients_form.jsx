import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DataClientsForm() {
  const [clientes, setClientes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clienteId = localStorage.getItem("clienteId");
        const response = await axios.post(
          "http://localhost/API/show_clients.php",
          { clientId: clienteId }
        );
        const data = response.data;
        console.log(data);
        
        if (Array.isArray(data)) {
          setClientes(data);
        } else {
          console.error("Os dados retornados não são um array:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente:", error);
      }
    };

    fetchClientData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setEditedData(clientes[0]); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const clienteId = localStorage.getItem("clienteId");
    const updatedData = { ...editedData, clientId: clienteId }; 


    try {
      
      const response = await axios.post(
        "http://localhost/API/updateClients.php",
        updatedData,
      );
      
      if (response.data === "success") {
        setSuccessMessage("Dados atualizados com sucesso!");
        setEditMode(false);
        window.location.reload();
      } else {
        console.error("Erro ao atualizar os dados do cliente:", response.data);
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados do cliente:", error);
    }
  };

  return (
    <div>
      {clientes.length > 0 ? (
        <div className="form_update_cliente">
          <h2>Dados do Cliente</h2>
          <p>Nome: {clientes[0].nome}</p>
          <p>Email: {clientes[0].email}</p>
          <p>User: {clientes[0].user}</p>
          <p>Senha: ****************</p>
          <Link to="/home" className="btn_update_home_final">Ir para Home</Link>
          {editMode ? (
            <div className="div_edit_client">
              <h3>Editar Dados</h3>
              
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={editedData.nome || ""}
                  onChange={handleInputChange}
                />
              </label><br></br>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={editedData.email || ""}
                  onChange={handleInputChange}
                />
              </label><br></br>
              <label>
                User:
                <input
                  type="text"
                  name="email"
                  value={editedData.user || ""}
                  onChange={handleInputChange}
                />
              </label><br></br>
              <label>
                Senha:
                <input
                  type="password"
                  name="email"
                  value={editedData.senha || ""}
                  onChange={handleInputChange}
                />
              </label><br></br>
              <button className="btn_update_clients" onClick={handleSubmit}>Salvar</button>
              <Link to="/home" className="btn_update_home_final">Ir para Home</Link>
            </div>
          ) : (
            <button  className="btn_update_clients"  onClick={handleEdit}>Editar Dados</button>
          )}
          {successMessage && <p>{successMessage}</p>}
        </div>
      ) : (
        <p>Dados do cliente não encontrados.</p>
      )}
    </div>
  );
}
