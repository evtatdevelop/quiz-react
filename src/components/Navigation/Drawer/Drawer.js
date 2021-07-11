import React, {Component} from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

import classes from './Drawer.module.scss';


const links = [
  {to: '/', label: 'List', exact: true},
  {to: '/auth', label: 'Authorization', exact: false},
  {to: '/quiz-creator', label: 'Creat quiz', exact: false},
];

class Drawer extends Component {
  state = {

  }

  renderLinks = () => links.map(
    (linkItem, index) => (
      <li key = {index}>
        <NavLink 
          to = {linkItem.to} 
          exact = {linkItem.exact}
          activeClassName = {classes.active}
          onClick = {this.props.onClose}
        >
          {linkItem.label}
        </NavLink>
      </li>
    )
  );

  render() {
    
    const drowerClass = [classes.Drawer];
    if (!this.props.isOpen) {
      drowerClass.push(classes.close);
    }

    return (
      <>
        <nav className = {drowerClass.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick = {this.props.onClose}/> : null}
      </>  
    )
  }
}

export default Drawer;