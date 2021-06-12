import React, {useState} from 'react';

const StarSelector = (props) => {
  const [rating, setRating] = useState(0);
  const [clickedRating, setClickedRating] = useState(0);

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
    setRating(event.target.getAttribute('data-star'));
  };

  var handleClick = event => {
    setClickedRating(event.target.getAttribute('data-star'));
    props.setStarRating(parseInt(event.target.getAttribute('data-star'), 10));
    props.setDisplayRequireStars(false);
  };

  return (
    <div className="star-selector-container">
      <div className="star-selector-rating reviewRow" style={{'width': `${ratingToWidth(rating)}%`}}>
        <div>&#x2605;</div>
        <div>&#x2605;</div>
        <div>&#x2605;</div>
        <div>&#x2605;</div>
        <div>&#x2605;</div>
      </div>
      <div className="starOverlay reviewRow">
        <div
          data-star="1"
          className="emptyStar"
          onMouseOver={handleHover}
          onMouseLeave={() => setRating(clickedRating)}
          onClick={handleClick}
        >
        </div>
        <div
          data-star="2"
          className="emptyStar"
          onMouseOver={handleHover}
          onMouseLeave={() => setRating(clickedRating)}
          onClick={handleClick}
        >
        </div>
        <div
          data-star="3"
          className="emptyStar"
          onMouseOver={handleHover}
          onMouseLeave={() => setRating(clickedRating)}
          onClick={handleClick}
        >
        </div>
        <div
          data-star="4"
          className="emptyStar"
          onMouseOver={handleHover}
          onMouseLeave={() => setRating(clickedRating)}
          onClick={handleClick}
        >
        </div>
        <div
          data-star="5"
          className="emptyStar"
          onMouseOver={handleHover}
          onMouseLeave={() => setRating(clickedRating)}
          onClick={handleClick}
        >
        </div>
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