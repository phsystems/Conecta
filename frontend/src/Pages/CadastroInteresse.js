import React, { useState, useEffect } from 'react';
import './cadastro-interesse.css';
import api from '../Services/Api';
import { Dropdown } from 'primereact/dropdown';
import Col from 'react-bootstrap/Col'
import Menu from './Menu';
import { InputSwitch } from 'primereact/inputswitch';

import { Form, Button, FormGroup, FormControl, ControlLabel, Container } from "react-bootstrap";


export default function CadastroInteresse({ CreateInterest }) {
    const [WeekInterest, setWeekInterest] = useState('');
    const [Interest, setInterest] = useState('');

    const _storage = window.localStorage;
    const getID = _storage.getItem('id');
    const weekdays = [
        { label: 'Segunda', value: 'Seg' },
        { label: 'Terça', value: 'Ter' },
        { label: 'Quarta', value: 'Qua' },
        { label: 'Quinta', value: 'Qui' },
        { label: 'Sexta', value: 'Sex' },
        { label: 'Sabado', value: 'Sab' },
        { label: 'Domingo', value: 'Dom' }
    ];

    useEffect(() => {
    }, [WeekInterest]);

    async function setaInteresse(e) {
        console.debug(e.target.value);

    };
    useEffect(() => {
    }, [Interest]);

    async function handleSubmit(e) {
        e.preventDefault();
        console.debug("entrou rasgando")
        const response = await api.post('/devs/interests/', {
            interest: 'Jump',
            description: "aprendere aasidsa",
            available: 'Quarta',
            TypeInterest: true
        }, {
            headers: {
                // user: match.params.id,
                user: getID
            }
        });


        const { _id } = response.data;
        CreateInterest.push(`/dev/${_id}`);
        return false;
    }

    return (
        <div className="bckgrnd-principal position-relative h-100">
            <div className="container feed__container h-100">
                <Menu>

                </Menu>
                <div className="feed-container text-white">
                    <div className="row">
                        <div className="col-12 text-white">
                            <h1 className=" p-3">Cadastro de Interesses</h1>
                            <h5 className="p-3">Qual seu interesse?</h5>
                            {/* <button value="true" className={Interest ? 'cadastro__ensinar--ACTIVE' : 'cadastro__ensinar'} onClick={(e)=>{setInterest(true)}}> */}
                            <button value="true" className={`cadastro__ensinar ${Interest ? 'cadastro__ensinar--ACTIVE' : ''}`} onClick={(e) => { setInterest(true) }}>
                                <i className=" fa fa-graduation-cap" ></i>
                                <span>Ensinar{Interest}</span>
                            </button>
                            <button value="false" className={`cadastro__aprender ${!Interest ? 'cadastro__aprender--ACTIVE' : ''}`} onClick={(e) => { setInterest(false) }}>
                                <i className="fa fa-eraser"></i>
                                <span>Aprender</span>
                            </button>
                        </div>
                        <Form onSubmit={handleSubmit} className=" col-12 p-3">
                            <Form-row>

                                <Form.Group className="p-4" as={Col} md="12">
                                    <Form.Label>{`Tenho interesse em  ${Interest ? 'Ensinar' : 'Aprender'}`}</Form.Label>
                                    <Form.Control
                                        required
                                        name="interesse"
                                        type="text"
                                        placeholder={Interest ? 'Exp.:Matemática, História, Programação' : 'Algebra, Futebol, JavaScript...'}
                                        defaultValue="" />
                                </Form.Group>
                                <Form.Group   className="p-4" as={Col} md="12" controlId="weekInterest">
                                    <Form.Label>Disponibilidade</Form.Label>
                                    <Form.Control as="select" name="disponibilidade" >
                                        <option value="seg">Segunda-feira</option>
                                        <option value='ter'>Terça-feira</option>
                                        <option value='qua'>Quarta-feira</option>
                                        <option value='qui'>Quinta-feira</option>
                                        <option value='sex'>Sexta-feira</option>
                                        <option value='sab'>Sábado</option>
                                        <option value='dom'>Domingo</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group    className="p-4" as={Col} md="12">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        name="descricao"
                                        required
                                        type="text"
                                        placeholder={Interest ? 'Exp: Desejo ensinar os alunos do curso de sistemas a programar na linguagem JavaScript.' : 'Exp: Desejo aprender a resolver problemas matemáticos com equações de segundo grau.'}
                                        defaultValue="" />
                                </Form.Group>


                                <button className='cadastro__button ' type="submit">Cadastrar</button>

                            </Form-row>
                        </Form>
                    </div>
                </div>
            </div >
        </div>
    );


}