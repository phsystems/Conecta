
import React, { useState, useEffect } from 'react';
import './cadastro-interesse.css';
import api from '../Services/Api';
import Col from 'react-bootstrap/Col'
import Menu from './Menu';
import {Growl} from 'primereact/growl';

import { Form } from "react-bootstrap";


export default function CadastroInteresse({ CreateInterest }) {
    const [Interest, setInterest] = useState(true);
    const [InterestTitle, setInterestTitle] = useState('');
    const [Available, setAvailable] = useState('Segunda-Feira');
    const [Description, setDescription] = useState('');
    const [toast, setToast] = useState('');

    const _storage = window.localStorage;
    const getID = _storage.getItem('id');

    useEffect((e) => {
        console.debug(e);
    }, [InterestTitle, Available, Description, Interest]);

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs/interests/', {
            interest: InterestTitle,
            description: Description,
            available: Available,
            TypeInterest: Interest,
            interestUser: null
        }, {
            headers: {
                user: getID
            }
        });
      
       

        if (response && response.status === 200)
        toast.show({severity: 'success', summary: 'Sucesso', detail: 'Interesse cadastrado com sucesso !'})
        else
        toast.show({severity: 'error', summary: 'Erro ', detail: 'Falha ao cadastrar o interesse !'})

    }
    return (
        <div className="bckgrnd-principal position-relative h-100">
             <Growl ref={(el) => setToast(el)} />
            <div className="container feed__container">
                <Menu></Menu>
                <div className="feed-container text-white">
                    <div className="row">
                        <div className="col-12 text-white">
                            <h1 className=" p-3">Cadastro de Interesses</h1>
                            <h5 className="p-3">Qual seu interesse?</h5>
                            <button value="true" className={`cadastro__ensinar ${Interest ? 'cadastro__ensinar--ACTIVE ' : ''}`} onClick={(e) => { setInterest(true) }}>
                                <i className=" fa fa-graduation-cap" ></i>
                                <span>Ensinar{Interest}</span>
                            </button>
                            <button value="false" className={`cadastro__aprender ${!Interest ? 'cadastro__aprender--ACTIVE activeInterest_aprender' : ' activeInterest_ensinar'}`} onClick={(e) => { setInterest(false) }}>
                                <i className="fa fa-eraser"></i>
                                <span>Aprender</span>
                            </button>
                        </div>
                        <Form onSubmit={handleSubmit} className=" col-12 p-3">
                            <Form-row>
                                <Form.Group className="p-4" as={Col} md="12">
                                    <Form.Label>{`Tenho interesse em  ${Interest ? 'Ensinar' : 'Aprender'}`}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="interesse"
                                        placeholder={Interest ? 'Exp.:Matemática, História, Programação' : 'Algebra, Futebol, JavaScript...'}
                                        defaultValue=""
                                        onChange={(e) => { setInterestTitle(e.target.value) }}
                                    />
                                </Form.Group>
                                <Form.Group className="p-4" as={Col} md="12">
                                    <Form.Label>Disponibilidade</Form.Label>
                                    <Form.Control as="select" name="disponibilidade" onChange={(e) => { setAvailable(e.target.value) }}>
                                        <option value="Segunda-Feira">Segunda-feira</option>
                                        <option value='Terça-Feira'>Terça-feira</option>
                                        <option value='Quarta-Feira'>Quarta-feira</option>
                                        <option value='Quinta-Feira'>Quinta-feira</option>
                                        <option value='Sexta-Feira'>Sexta-feira</option>
                                        <option value='Sábado'>Sábado</option>
                                        <option value='Domingo'>Domingo</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="p-4" as={Col} md="12">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control onChange={(e) => { setDescription(e.target.value) }}
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