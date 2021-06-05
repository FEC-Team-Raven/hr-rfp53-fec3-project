import React, {useState} from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext([]);

// axios('http://localhost:3000/reviews')
//   .then((reviews) => {
//     console.log(reviews);
//   });

const Reviews = (props) => {
  console.log(props);
  const [reviews, setReviews] = useState(['one', 'two']);

  return (
    <ReviewContext.Provider value={reviews}>
      <ReviewList />
    </ReviewContext.Provider>
  );
};

export default Reviews;
