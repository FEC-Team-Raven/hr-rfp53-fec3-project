import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import ReviewForm from './ReviewForm/ReviewForm.jsx';
import {FilterContext} from '../Reviews.jsx';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [renderedReviews, setRenderedReviews] = useState(reviews);
  const [sort, setSort] = useState('relevant');
  const [displayCount, setDisplayCount] = useState(2);
  const [displayFormModal, setDisplayFormModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  var {starFilter} = useContext(FilterContext);

  useEffect(() => {
    if (props.productId !== 0) {
      getReviews();
    }
  }, [props.productId, sort]);


  useEffect(() => {
    filter(reviews);
  }, [starFilter, searchFilter]);

  var filter = reviews => {
    if (starFilter.length === 0 && searchFilter.length < 3) {
      setRenderedReviews(reviews);
    } else if (searchFilter.length < 3) {
      setRenderedReviews(reviews.filter(review => {
        return starFilter.includes(review.rating);
      }));
    } else if (starFilter.length === 0) {
      setRenderedReviews(reviews.filter(review => {
        console.log(review.body, '|', searchFilter);
        return review.body.toLowerCase().includes(searchFilter.toLowerCase());
      }));
    } else {
      setRenderedReviews(reviews.filter(review => {
        return starFilter.includes(review.rating);
      })
        .filter(review => {
          return review.body.toLowerCase().includes(searchFilter.toLowerCase());
        }));
    }
  };

  var getReviews = () => {
    axios('http://localhost:3000/reviews', {
      params: {
        productId: props.productId,
        sort: sort
      }
    })
      .then(reviews => {
        setReviews(reviews.data.results);
        filter(reviews.data.results);
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
          {renderedReviews.slice(0, displayCount).map((review) => <ReviewTile review={review} />)}
        </div>
      );
    }
  };

  var renderReviewFormModal = () => {
    if (displayFormModal) {
      return <ReviewForm productId={props.productId} setDisplayFormModal={setDisplayFormModal}/>;
    }
  };

  return (
    <div className="reviewList">
      {reviews.length} reviews, sorted by
      <select className="sortReviews" onChange={handleChange}>
        <option value="relevance">relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select>
      <input type="text" onChange={e => setSearchFilter(e.target.value)}></input> <br />
      {renderList()}
      {renderMoreReviews()}
      <button onClick={() => setDisplayFormModal(true)}>Add a Review +</button>
      {renderReviewFormModal()}
    </div>
  );
};

export default ReviewList;
