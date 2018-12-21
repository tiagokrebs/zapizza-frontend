import React from 'react';

import classes from './NavAlerts.module.css';
import { Dropdown, Badge } from 'react-bootstrap';

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
        <a href="" onClick={this.handleClick}>
          {this.props.children}
        </a>
      );
    }
  }

const navAlerts = () => (
    <li className={classes.NavAlerts}>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                teste
                <Badge pill variant="danger">1</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    </li>
);

export default navAlerts;





