import React, {useState, useContext} from 'react';

import {ReviewContext} from './Reviews.jsx';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = () => {
  const reviews = useContext(ReviewContext);

  return (
    <div>
      {reviews.length} reviews, sorted by
      <select>
        <option value="relevance">relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select> <br />
      {reviews.map((review) => <ReviewTile review={review} />)}
      <button>More Reviews</button>
      <button>Add a Review +</button>
    </div>
  );
};

export default ReviewList;
