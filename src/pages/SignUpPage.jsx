import React from "react";
import SignUp from "../components/SignUpfom";
import logo from '../assets/1.png';

export default function SignUpPage(){
    return (
        <div className="SignUpPage">
             <div className="logo">
                <img src={logo} alt="Logo do meu negócio" />
        </div>
        <div className="form-SignUp-container">
            <SignUp/>
        </div>
        </div>
    )

}