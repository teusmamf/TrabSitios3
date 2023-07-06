import React from "react";
import Navbar from "../components/navbar";
import Pratos from "../components/pratos";

export default function Home(){
    return (
        <div className="Home">
            <div className="navbar--home">
                <Navbar/>
                <div className="image-container"> 
                <h2 className="image-text">Experiencie o Melhor!</h2>
                </div>
                <Pratos/>
            </div>
        </div>
    )
}