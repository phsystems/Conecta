import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import Menu from './Menu';

import api from '../Services/Api'
import logo from '../Assets/login.png';
import conected from '../Assets/eita.png';


export default function Main({ match }) {

    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Document</title>
            </head>
            <body>
                <div className="bckgrnd-principal position-relative h-100">
                    <div className="container feed__container">
                        <Menu></Menu>
                        <div className="feed-container text-white">
                            <div className="col-12">
                                <h1>Work in progress..</h1>
                            </div>
                            {/* <div className="main-container">
                    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
                    <Link to="/">

                        <img src={logo} alt="conecta" />
                    </Link>
                    {users.length > 0 ? (
                        <ul>
                            {users.map(user => (
                                <li key={user._id} >
                                    <img src={user.avatar} alt={user.name} />
                                    <footer>
                                        <strong>{user.name}</strong>
                                        <p>{user.bio}</p>
                                    </footer>
                                </li>
                            ))}
                        </ul>
                    ) : (
                            <div className="empty">Não Hà Interesses :( </div>
                        )}

                    {conectDev && (
                        <div className="conect-containe" >
                            <img src={conected} alt="conected" />
                            <img ClassName="Avatar" src={conectDev.avatar} alt="" />
                            <strong>{conectDev.name}</strong>
                            <p>{conectDev.bio}</p>

                            <button type="button" onClick={() => setConectDev(null)} >Fechar</button>
                        </div>
                    )}
                </div> */}
                        </div>
                    </div>
                </div>

            </body>
        </html>
    )
}