import React, { useEffect } from 'react';
import Thumbnail from './../shared/Thumbnail.jsx';

const StyleSelect = props => {
  const select = event => {
    props.selectStyle(event.target.dataset.index);
  };

  return (
    <div id="style-select">
      {props.styles.map((style, index) => <Thumbnail key={index} imageURL={style.photos[0].thumbnail_url} data-index={index} selectHandler={select} />)}
    </div>
  );
};

export default StyleSelect;