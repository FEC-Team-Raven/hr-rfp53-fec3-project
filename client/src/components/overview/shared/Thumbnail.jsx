import React, { useEffect } from 'react';

const Thumbnail = props => {
  let selected = props.selected;
  const select = event => {
    if (selected) { selected = false; }
    console.log('Clickd!');
    document.querySelector('#image-gallery-thumbnail-list').querySelector('.selected').classList.remove('selected');
    event.target.classList.add('selected');
  };

  return (
    <button className={`thumbnail ${selected ? 'selected' : ''}`} onClick={select}>
      <div className="thumbnail-img" style={{'backgroundImage': `url(${props.imageURL})`}}></div>
    </button>
  );
};

export default Thumbnail;