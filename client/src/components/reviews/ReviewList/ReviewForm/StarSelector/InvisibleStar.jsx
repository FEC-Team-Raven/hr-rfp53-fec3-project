import React from 'react';

const InvisibleStar = props => {
  return (
    <div
      data-star={props.star}
      className="emptyStar"
      onMouseOver={(e) => props.setRating(e.target.getAttribute('data-star'))}
      onMouseLeave={() => props.setRating(props.clickedRating)}
      onClick={props.handleClick}
    />
  );
};

export default InvisibleStar;
