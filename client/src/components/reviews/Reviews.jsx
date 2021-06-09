import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext([]);

const Reviews = (props) => (
  <div>
    RATINGS & REVIEWS
    <div className="ratingsReviewsContainer">
      <ProductBreakdown productId={props.productId}/>
      <ReviewList productId={props.productId} />
    </div>
  </div>
);

export default Reviews;
