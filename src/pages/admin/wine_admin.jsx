import React, { useState, useEffect } from "react";
import HomeBar from "../../components/admin/Home_bar_admin";
import ReactModal from "react-modal";
import axios from "axios";

export default function WinesAdmin() {
  const [vinhos, setVinhos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nome: "",
    imagens: "",
    preco: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchVinhos() {
      try {
        const response = await fetch("http://localhost/API/conexao.php");
        const data = await response.json();
        console.log(data);
        setVinhos(data.vinhos)
        

      } catch (error) {
        console.error("Erro ao buscar os vinhos:", error);
      }
    }
    fetchVinhos();
  }, []);
  console.log(vinhos);
  const openModal = (vinho) => {
    setEditData(vinho); 
    setModalIsOpen(true);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/API/add_wine.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        console.log('vinho adicionado com sucesso');
        setSuccessMessage('vinho adicionado com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao adicionar o vinho:', data.message);
      }
    } catch (error) {
      console.error('Erro ao adicionar o vinho:', error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/API/editWines.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vinhoId: editData.id,
          ...editData,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        console.log('Vinho atualizado com sucesso');
        setSuccessMessage('Vinho atualizado  com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao atualizar o Vinho:', data.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar o Vinho:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/API/deleteWInes.php', {
        vinhoId: id,
      });
      console.log(response);
      const data = response.data;
      if (data === 'success') {
        console.log('Vinho deletada com sucesso');
        setSuccessMessage('Vinho deletada com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao deletar Vinho:', data);
      }
    } catch (error) {
      console.error('Erro ao deletar Vinho:', error);
    }
  };
  const styleModal = {
    content: {
      width: "400px",
      height: "400px",
      margin: "auto"
    }
  };
  return (
    <div>
      <ReactModal style={styleModal} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>{editData.id ? 'Editar Vinho' : 'Adicionar Vinho'}</h2>
        <form onSubmit={editData.id ? handleEdit : handleAdd}>
      
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
            <label>Imagens:</label>
            <input
              type="text"
              value={editData.imagem}
              onChange={(event) =>
                setEditData({ ...editData, imagens: event.target.value })
              }
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              type="text"
              value={editData.preco}
              onChange={(event) =>
                setEditData({ ...editData, preco: event.target.value })
              }
            />
          </div>
          <button  className="btn_save" type="submit">{editData.id ? 'Salvar' : 'Adicionar'}</button>
          <button onClick={() => setModalIsOpen(false)}>Fechar</button>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        
      </ReactModal>

      <h2 className="title_drinks_no_alcool">Tabela de Vinhos</h2>
      <HomeBar />
      <table className="table-beers">
        <thead>
        <button className="btn_add_admin" onClick={() => openModal({})}>Adicionar Vinho</button>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        
        <tbody>
          {vinhos.map((vinho) => (
            <tr key={vinho.id}>
              <td>{vinho.nome}</td>
              <td className="price_admin">R${vinho.preco}</td>
              <td className="btns_actions_plates_admin">
              <button className="btn_edit_admin" onClick={() => openModal(vinho)}>
                Editar
              </button>

                <button className="btn_exclud_admin" onClick={() => handleDelete(vinho.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>

      
    </div>
  );
}
