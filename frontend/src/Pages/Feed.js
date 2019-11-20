import React, { useEffect, useState } from 'react';
import './Feed.css';

import api from '../Services/Api';

import logo from '../Assets/login.png';

export default function Feed({match}) {
    const [interests, setInterests] = useState('');

    useEffect(() => {
        async function loadInterests() {
            const response = await api.get('/listInterests', {
                headers: {
                    user: match.params.id,
                   /* user: '5dbe1b481dff6417a107538e',*/
                }
            });
            setInterests(response.data.interests);
        }
        loadInterests();
    },[match.params.id]);
    return (
        <div className="feed-container" >
            <img src={logo} alt="conecta" />
            <ul>
                {interests && interests.length > 0 ? (interests.map(i => (
                    <li>
                        <img src={i.user.avatar} alt="" /> 
                        <footer>
                            <strong>{i.user.user}</strong>
                            <p>Você quer {i.TypeInterest !== true ? `Ensinar` : `Aprender` } {i.interest} </p>
                        </footer>
                        <div className="buttons" >
                            <button type="button" >Ensinar</button>
                            <button type="button" >Aprender</button>
                        </div>
                    </li>
                )) ) : (<div>Fudeu</div>) }
            </ul>
        </div>
    )
}