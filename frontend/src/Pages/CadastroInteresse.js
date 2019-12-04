import React, { useState, useEffect } from 'react';
import './cadastro-interesse.css';
import api from '../Services/Api';
import { Dropdown } from 'primereact/dropdown';
import Col from 'react-bootstrap/Col'
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
    let variavel;
    let Interesse
    useEffect(() => {

        variavel = WeekInterest;
        console.debug(variavel);
    }, [WeekInterest]);

    async function setaInteresse(e) {
        console.debug(e.target.value);

    };
    useEffect(() => {

         Interesse = Interest;
        console.debug(variavel);
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
        <Container>
            <div className="row">
                <div className="col-12">
                    <h1>Cadastro de Interesses</h1>
                    <button value="true" className={Interesse ? 'cadastro_ensinar--ACTIVE' : 'cadastro__ensinar'} onClick={(e)=>{setaInteresse(e)}}>
                        <i className=" fa fa-graduation-cap" ></i>
    <span>Ensinar{Interesse}</span>
                    </button>
                    <button  value="false" className={!Interesse ? 'cadastro_aprender--ACTIVE' : 'cadastro__aprender'} onClick={(e)=>{setaInteresse(e)}}>
                        <i className="fa fa-eraser"></i>
                        <span>Aprender</span>
                    </button>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Col} md="12">
                        <Form.Label>Interesse</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Interest Title"
                            defaultValue="" />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="weekInterest">
                        <Form.Label>Disponibilidade</Form.Label>
                        {/* <Form.Control
                    required
                    type="text"
                    placeholder="Interest"
                defaultValue="" /> */}
                        <Dropdown
                            className="form-control"
                            value={WeekInterest}
                            options={weekdays}
                            onChange={(e) => { setWeekInterest(e.value) }}
                            placeholder="Selecione o dia que está disponível" />
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            required
                            type="text"
                            placeholder="Description"
                            defaultValue="" />
                    </Form.Group>
                    <Button variant="success" type="submit">Enviar</Button>
                </Form>
            </div>
        </Container>
    );


}