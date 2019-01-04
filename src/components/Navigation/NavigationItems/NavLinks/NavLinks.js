import React from 'react';

import classes from './NavLinks.module.css';
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
          <span className={`fa fa-th ${classes.Th}`}></span>
        </Button>
      );
    }
  }

const navLiks = () => {
    return (
        <li className={classes.NavLinks}>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-nav-links" />
            <Dropdown.Menu className={classes.Menu}>
                <Dropdown.Item eventKey="1">Link 1</Dropdown.Item>
                <Dropdown.Item eventKey="2">Link 2</Dropdown.Item>
                <Dropdown.Item eventKey="2">Link 3</Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    </li>
    );
};

export default navLiks;