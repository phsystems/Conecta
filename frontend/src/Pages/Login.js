import React, { useState } from 'react';
import './Login.css'; 

import api from '../Services/Api';

import logo from '../Assets/login.png';

export default function Login({ history }){
    const [ username , setUsername ] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const response = await api.post('/devs', {
            username,
        });
        const { _id } = response.data;  
        history.push(`/dev/${_id}`);
    }
    return(
        <div className= "login-container">
            <form onSubmit={handleSubmit}>
                <img src = {logo} alt = "conecta"/>
                <input 
                    placeholder= "Digite seu usuario no Github" 
                    value={username}
                    onChange={ e => setUsername(e.target.value)}
                />
                <button type= "submit">Enviar</button>
            </form>
        </div>
    );
}