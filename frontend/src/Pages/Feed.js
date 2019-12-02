import React, { useEffect, useState } from 'react';
import './Feed.css';
import Menu from './Menu';
import api from '../Services/Api';

import logo from '../Assets/logo.png';

export default function Feed({ match }) {
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
    }, [match.params.id]);
    return (
        <div className="bckgrnd-principal position-relative">
            <div className="container feed__container">
                <Menu>

                </Menu>
                <div className="feed-container">
                    <img src={logo} alt="conecta" />
                    <div className="row">
                        <div className="col-12 d-flex p-5 justify-content-center form-group">
                            <input type="form-control" className="bg-white feed__search-input" placeholder="Busque por seu interesse..."/>
                            <div className="feed__search-icon">
                                <button className="btn">
                                    <i class="fa fa-search " aria-hidden="true"></i>
                                    </button>
                            </div>
                        </div>

                    </div>

                    <ul>
                        {interests && interests.length > 0 ? (interests.map(i => (
                            <li>
                                <div className="row feed__interest">
                                    <div className="col-md-3 h-100 align-middle feed__perfil-img">
                                        <img className="w-100 h-100 rounded-circle" src={i.user.avatar} alt="" />
                                    </div>
                                    <div className="col-md-9">
                                        <span className="text-center feed__user-interest m-3">
                                            <strong>{i.user.user}</strong> quer {i.TypeInterest !== true ? `ensinar` : `aprender`} {i.interest}
                                        </span>
                                        <p className="feed__user-description m-3">
                                            {i.description}
                                        </p>
                                        <button type="submit" className={`w-100 btn m-3 ${i.TypeInterest ? 'feed__button-aprender' : 'feed__button-ensinar'}`} >
                                            <i className={`m-1 ${i.TypeInterest ? 'fa fa-eraser' : 'fa fa-graduation-cap'}`}></i>
                           
                                            {i.TypeInterest !== true ? `Ensinar` : `Aprender`}
                                        </button>
                                    </div>
                                    {/* <div className="buttons col-md-12" >                                   
                                       
                                    </div> */}
                                </div>
                            </li>
                        ))) : (<div>Fudeu</div>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}