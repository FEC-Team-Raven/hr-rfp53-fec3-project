import React, { useEffect } from 'react';

const Thumbnail = props => {
  return (
    <button data-index={props['data-index']} className='thumbnail' onClick={props.selectHandler}>
      <div className="thumbnail-img" style={{'backgroundImage': `url(${props.imageURL})`}}></div>
    </button>
  );
};

export default Thumbnail;