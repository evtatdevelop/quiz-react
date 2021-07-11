import React from 'react';

import classes from './MenuToggle.module.scss';

const MenuToggle = props => {
  const {isOpen, onToggle} = props;

  const menuClass = [
    classes.MenuToggle,
    'fa'
  ];

  if (isOpen) {
    menuClass.push('fa-times');
    menuClass.push(classes.open);
  } else {
    menuClass.push('fa-bars');
  }

  return (
    <i 
      className = {menuClass.join(' ')}
      onClick = {onToggle}
    />
  )
}

export default MenuToggle;