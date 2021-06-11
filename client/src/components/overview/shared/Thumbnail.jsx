import React, { useEffect } from 'react';

const Thumbnail = props => {
  let selected = props.selected;
  const select = event => {
    if (selected) { selected = false; }
    console.log('Clicked!');
    document.querySelector('#image-gallery-thumbnail-list').querySelector('.selected').classList.remove('selected');
    event.target.closest('.thumbnail').classList.add('selected');
    let mainImageURL = event.target.style.backgroundImage;
    document.querySelector('#image-gallery').style.backgroundImage = mainImageURL;
  };

  return (
    <button className={`thumbnail ${selected ? 'selected' : ''}`} onClick={select}>
      <div className="thumbnail-img" style={{'backgroundImage': `url(${props.imageURL})`}}></div>
    </button>
  );
};

export default Thumbnail;