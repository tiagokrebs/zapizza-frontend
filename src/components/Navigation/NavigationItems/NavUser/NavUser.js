import React from 'react';

import classes from './NavUser.module.css';
import userHeader from '../../../../assets/images/user-header.png'
import { Dropdown, Button } from 'react-bootstrap';

class CustomToggle extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      this.props.onClick(e);
    }
  
    render() {
      return (
        <Button className={classes.Button} bsPrefix="btn btn-link" onClick={this.handleClick}>
          <span className={classes.Pic}>
            <img src={userHeader} alt="Usuário"/>
          </span>
          <span className={classes.Name}>{this.props.userName}</span>
        </Button>
      );
    }
  }

const navLiks = (props) => {
    return (
        <li className={classes.NavLinks}>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-nav-user" userName={props.userName} />
            <Dropdown.Menu className={classes.Menu}>
                <Dropdown.Item eventKey="1">Meu Perfil</Dropdown.Item>
                <Dropdown.Item eventKey="2">Configurações</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2" href="/logout">sair</Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    </li>
    );
};

export default navLiks;