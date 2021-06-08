import React, {useState, useEffect} from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios';

export const ReviewContext = React.createContext([]);

<<<<<<< HEAD
// axios('http://localhost:3000/reviews')
//   .then((reviews) => {
//     console.log(reviews);q
//   });

const Reviews = (props) => {
  const [reviews, setReviews] = useState(['one', 'two']);
=======
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
>>>>>>> 21010d67ccdd3d3f60242eb3d14762aa5d729a8f

  return (
    <ReviewContext.Provider value={reviews}>
      <ReviewList />
    </ReviewContext.Provider>
  );
};

export default Reviews;
