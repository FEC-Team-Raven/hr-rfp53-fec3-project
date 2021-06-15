import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList/ReviewList.jsx';
import ProductBreakdown from './ProductBreakdown/ProductBreakdown.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext({});

const Reviews = (props) => {
  var context = {
    starFilter: useState([])
  };

  var renderReviews = productId => {
    if (productId !== 0) {
      return (
        <div>
          RATINGS & REVIEWS
          <div className="ratingsReviewsContainer">
            <ReviewContext.Provider value={context}>
              <ProductBreakdown productId={props.productId} />
              <ReviewList productId={props.productId} />
            </ReviewContext.Provider>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {renderReviews(props.productId)}
    </div>
  );
};

export default Reviews;
