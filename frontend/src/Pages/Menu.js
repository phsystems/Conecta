
import React, { Component } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

export default class Menu extends Component {

    constructor() {
        super();
        this.idUser = window.localStorage.getItem('id');
        this.state = {
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFullScreen: false
        };
    }

    render() {
        return (

            <>
                <Sidebar visible={this.state.visible} position="right" className="ui-sidebar-md" onHide={(e) => this.setState({ visible: false })}>
                    <div className="row pt-2">
                        <div className="list-group list-group-flush">
                            <a href={'/profile'} className="list-group-item">Perfil</a>
                            <a href={'/cadastro'} className="list-group-item">Cadastro de Interesses</a>
                            <a href={'/feed/'+this.idUser} className="list-group-item">Feed de Interesses</a>
                            <a href={'/login'} className="list-group-item">Sair</a>
                         
                        </div>
                    </div>


                </Sidebar>

                <div className="menu__hamburger position-relative">
                    <Button icon="fa fa-bars" className="menu__icon" onClick={(e) => this.setState({ visible: true })} />
                </div>
            </>
        )
    }
}