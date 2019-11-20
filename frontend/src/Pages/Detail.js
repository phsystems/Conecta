import  React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Detail.css'; 

import naruto from '../Assets/naruto.png';

import api from '../Services/Api'
import logo from '../Assets/login.png';

export default function Detail({match}){  
    const [interests, setInterestsUser] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function loadInterestsUser(){
            const response = await api.get('/devs/interests/' + match.params.id);
            console.log(response);
        setInterestsUser(response.data);
    }
    loadInterestsUser();
},[match.params.id]);
    
    useEffect(() => {
        async function loadUsers(){
            const resp = await api.get('./devs/detailsUser/'+match.params.id,{
                headers:{
                    userId: match.params.id,
                }
            });
            console.log(resp);

            setUsers(resp.data);
        }
       loadUsers(); 
}, [match.params.id]); 
    return (
        <div className= "Detail-container">
            <img src={logo} alt="conecta" />
            <ul>
                <li>
                    <img src= {users.avatar} alt={users.name}/>
                    <footer>
                        <strong>{users.name}</strong>
                        <p>{users.bio}</p>
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