import React from 'react';

const ThemeToggle = props => {
  return (
    <button onClick={props.themeSetter} id="theme-toggle">{props.theme === 'light' ? <span>&#9728;</span> : <span>&#9790;</span>}</button>
  );
};

export default ThemeToggle;