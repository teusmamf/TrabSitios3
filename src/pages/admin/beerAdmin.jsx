import React, { useState, useEffect } from "react";
import HomeBar from "../../components/admin/Home_bar_admin";
import ReactModal from "react-modal";
import axios from "axios";

export default function beerAdmin() {
  const [cervejas, setCervejas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nome: "",
    imagens: "",
    preco: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchCervejas() {
      try {
        const response = await fetch("http://localhost/API/conexao.php");
        const data = await response.json();
        console.log(data);
        setCervejas(data.cervejas);

      } catch (error) {
        console.error("Erro ao buscar os cervejas:", error);
      }
    }
    fetchCervejas();
  }, []);

  const openModal = (cerveja) => {
    setEditData(cerveja); // Atualiza o estado editData com os dados da cerveja selecionada
    setModalIsOpen(true);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/API/add_beer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        console.log('cerveja adicionado com sucesso');
        setSuccessMessage('cerveja adicionado com sucesso');
        window.location.reload();
        setModalIsOpen(false);
        
      } else {
        console.error('Erro ao adicionar a cerveja:', data.message);
      }
    } catch (error) {
      console.error('Erro ao adicionar a cerveja:', error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/API/edit_beer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cervejaId: editData.id,
          ...editData,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        console.log('Cerveja atualizada com sucesso');
        setSuccessMessage('Cerveja atualizada  com sucesso');
       
        setModalIsOpen(false);
       
      } else {
        console.error('Erro ao atualizar a cerveja:', data.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar a cerveja:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/API/delete_beer.php', {
        cervejaId: id,
      });
      console.log(response);
      const data = response.data;
      if (data === 'success') {
        console.log('Cerveja deletada com sucesso');
        setSuccessMessage('Cerveja deletada com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao deletar a cerveja:', data);
      }
    } catch (error) {
      console.error('Erro ao deletar a cerveja:', error);
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
        <h2>{editData.id ? 'Editar Cerveja' : 'Adicionar Cerveja'}</h2>
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

      <h2 className="title_drinks_no_alcool">Tabela de Cervejas</h2>
      <HomeBar />
      <table className="table-beers">
        <thead>
        <button className="btn_add_admin" onClick={() => openModal({})}>Adicionar Cerveja</button>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        
        <tbody>
          {cervejas.map((cerveja) => (
            <tr key={cerveja.id}>
              <td>{cerveja.nome}</td>
              <td className="price_admin">R${cerveja.preco}</td>
              <td className="btns_actions_plates_admin">
              <button className="btn_edit_admin" onClick={() => openModal(cerveja)}>
                Editar
              </button>

                <button className="btn_exclud_admin" onClick={() => handleDelete(cerveja.id)}>
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
