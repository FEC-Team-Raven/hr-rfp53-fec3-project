import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext([]);

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (props.productId !== 0) {
      axios('http://localhost:3000/reviews', {params: {productId: props.productId}})
        .then(reviews => {
          setReviews(reviews.data.results);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props]);

  return (
    <ReviewContext.Provider value={reviews}>
      <ReviewList />
    </ReviewContext.Provider>
  );
};

export default Reviews;
