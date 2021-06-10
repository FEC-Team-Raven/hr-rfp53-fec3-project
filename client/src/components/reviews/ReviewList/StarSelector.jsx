import React, {useState} from 'react';

const StarSelector = (props) => {
  const [rating, setRating] = useState(1);
  const [clicked, setClicked] = useState(false);

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

  var handleHover = event => {
    console.log(event.target.getAttribute('data-star'));
    if (!clicked) {
      setRating(event.target.getAttribute('data-star'));
    }
  };

  return (
    <div className="star-selector-container">
      <div className="star-selector-rating reviewRow" style={{'width': `${ratingToWidth(rating)}%`}}>
        <div data-star="1" onMouseOver={handleHover}>&#x2605;</div>
        <div data-star="2" onMouseOver={handleHover}>&#x2605;</div>
        <div data-star="3" onMouseOver={handleHover}>&#x2605;</div>
        <div data-star="4" onMouseOver={handleHover}>&#x2605;</div>
        <div data-star="5" onMouseOver={handleHover}>&#x2605;</div>
      </div>
      <div className="starOverlay reviewRow">
        <div data-star="1" className="emptyStar" onMouseOver={handleHover}></div>
        <div data-star="2" className="emptyStar" onMouseOver={handleHover}></div>
        <div data-star="3" className="emptyStar" onMouseOver={handleHover}></div>
        <div data-star="4" className="emptyStar" onMouseOver={handleHover}></div>
        <div data-star="5" className="emptyStar" onMouseOver={handleHover}></div>
      </div>
      <div className="star-selector-holo reviewRow">
        <div>&#x2606;</div>
        <div>&#x2606;</div>
        <div>&#x2606;</div>
        <div>&#x2606;</div>
        <div>&#x2606;</div>
      </div>
    </div>
  );
};

export default StarSelector;