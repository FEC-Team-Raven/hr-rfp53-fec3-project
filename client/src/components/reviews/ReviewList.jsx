import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('relevant');
  const [displayCount, setDisplayCount] = useState(2);

  useEffect(() => {
    if (props.productId !== 0) {
      getReviews();
    }
  }, [props, sort]);

  var getReviews = () => {
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
  };

  var handleChange = event => {
    setSort(event.target.value);
  };

  var handleClick = () => {
    setDisplayCount(displayCount + 2);
  };

  var renderMoreReviews = () => {
    if (displayCount < reviews.length) {
      return <button onClick={handleClick}>More Reviews</button>;
    }
  };

  var renderList = () => {
    if (reviews.length > 0) {
      return (
        <div className="scrollable">
          {reviews.slice(0, displayCount).map((review) => <ReviewTile review={review} />)}
        </div>
      );
    }
  };

  return (
    <div className="reviewList">
      {reviews.length} reviews, sorted by
      <select onChange={handleChange}>
        <option value="relevance">relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select> <br />
      {renderList()}
      {renderMoreReviews()}
      <button>Add a Review +</button>
    </div>
  );
};

export default ReviewList;
