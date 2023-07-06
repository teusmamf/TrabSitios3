import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Drinks() {
  const [pratosSelecionados, setPratosSelecionados] = useState([]);
  const [pratos, setPratos] = useState([]);
  const [sobremesas, setSobremesas] = useState([]);
  const [beers, SetBeers] = useState([]);
  const [wines, setWines] = useState([]);
  const [coke, setCoke] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [nomeCliente , SetNomecliente] = useState("");
  const [pedido, setPedido] = useState({
    pratos: [],
    bebidas: [],
    clienteId: null,
    nomeCliente:"",
    precos: 0,
  });

 
 
  useEffect(() => {
    const idCliente = localStorage.getItem("clienteId");
    setClienteId(idCliente);

    const nomeClient = localStorage.getItem("nome");
    SetNomecliente(nomeClient);
  }, []);

  useEffect(() => {
    setPedido((prevState) => ({
      ...prevState,
      clienteId: clienteId,
      nomeCliente:nomeCliente
    }));
  }, [clienteId,nomeCliente]);

  useEffect(() => {
    async function fetchPratos() {
      try {
        const response = await fetch("http://localhost/API/conexao.php");
        const data = await response.json();
        console.log(data);
        setPratos(data.pratos);
        setSobremesas(data.sobremesas);
        SetBeers(data.cervejas);
        setWines(data.vinhos);
        setCoke(data.refrigerantes);

      } catch (error) {
        console.error("Erro ao buscar os pratos:", error);
      }
    }
    fetchPratos();
  }, []);

 

  const adicionarPrato = (prato) => {
    const nomePrato = prato.nome;
    if (pratosSelecionados.includes(prato)) {
      setPratosSelecionados(pratosSelecionados.filter((item) => item !== prato));
    } else {
      setPratosSelecionados([...pratosSelecionados, prato]);
    }
    setPedido((prevPedido) => ({
      ...prevPedido,
      pratos: [...prevPedido.pratos, nomePrato],
    }));
  };

  const adicionarBebida = (bebida) => {
    const nomeBebida = bebida.nome;
    if (pratosSelecionados.includes(bebida)) {
      setPratosSelecionados(pratosSelecionados.filter((item) => item !== bebida));
    } else {
      setPratosSelecionados([...pratosSelecionados, bebida]);
    }
    setPedido((prevPedido) => ({
      ...prevPedido,
      bebidas: [...prevPedido.bebidas, nomeBebida],
    }));
  };

  console.log(pedido);



  const handleOrder = async () => {
    const pratosSelecionadosPrecos = pratosSelecionados.map((prato) => parseFloat(prato.preco));
    const valorTotal = pratosSelecionadosPrecos.reduce((acc, curr) => acc + curr, 0);
  
    const updatedPedido = {
      ...pedido,
      precos: valorTotal,
    };
  
    try {
      await setPedido(updatedPedido); // Aguarda a atualização do estado pedido
      await axios.post("http://localhost/API/saveOrder.php", updatedPedido, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Pedido salvo com sucesso!");
      console.log(updatedPedido);
      // Limpa o estado pedido
      setPedido({
        pratos: [],
        bebidas: [],
        clienteId: null,
        precos: 0,
      });
      window.location.reload()
    } catch (error) {
      console.error("Erro ao salvar o pedido:", error);
    }
  };
  


  return (
    <div>
      <div className="menu_foods_title">
      <h2>Cardápio</h2>
      </div>
      <div>
        <h2 className="title_plates_order">Pratos Principais</h2>
        <div className="pratos_container_order">
          {pratos.map((prato, index) => (
            <div
              key={index}
              className={`single_plate_order ${pratosSelecionados.includes(prato) ? "selected" : ""}`}
              onClick={() => adicionarPrato(prato)}
            >
              <img src={prato.imagens} alt={prato.nome} className="img_plate_order" />
              <h3>{prato.nome}</h3>
              <h5>R${prato.preco}</h5>
            </div>
          ))}
        </div>
        <h2 className="title_plates_order">Sobremesas</h2>
        <div className="container_desserts">
          {sobremesas.map((sob, index) => (
            <div
              key={index}
              className={`single_dessert_order ${pratosSelecionados.includes(sob) ? "selected" : ""}`}
              onClick={() => adicionarPrato(sob)}
            >
              <img src={sob.imagens} alt={sob.nome} className="img_dessert_order" />
              <h3>{sob.nome}</h3>
              <h5>R${sob.preco}</h5>
            </div>
          ))}
        </div>
      </div>
      <div className="titles_drinks">
        <h2>Vinhos</h2>
      </div>
      <div className="wines_container">
        {wines.map((wine, index) => (
          <div
            key={index}
            className={`wines_card ${pratosSelecionados.includes(wine) ? "selected" : ""}`}
            onClick={() => adicionarBebida(wine)}
          >
            <img src={wine.imagem} alt={wine.nome} className="img_wine_drinks" />
            <h3>{wine.nome}</h3>
            <h5>R${wine.preco}</h5>
          </div>
        ))}
      </div>
      <div className="titles_beers">
        <h2>Cervejas</h2>
      </div>
      <div className="beer_container">
        {beers.map((beer, index) => (
          <div
            key={index}
            className={`beer_card ${pratosSelecionados.includes(beer) ? "selected" : ""}`}
            onClick={() => adicionarBebida(beer)}
          >
            <img src={beer.imagem} alt={beer.nome} className="img_beer_drinks" />
            <h3>{beer.nome}</h3>
            <h5>R${beer.preco}</h5>
          </div>
        ))}
      </div>
      <div className="titles_cokes">
        <h2>Bebidas sem álcool</h2>
      </div>
      <div className="cokes_container">
        {coke.map((coke, index) => (
          <div
            key={index}
            className={`cokes_card ${pratosSelecionados.includes(coke) ? "selected" : ""}`}
            onClick={() => adicionarBebida(coke)}
          >
            <img src={coke.imagem} alt={coke.nome} className="img_cokes_drinks" />
            <h3>{coke.nome}</h3>
            <h5>R${coke.preco}</h5>
          </div>
        ))}
      </div>
      <div className="container_btn_order_final">
      <button className="btn_order_final" onClick={handleOrder}>Fechar Pedido</button>
      <Link to="/home" className="btn_order_final">Ir para Home</Link>
      </div>
      
    </div>
  );
}
