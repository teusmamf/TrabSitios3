import React, { useEffect, useState } from "react";
import HomeBar from "../../components/admin/Home_bar_admin";
import axios from "axios";
import ReactModal from "react-modal";

export default function ClientsAdmin() {
  const [clients, setClients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clientId, SetclienteId] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    nome: "",
    email: "",
    user: "",
    senha: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.post("http://localhost/API/conexao.php");
        const data = response.data.clientes;
        const storedClientId = localStorage.getItem("clienteId");
        SetclienteId(storedClientId);

        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.error("Os dados retornados não são um array:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar os clientes:", error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();

    const updatedData = { ...editData, clientId: editData.id };

    try {
      const response = await axios.post(
        "http://localhost/API/updateClients.php",
        updatedData
      );

      if (response.data === "success") {
        setSuccessMessage("Dados atualizados com sucesso!");
        setEditMode(false);
      } else {
        console.error("Erro ao atualizar os dados do cliente:", response.data);
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados do cliente:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost/API/delete_clientes.php",
        {
          ClientId: id,
        }
      );

      const data = response.status;
      if (data === "success") {
        console.log("Cliente deletado com sucesso");
        setModalIsOpen(false);
      } else {
        console.error("Erro ao deletar o Cliente:", data);
      }
    } catch (error) {
      console.error("Erro ao deletar o Cliente:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost/API/download_clients.php",
        {
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "clients.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao fazer o download da tabela de clientes:", error);
    }
  };

  const styleModal = {
    content: {
      width: "400px",
      height: "400px",
      margin: "auto",
    },
  };

  const openModal = (client) => {
    setEditData(client);
    setModalIsOpen(true);
  };

  return (
    <div>
      <ReactModal
        style={styleModal}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h2>{editData.id ? "Editar Cliente" : ""}</h2>
        <form onSubmit={editData.id ? handleEdit : ""}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={editData.nome}
              onChange={(event) =>
                setEditData({ ...editData, nome: event.target.value })
              }
            />
          </div>
          <div>
            <label>Email</label>
            <input
              value={editData.email}
              onChange={(event) =>
                setEditData({ ...editData, descricao: event.target.value })
              }
            />
          </div>
          <div>
            <label>Usuário</label>
            <input
              type="text"
              value={editData.user}
              onChange={(event) =>
                setEditData({ ...editData, imagens: event.target.value })
              }
            />
          </div>
          <div>
            <label>Senha</label>
            <input
              type="text"
              value={editData.senha}
              onChange={(event) =>
                setEditData({ ...editData, preco: event.target.value })
              }
            />
          </div>
          <button className="btn_save" type="submit">
            {editData.id ? "Salvar" : ""}
          </button>
          <button onClick={() => setModalIsOpen(false)}>Fechar</button>
        </form>
      </ReactModal>

      <h2 className="clients_admin_title">Tabela de Clientes</h2>
      <button className="btn_download_admin" onClick={handleDownload}>
          Exportar como csv
        </button>
      <HomeBar />
      <div className="clients-admin-container">
        <table className="table-clients">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Username</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.nome}</td>
                <td>{client.email}</td>
                <td className="price_admin">{client.user}</td>
                <td className="price_admin">{client.senha}</td>
                <td className="btns_actions_plates_admin">
                  <button
                    className="btn_edit_admin"
                    onClick={() => openModal(client)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn_exclud_admin"
                    onClick={() => handleDelete(client.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
    </div>
  );
}
