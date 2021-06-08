import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('relevant');
  const [displayCount, setDisplayCount] = useState(2);

  useEffect(() => {
    if (props.productId !== 0) {
      axios('http://localhost:3000/reviews', {
        params: {
          productId: props.productId,
          sort: sort
        }
      })
        .then(reviews => {
          setReviews(reviews.data.results);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props, sort]);

  var handleChange = event => {
    setSort(event.target.value);
  };

  return (
    <div>
      {reviews.length} reviews, sorted by
      <select onChange={handleChange}>
        <option value="relevance">relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select> <br />
      {reviews.slice(0, displayCount).map((review) => <ReviewTile review={review} />)}
      <button>More Reviews</button>
      <button>Add a Review +</button>
    </div>
  );
};

export default ReviewList;
