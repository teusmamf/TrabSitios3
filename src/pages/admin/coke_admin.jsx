import React, { useState, useEffect } from "react";
import HomeBar from "../../components/admin/Home_bar_admin";
import ReactModal from "react-modal";
import axios from "axios";

export default function CokeAdmin() {
  const [cokes, setCoke] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nome: "",
    imagens: "",
    preco: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchCoke() {
      try {
        const response = await fetch("http://localhost/API/conexao.php");
        const data = await response.json();
        console.log(data);
        setCoke(data.refrigerantes);

      } catch (error) {
        console.error("Erro ao buscar os refrigerantes:", error);
      }
    }
    fetchCoke();
  }, []);

  const openModal = (refrigerante) => {
    setEditData(refrigerante); // Atualiza o estado editData com os dados da cerveja selecionada
    setModalIsOpen(true);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/API/add_coke.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        console.log('refrigerante adicionado com sucesso');
        setSuccessMessage('refrigerante adicionado com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao adicionar  refrigerantes:', data.message);
      }
    } catch (error) {
      console.error('Erro ao adicionar  refrigerantes:', error);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost/API/edit_coke.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refrigeranteId: editData.id,
          ...editData,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        console.log('refrigerante atualizada com sucesso');
        setSuccessMessage('refrigerante atualizada  com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao atualizar a refrigerante:', data.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar a refrigerante:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/API/delete_coke.php', {
        refrigeranteId: id,
      });
      console.log(response);
      const data = response.data;
      if (data === 'success') {
        console.log('refrigerante deletado com sucesso');
        setSuccessMessage('refrigerante deletado com sucesso');
        setModalIsOpen(false);
        window.location.reload();
      } else {
        console.error('Erro ao deletar a refrigerante:', data);
      }
    } catch (error) {
      console.error('Erro ao deletar a refrigerante:', error);
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
        <h2>{editData.id ? 'Editar refrigerante' : 'Adicionar refrigerante'}</h2>
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

      <h2 className="title_drinks_no_alcool">Bebidas Sem Álcool</h2>
      <HomeBar />
      <table className="table-beers">
        <thead>
        <button className="btn_add_admin" onClick={() => openModal({})}>Adicionar Bebida Sem Álcool</button>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        
        <tbody>
          {cokes.map((coke) => (
            <tr key={coke.id}>
              <td>{coke.nome}</td>
              <td className="price_admin">R${coke.preco}</td>
              <td className="btns_actions_plates_admin">
              <button className="btn_edit_admin" onClick={() => openModal(coke)}>
                Editar
              </button>

                <button className="btn_exclud_admin" onClick={() => handleDelete(coke.id)}>
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
