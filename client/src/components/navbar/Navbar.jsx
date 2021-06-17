import React, { useContext, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { themeContext } from './../../index.jsx';

const Navbar = props => {
  const theme = useContext(themeContext);

  useEffect(() => {
    console.log(`${theme}-1`);
  }, []);

  return (
    <div className={`${theme}-1`} id="navbar">
      Navbar
      <ThemeToggle />
    </div>
  );
};

export default Navbar;