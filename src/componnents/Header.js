import React from "react";
import './header.css'
import logo from '../images/logo_netflix.png'
import usuario from '../images/usuario.png'

export default  ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="logo netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="">
                    <img src={usuario} alt="Usuario" />
                </a>
            </div>
        </header>
    )
}