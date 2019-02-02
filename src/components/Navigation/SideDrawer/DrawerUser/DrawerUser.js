import React from 'react';

import classes from './DrawerUser.module.css';
import userHeader from '../../../../assets/images/user-header.png'
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        <Button bsPrefix={`media btn ${classes.Button}`} onClick={this.handleClick}>
          <span className={classes.Pic}>
            <img src={userHeader} alt="Usuário"/>
          </span>
          <span className={classes.Name}>
            <span className="mt-0 mb-1">{this.props.userName}</span>
            <small>Porto Alegre, RS</small>
          </span>
        </Button>
      );
    }
  }

const drawerUser = (props) => (
    <div>
        <ButtonGroup bsPrefix={`btn-group list-unstyled ${classes.Group}`}>
            <Dropdown style={{width: '100%'}}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-drawer-user" userName={props.userName}/>
                <Dropdown.Menu className={classes.Menu}>
                    <Dropdown.Item eventKey="1" as={Link} to="/perfil">Meu Perfil</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Configurações</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </ButtonGroup>
    </div>
);

export default drawerUser