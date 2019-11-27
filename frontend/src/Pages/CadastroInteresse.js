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

    const _storage= window.localStorage;
    const getID= _storage.getItem('id');
    const citySelectItems = [
        { label: 'New York', value: 'NY' },
        { label: 'Rome', value: 'RM' },
        { label: 'London', value: 'LDN' },
        { label: 'Istanbul', value: 'IST' },
        { label: 'Paris', value: 'PRS' }
    ];
    let variavel;
    useEffect(() => {

        variavel = WeekInterest;
        console.debug(variavel);
    }, [WeekInterest]);

    useEffect(() => {

        variavel = WeekInterest;
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
        },{
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
            <h1>Cadastro de Interesses</h1>
            <span>Ensinar</span>
            {/* <InputSwitch  onLabel="Yes" offLabel="No" checked={Interest} onChange={(e) => setInterest({value: e.value})}/> */}
            <span>Aprender</span>
            <Form onSubmit={handleSubmit}>
                <Form.Row >
                    <Form.Group as={Col} md="12">
                        <Form.Label>Interest</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Interest Title"
                            defaultValue="" />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="weekInterest">
                        <Form.Label>Available</Form.Label>
                        {/* <Form.Control
                    required
                    type="text"
                    placeholder="Interest"
                defaultValue="" /> */}
                        <Dropdown
                            className="form-control"
                            value={WeekInterest}
                            options={citySelectItems}
                            onChange={(e) => { setWeekInterest(e.value) }}
                            placeholder="Select a City" />
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
                </Form.Row>
            </Form>
        </Container>
    );


}