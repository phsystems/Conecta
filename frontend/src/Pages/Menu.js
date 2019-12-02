import  React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Menu.css';   
import api from '../Services/Api'
import logo from '../Assets/login.png';
import conected from '../Assets/eita.png';
import { DropdownDivider } from 'react-bootstrap/Dropdown';


export default function Menu({}){
        
    
    return (
    <>
        <div className="menu__hamburger position-relative">
            <i className="fa fa-bars text-white menu__icon"></i>
        </div>
    </>
    
    )
}