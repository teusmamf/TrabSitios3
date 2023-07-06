import React, { useState, useEffect } from "react";
import HomeBar from "../../components/admin/Home_bar_admin";
import ReactModal from "react-modal";
import axios from "axios";

export default function PlatesAdmin() {
  const [pratos, setPratos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userId , SetUserId] = useState('');
  const [editData, setEditData] = useState({
    id: "",
    nome: "",
    descricao: "",
    imagens: "",
    preco: "",
    userId:"",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchPratos() {
      try {
        const response = await fetch("http://localhost/API/conexao.php");
        const data = await response.json();
        console.log(data);
        setPratos(data.pratos);
        
      } catch (error) {
        console.error("Erro ao buscar os pratos:", error);
      }
    }
    fetchPratos();
  }, []);

  const openModal = (prato) => {
    setEditData(prato);
    setModalIsOpen(true);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
  
    const idUser = window.localStorage.getItem('userId');
    const dataWithUserId = { ...editData, userId: idUser };
    console.log(dataWithUserId);
  
    try {
      const response = await fetch('http://localhost/API/add_plate.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithUserId),
      });
  
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Prato adicionado com sucesso');
        setSuccessMessage('Prato adicionado com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao adicionar o prato:', data.message);
      }
    } catch (error) {
      console.error('Erro ao adicionar o prato:', error);
    }
  };
  
  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/API/editPratos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pratoId: editData.id,
          ...editData,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        console.log('Prato atualizado com sucesso');
        setSuccessMessage('Prato atualizado com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao atualizar o prato:', data.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar o prato:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/API/delete_plates.php', {
        pratoId: id,
      });
      console.log(response);
      const data = response.data;
      if (data === 'success') {
        console.log('Prato deletado com sucesso');
        setSuccessMessage('Prato deletado com sucesso');
        setModalIsOpen(false);
        
      } else {
        console.error('Erro ao deletar o prato:', data);
      }
    } catch (error) {
      console.error('Erro ao deletar o prato:', error);
    }
  };
  const styleModal = {
    content: {
      width: "400px",
      height: "400px",
      margin: "auto"
    }
  };

  function handleClose(){
    setModalIsOpen(false)
    window.location.reload;
  }
  return (
    <div>
      <ReactModal style={styleModal} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>{editData.id ? 'Editar Prato' : 'Adicionar Prato'}</h2>
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
            <label>Descrição:</label>
            <input
              value={editData.descricao}
              onChange={(event) =>
                setEditData({ ...editData, descricao: event.target.value })
              }
            />
          </div>
          <div>
            <label>Imagens:</label>
            <input
              type="text"
              value={editData.imagens}
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
          <button onClick={handleClose}>Fechar</button>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        
      </ReactModal>

      <h2 className="title_drinks_no_alcool">Tabela de Pratos</h2>
      <HomeBar />
      <table className="table_plates_admin">
        <thead>
        <button className="btn_add_admin" onClick={() => openModal({})}>Adicionar Prato</button>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        
        <tbody>
          {pratos.map((prato) => (
            <tr key={prato.id}>
              <td>{prato.nome}</td>
              <td>{prato.descricao}</td>
              <td className="price_admin">R${prato.preco}</td>
              <td className="btns_actions_plates_admin">
                <button className="btn_edit_admin" onClick={() => openModal(prato)}>
                  Editar
                </button>
                <button className="btn_exclud_admin" onClick={() => handleDelete(prato.id)}>
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
