import React from 'react';
import StarSelector from './StarSelector.jsx';

const ReviewForm = props => {

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


  //<span>&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</span>
  return (
    <div className="reviewFormModal">
      <span className="close" onClick={() => props.setDisplayFormModal(false)}>X</span>
      <div className="reviewFormContainer">
        <div className="starContainer">
          <StarSelector />
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
