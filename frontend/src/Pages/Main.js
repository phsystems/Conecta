import  React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';   

import api from '../Services/Api'
import logo from '../Assets/login.png';
import conected from '../Assets/eita.png';


export default function Main({match}){
    
    const [users, setUsers] = useState([]);
    const [conectDev, setConectDev] = useState(null);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('./devs',{
                headers:{
                    user: match.params.id,
                }
            });
            setUsers(response.data);
            console.log(response)
        }
       loadUsers(); 
    }, [match.params.id]);

    useEffect(() => {
        const socket = io.connect('http://localhost:3333', {
            query: {user: match.params.id}
        });
        socket.on('match', dev => {
            setConectDev(dev);
        })
    }, [match.params.id]);

    async function handleTeach(id){
        await api.post(`/devs/${id}/Teach`, null, {
            headers: { user: match.params.id},
        })
        setUsers(users.filter(user => user._id !== id)); 
    }
    async function handleLearn(id){
        await api.post(`/devs/${id}/Learn`, null, {
            headers: { user: match.params.id},
        })
        setUsers(users.filter(user => user._id !== id));          
    }
    return (
    <div className= "main-container">
        <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
        <Link to="/">
            
        <img src={logo} alt="conecta"/>
        </Link>
            { users.length > 0 ? (
                <ul>   
                    {users.map(user => (
                    <li key={user._id} >
                    <img src= {user.avatar} alt={user.name}/>
                    <footer>
                        <strong>{user.name}</strong>
                        <p>{user.bio}</p>
                    </footer>
                 </li>
                ))}                   
                </ul>
            ): (
            <div className="empty">Não Hà Interesses :( </div> 
            ) } 

            {conectDev && (
             <div className="conect-containe" >
                <img src={conected}   alt= "conected" /> 
                <img ClassName="Avatar" src={conectDev.avatar} alt=""/>
                <strong>{conectDev.name}</strong>
                <p>{conectDev.bio}</p>

                <button type="button" onClick={() => setConectDev(null)} >Fechar</button>
            </div>  
            )}
    </div>
    )
}