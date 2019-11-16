import  React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Detail.css'; 

import naruto from '../Assets/naruto.png';

import api from '../Services/Api'
import logo from '../Assets/login.png';

export default function Detail({match}){  
    const [interests, setInterestsUser] = useState('');
    useEffect(() => {
        async function loadInterestsUser(){
            const response = await api.get('/devs', {
            Headers: {
                user: match.params.id
            }
        });
        setInterestsUser(response.data.interests);
    }
    loadInterestsUser();
},[match.params.id]);
    return (
        <div className= "Detail-container">
            <img src={logo} alt="conecta" />
            <ul>
                <li key={interests._id} >
                    <img src= {interests.avatar} alt={interests.name}/>
                    <footer>
                        <strong>{interests.name}</strong>
                        <p>{interests.bio}</p>
                    </footer>
                 </li>
                {interests && interests.length > 0 ? (interests.map(i => (
                    <li>
                        
                            <p>Você quer {i.TypeInterest != true ? `Ensinar` : `Aprender` } {i.interest} </p>
                        
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