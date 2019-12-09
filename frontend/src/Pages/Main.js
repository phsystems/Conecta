import React, { useEffect, useState } from 'react';
import './Main.css';
import Menu from './Menu';
import api from '../Services/Api'
import logo from '../Assets/logo.png';
import { Growl } from 'primereact/growl';


export default function Main({ match }) {
    const [userInfo, setUserInfo] = useState('');
    const [interests, setInterests] = useState('');
    const [remove, removeInterest] = useState('');
    const [toast, setToast] = useState('');
    const [charge, chargeInterests] = useState(false);
    console.debug(Growl);
    useEffect(() => {
        if (!!remove)
            api.delete(`/devs/interests/${remove.id}`).then(response => {
                toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Interesse deletado com sucesso !' })
                chargeInterests(true);
            });

    }, [remove]);

    // Charge interests
    useEffect(() => {
        api.get(`/user/detailsUser/${window.localStorage.getItem('id')}`).then(response => setUserInfo(response.data), rejd => console.debug(rejd));
        chargeInterests(true);
        
    }, [window.localStorage.getItem('id')]);
    
    // Update Interests
    useEffect(() => {
        if(!!charge){

            async function loadInterests() {
                
                const response = await api.get('/listInterests', {
                    headers: {
                        user: window.localStorage.getItem('id'),
                    }
                });
                
                // let interestUserLogged = .filter(i => i)
                const interestUserLogged = response.data.interests.filter(i => i.user.user.toUpperCase() === window.localStorage.getItem('user').toUpperCase())
                
                // setInterests(response.data.interests.filter(interest=>interest ));
                setInterests(interestUserLogged);
            }
            loadInterests();
        }
    }, [charge]);
    return (
        <div className="bckgrnd-principal position-relative h-100">
            <Growl ref={(el) => setToast(el)} />
            <div className="container feed__container">
                <Menu></Menu>
                <div className="feed-container text-white">
                    <img src={logo} alt="conecta" />
                    <div className="row">
                        <div className="col-12">

                        </div>
                        <div className="col-12">
                            <p className="perfil__title p-5">Perfil do Usuário</p>
                        </div>
                        <div className='col-12 d-flex row justify-content-center'>
                            {/* background: url('../Assets/Background.png') no-repeat center center fixed; */}
                            <img className=' col-4 perfil__avatar-img' src={userInfo.avatar}></img>
                        </div>

                        <div className="col-12 justify-content-center p-5 ">
                            <div className="row   rounded bg-white ">
                                <div className="col-12 justify-content-center">
                                    <h5 className="perfil__interest-title p-3">Interesses</h5>
                                </div>
                                <table className="table">
                                    <tbody>
                                        {interests && interests.length > 0 ? (interests.map(i => (
                                            <tr  >
                                                <th scope="row"> <i className={`fa ${i.TypeInterest ? 'fa-eraser' : 'fa-graduation-cap'}`}></i></th>
                                                <td > {i.interest.toString()}</td>
                                                <td>{i.description.toString()}</td>
                                                <td>{i.available.toString()}</td>
                                                <td><i className="fa fa-times text-danger icon_remove__button" onClick={() => {chargeInterests();removeInterest({ id: i._id })}}></i></td>
                                            </tr>

                                        ))) : (<div><h5 className="text-white">Não há nenhum interesse registrado no momento... </h5></div>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}