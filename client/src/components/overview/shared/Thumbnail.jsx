import React from 'react';

const Thumbnail = props => {
  const select = event => {
    event.target.classList.add('selected');
  };

  return (
    <button className="thumbnail" onClick={select}></button>
  );
};

export default Thumbnail;