import React, { useContext, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.jsx';

const Navbar = props => {
  return (
    <div className={`module ${props.theme}-1`} id="navbar">
      Navbar
      <ThemeToggle themeSetter={props.themeSetter}/>
    </div>
  );
};

export default Navbar;