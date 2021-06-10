import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList/ReviewList.jsx';
import ProductBreakdown from './ProductBreakdown/ProductBreakdown.jsx';
import axios from 'axios';

export const FilterContext = React.createContext({});

const Reviews = (props) => {
  const [starFilter, setStarFilter] = useState([]);
  var renderReviews = productId => {
    if (productId !== 0) {
      return (
        <div>
          RATINGS & REVIEWS
          <div className="ratingsReviewsContainer">
            <FilterContext.Provider value={{starFilter, setStarFilter}}>
              <ProductBreakdown productId={props.productId} />
              <ReviewList productId={props.productId} />
            </FilterContext.Provider>
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
