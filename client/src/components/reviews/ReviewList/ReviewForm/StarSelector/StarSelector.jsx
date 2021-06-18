import React, {useState} from 'react';
import InvisibleStar from './InvisibleStar.jsx';

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

  var handleClick = event => {
    setClickedRating(event.target.getAttribute('data-star'));
    props.setStarRating(parseInt(event.target.getAttribute('data-star'), 10));
    props.setDisplayRequireStars(false);
  };

  var stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-selector-container">
      <div className={`star-selector-rating reviewRow ${props.theme}-text`} style={{'width': `${ratingToWidth(rating)}%`}}>
        <div>&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</div>
      </div>
      <div className="starOverlay reviewRow">
        {stars.map(star => {
          return <InvisibleStar
            star={star}
            setRating={setRating}
            handleClick={handleClick}
            clickedRating={clickedRating}
          />;
        })}
      </div>
      <div className="star-selector-holo reviewRow">
        <div>&#x2606;&#x2606;&#x2606;&#x2606;&#x2606;</div>
      </div>
    </div>
  );
};

export default StarSelector;