import React from 'react';

import classes from './NavAlerts.module.css';
import { Dropdown, Button } from 'react-bootstrap';

// todo: navAlerts e CustomToggle devem virar uma so classe
// quando conectado com redux store
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
          <span className={`far fa-bell ${classes.Bell}`}></span>
          <span className={`bg-danger ${classes.Badge}`}></span>
        </Button>
      );
    }
  }

const navAlerts = () => (
    <li className={classes.NavAlerts}>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-nav-alerts" />
            <Dropdown.Menu className={classes.Menu}>
                <Dropdown.Item eventKey="1">Alerta 1</Dropdown.Item>
                <Dropdown.Item eventKey="2">Alerta 2</Dropdown.Item>
                <Dropdown.Item eventKey="2">Alerta 3</Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    </li>
);

export default navAlerts;





