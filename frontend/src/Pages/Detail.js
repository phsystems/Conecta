import  React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Detail.css'; 

import naruto from '../Assets/naruto.png';

import api from '../Services/Api'
import logo from '../Assets/login.png';

export default function Detail({match}){  
    const[ users, setUser] = useState([])
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
            Headers: {
                user: match.params.id
            }
            });
        }
       loadUsers()
    },[match.params.id]);
    return (
    <div className= "Detail-container">
        <img src={logo} alt="conecta"/>       
            <ul>   
                <li>
                <img src= {naruto} alt=""/>
                <footer>
                    <strong>Naruto</strong>
                    <p>Lutador</p>
                </footer>
             </li>                 
            </ul>
            <div className = "buttons" >
                    <button type = "button">Teach</button>
                    <button type = "button">Learn</button>
            </div>
    </div>
    )
}