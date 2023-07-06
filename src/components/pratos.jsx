import React, { useState, useEffect } from "react";
import $ from "jquery"; // Importe a biblioteca jQuery
import imagens from "../assets/imagens";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function Pratos(props) {
  const [pratos, setPratos] = useState([]);
  
  useEffect(() => {
    async function fetchPratos() {
      try {
        const response = await fetch("http://localhost/API/conexao.php");
        const data = await response.json();
        setPratos(data.pratos);
      } catch (error) {
        console.error("Erro ao buscar os pratos:", error);
      }
    }
    fetchPratos();
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4
  };
  
  return (
    <div>
      <h2>Pratos</h2>
      <div className="pratos_container">
      <Slider {...settings}>
          {pratos.map((prato, index) => (
            
            <div key={index} className="single_plate">
             <img src={prato.imagens} alt={prato.nome} className="img_plate"/>
              <h3>{prato.nome}</h3>
              <p>{prato.descricao}</p>
              
            </div>
          ))}
        </Slider>
          
       </div>
     
    </div>
  );
}
