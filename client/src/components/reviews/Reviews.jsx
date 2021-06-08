import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext([]);

const Reviews = (props) => {
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [sort, setSort] = useState('relevant');

  useEffect(() => {
    if (props.productId !== 0) {
      axios('http://localhost:3000/reviews', {
        params: {
          productId: props.productId,
          page: reviewPage,
          sort: sort
        }
      })
        .then(reviews => {
          setReviews(reviews.data.results);
          setReviewPage(reviewPage + 1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props, sort]);

  return (
    <ReviewContext.Provider value={reviews}>
      <ReviewList />
    </ReviewContext.Provider>
  );
};

export default Reviews;
