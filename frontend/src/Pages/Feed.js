import React, { useEffect, useState } from 'react';
import './Feed.css';
import Menu from './Menu';
import api from '../Services/Api';

import logo from '../Assets/logo.png';
import { string } from 'prop-types';

export default function Feed({ match }) {
    const [interests, setInterests] = useState('');
    const [user, setUser] = useState('');
    // const [search, searchInput] = useState('');
    const [charge, chargeInterest] = useState('');
    // useEffect(() => {
    //     if (search !== '') {
    //         debugger
    //         const regex = new RegExp(search, 'gm');
    //         setInterests(interests.filter(y => {
    //             if (typeof y === string)
    //                 return regex.test(y);
    //             else
    //                 return Object.values(y).find(x => regex.test(x))
    //         }))
    //     } else {
    //         debugger
    //         chargeInterest('Reniciar');
    //     }
    // }, [search])

    useEffect(() => {
        chargeInterest('start');
    }, [match.params.id, user]);


    useEffect(() => {
        if (!!user)
            api.put('/connectedInterest', { interestId: user.id, user: user.user }).then(x => loadInterests());

        async function loadInterests() {

            const response = await api.get('/listInterests', {
                headers: {
                    user: match.params.id,
                    /* user: '5dbe1b481dff6417a107538e',*/
                }
            });
            setInterests(response.data.interests.filter(interest => interest.interestUser === null && interest.user.user.toUpperCase() !== window.localStorage.getItem('user').toUpperCase()));
        }
        loadInterests();
    }, [charge]);


    return (
        <div className="bckgrnd-principal position-relative h-100">
            <div className="container feed__container h-100">
                <Menu></Menu>
                <div className="feed-container">
                    <img src={logo} alt="conecta" />
                    <div className="row">
                        <div className="col-12 d-flex p-5 justify-content-center form-group">
                            {/* onChange={(e) => searchInput(e.target.value)} */}
                            <input type="form-control"  className="bg-white feed__search-input" placeholder="Busque por seu interesse..." />
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
                                    <div className="col-md-3 h-100 align-middle feed__perfil-img justify-content-center">
                                        <img className="w-100 h-100 rounded-circle" src={i.user.avatar} alt="" />
                                    </div>
                                    <div className="col-md-9">
                                        <span className="text-center feed__user-interest m-3">
                                            <strong>{i.user.name}</strong> quer {i.TypeInterest !== true ? `ensinar` : `aprender`} {i.interest}
                                        </span>
                                        <p className="feed__user-description m-3">
                                            {i.description}
                                        </p>
                                        <button type="submit" onClick={() => setUser({ user: window.localStorage.getItem('id'), id: i._id })} className={`w-100 btn m-3 ${!i.TypeInterest ? 'feed__button-aprender' : 'feed__button-ensinar'}`} >
                                            <i className={`m-1 ${!i.TypeInterest ? 'fa fa-eraser' : 'fa fa-graduation-cap'}`}></i>

                                            {!i.TypeInterest !== true ? `Ensinar` : `Aprender`}
                                        </button>
                                    </div>
                                    {/* <div className="buttons col-md-12" >                                   
                                       
                                    </div> */}
                                </div>
                            </li>
                        ))) : (<div><h1 className="text-white">Não há nenhum interesse registrado no momento... </h1></div>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}