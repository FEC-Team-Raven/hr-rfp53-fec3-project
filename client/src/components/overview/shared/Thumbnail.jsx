import React, { useEffect } from 'react';

const Thumbnail = props => {
  const select = event => {
    document.querySelector('#image-gallery-thumbnail-list').querySelector('.selected').classList.remove('selected');
    event.target.classList.add('selected');
  };

  return (
    <button className={`thumbnail ${props.selected ? 'selected' : ''}`} onClick={select}></button>
  );
};

export default Thumbnail;