import React, { useState } from 'react';
import './Login.css';

import api from '../Services/Api';

import logo from '../Assets/logo.png';
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
        _storage.setItem('id', _id);
        _storage.setItem('user', username);
        if (!!_storage.getItem('id'))
            history.push(`/feed/` + _storage.getItem('id'));
        else {
            history.push(`/feed/`);
        }


    }
    return (
        <div className="row h-100 w-100 align-items-center bckgrnd-principal">
            <div className="col-12 d-flex justify-content-center ">
                <div className="row login__pannel">
                    <div className="col-12">

                        <img src={logo} alt="conecta" className="d-block login__logo" />
                    </div>
                    <form className="col-12" onSubmit={handleSubmit}>

                        <div className="form-group d-flex justify-content-center">

                            <input
                                placeholder="Digite seu usuario no Github"
                                value={username} className="form-control login__input"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 form-group d-flex justify-content-center">

                            <button className="login__button form-control" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}