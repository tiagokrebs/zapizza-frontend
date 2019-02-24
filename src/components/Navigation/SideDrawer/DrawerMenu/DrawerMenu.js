import React, { Component } from 'react';

import SideMenu, { Item } from 'react-sidemenu';
import { withRouter } from 'react-router-dom';
import './DrawerMenu.css';

class DrawerMenu extends Component {
    clickHandler = (value) => {
        this.props.clicked();
        this.props.history.push(value);
    }

    render () {
        return (
            <div>
                <SideMenu onMenuItemClick={(value) => this.clickHandler(value)} activeItem="">
                    {/* <Item label="Clientes">
                        <Item label="Bairros" value="/bairros" icon="fas fa-map-marker-alt"/>
                        <Item label="Cidades" value="/cidades" icon="far fa-map"/>
                        <Item label="Clientes" value="/clientes" icon="fas fa-users"/>
                        <Item label="Logradouros" value="/logradouros" icon="fas fa-road"/>
                    </Item> */}
                    <Item label="Clientes" value="/clientes" icon="fas fa-users"></Item>
                    <Item label="Pedidos" value="/pedidos" icon="fas fa-cash-register"></Item>
                    <Item label="Produtos">
                        <Item label="Bebidas" value="/bebidas" icon="fas fa-beer"/>
                        <Item label="Bordas" value="/bordas" icon="far fa-circle"/>
                        <Item label="Sabores" value="/sabores" icon="fas fa-utensils"/>
                        <Item label="Tamanhos" value="/tamanhos" icon="fas fa-chart-pie"/>
                    </Item>
                </SideMenu>
            </div>
        );
    }
}

export default withRouter(DrawerMenu);