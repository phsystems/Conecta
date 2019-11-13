import  React, {useEffect, useState} from 'react';
import './Feed.css';   

import logo from '../Assets/login.png';
import naruto from '../Assets/naruto.png';
import kakashi from '../Assets/kakashi.jpeg';
import neji from '../Assets/neji.jpeg';
import sakura from '../Assets/sakura.jpeg';
import Sasuke from '../Assets/Sasuke.jpeg';

export default function Feed(){
    const [users, setUsers] = useState('');

    return (
    <div className= "feed-container">
        <img src={logo} alt="conecta"/>   
            <ul>   
                 <li>
                 <img src={naruto} alt=""/>
                 <footer>
                     <strong>Naruto</strong>
                     <p> Quer Ensinar: Java Script Para Você!!</p>
                 </footer>
                 <div className = "buttons" >
                     <button type = "button" >Ensinar</button>
                     <button type = "button" >Aprender</button>
                 </div>
                </li>   
                <li>
                 <img src={kakashi} alt=""/>
                 <footer>
                     <strong>Kakashi</strong>
                     <p>Quer Prender: Jutsu de Invocação Com Você</p>
                 </footer>
                 <div className = "buttons" >
                     <button type = "button" >Ensinar</button>
                     <button type = "button" >Aprender</button>
                 </div>
                </li>
                <li>
                 <img src={neji} alt=""/>
                 <footer>
                     <strong>Neji</strong>
                     <p>Quer Prender: Pagode Com Você</p>
                 </footer>
                 <div className = "buttons" >
                     <button type = "button" >Ensinar</button>
                     <button type = "button" >Aprender</button>
                 </div>
                </li>
                <li>
                 <img src={sakura} alt=""/>
                 <footer>
                     <strong>Sakura</strong>
                     <p>Quer Ensinar: Mandarim Para Você</p>
                 </footer>
                 <div className = "buttons" >
                     <button type = "button" >Ensinar</button>
                     <button type = "button" >Aprender</button>
                 </div>
                </li>
                <li>
                 <img src={Sasuke} alt=""/>
                 <footer>
                     <strong>Sasuke</strong>
                     <p>Quer Ensinar: Jutsu Bola de Fogo Para Você !!</p>
                 </footer>
                 <div className = "buttons" >
                     <button type = "button" >Ensinar</button>
                     <button type = "button" >Aprender</button>
                 </div>
                </li>             
            </ul>        
    </div>
    )
}