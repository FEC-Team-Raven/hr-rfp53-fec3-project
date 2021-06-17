import React, { useEffect } from 'react';
import Thumbnail from './../shared/Thumbnail.jsx';

const StyleSelect = props => {
  const select = event => {
    document.querySelector('#style-select').querySelector('.selected').classList.remove('selected');
    event.target.classList.add('selected');
    props.selectStyle(event.target.dataset.index);
  };

  useEffect(() => {
    document.querySelector('#style-select').children[0].classList.add('selected');
  }, []);

  return (
    <div id="style-select">
      {props.styles.map((style, index) => <Thumbnail key={index} imageURL={style.photos[0].thumbnail_url} data-index={index} selectHandler={select} />)}
    </div>
  );
};

export default StyleSelect;