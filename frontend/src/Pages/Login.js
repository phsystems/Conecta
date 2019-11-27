import React, { useState } from 'react';
import './Login.css';

import api from '../Services/Api';

import logo from '../Assets/Logotipo.png';
import CadastroInteresse from './CadastroInteresse';

export default function Login({ history }) {
    const [username, setUsername] = useState('');
   

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post('/devs', {
            username,
        });
        const { _id } = response.data;
        const _storage = window.localStorage;
        _storage.setItem('id',_id);

        history.push(`/dev/${_id}`);

    
    }
    return (
        <div className="row h-100 align-items-center bckgrnd-principal">
            <div className="col-md-6 offset-3 pannel-login bg-danger " >
                <form onSubmit={handleSubmit}>
                   <div className="row">
            <div className="col-md-12 justify-content-center">

                       <img src={logo} alt="conecta" />
            </div>

            <div className="col-md-12">

                    <input
                        placeholder="Digite seu usuario no Github"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
            </div>
                       </div> 
                    <button type="submit">Enviar</button>
                </form>
            </div>
           
        </div>
    );
}