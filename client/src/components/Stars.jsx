import React from 'react';

var ratingToWidth = rating => {
  rating = Math.floor(rating / 0.25) * 0.25;
  var decimal = rating - Math.floor(rating);
  rating *= 20;
  if (decimal === 0.25) {
    rating += 3;
  } else if (decimal === 0.75) {
    rating -= 3;
  }
  return rating;
};



const Stars = (props) => (
  <div>
    <div className="star-rating" style={{'width': `${ratingToWidth(props.rating)}%`}}>
      <span>&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</span>
    </div>
  </div>
);

export default Stars;