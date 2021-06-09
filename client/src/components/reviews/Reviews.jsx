import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import axios from 'axios';

export const FilterContext = React.createContext({});

const Reviews = (props) => {
  const [starFilter, setStarFilter] = useState([]);

  return (
    <div>
      {console.log(starFilter)}
      RATINGS & REVIEWS
      <div className="ratingsReviewsContainer">
        <FilterContext.Provider value={{starFilter, setStarFilter}}>
          <ProductBreakdown productId={props.productId} />
          <ReviewList productId={props.productId} />
        </FilterContext.Provider>
      </div>
    </div>
  );
};

export default Reviews;
