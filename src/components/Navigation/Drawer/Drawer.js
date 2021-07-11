import React, {Component} from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Drawer.module.scss';


const links = [1,2,3];

class Drawer extends Component {
  state = {

  }

  renderLinks = () => links.map((link, index) => <li key = {index}><a href={link}>Link: {link}</a></li>);

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