import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import ReviewForm from './ReviewForm/ReviewForm.jsx';
import {ReviewContext} from '../Reviews.jsx';

const ReviewList = (props) => {
  const [reviews, setReviews] = useState([]);
  const [renderedReviews, setRenderedReviews] = useState(reviews);
  const [sort, setSort] = useState('relevant');
  const [displayCount, setDisplayCount] = useState(2);
  const [displayFormModal, setDisplayFormModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  var starFilter = useContext(ReviewContext).starFilter[0];

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
        return review.body.toLowerCase().includes(searchFilter.toLowerCase()) || review.summary.toLowerCase().includes(searchFilter.toLowerCase());
      }));
    } else {
      setRenderedReviews(reviews.filter(review => {
        return starFilter.includes(review.rating);
      })
        .filter(review => {
          return review.body.toLowerCase().includes(searchFilter.toLowerCase()) || review.summary.toLowerCase().includes(searchFilter.toLowerCase());
        }));
    }
  };

  var getReviews = () => {
    return axios('http://localhost:3000/reviews', {
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

  var handleClick = () => {
    setDisplayCount(displayCount + 2);
  };

  var renderMoreReviews = () => {
    if (displayCount < reviews.length) {
      return <button id="moreReviews" className={`reviewButton ${props.theme}-2 ${props.theme}-text`} onClick={handleClick}>MORE REVIEWS</button>;
    }
  };

  var renderList = () => {
    if (reviews.length > 0) {
      return (
        <div className="scrollable">
          {renderedReviews.slice(0, displayCount).map((review, index) => <ReviewTile key={index} review={review} theme={props.theme}/>)}
        </div>
      );
    }
  };

  var renderReviewFormModal = () => {
    if (displayFormModal) {
      return <ReviewForm productId={props.productId} setDisplayFormModal={setDisplayFormModal} getReviews={getReviews} theme={props.theme}/>;
    }
  };

  return (
    <div className="reviewList">
      {reviews.length} reviews, sorted by
      <select className={`sortReviews ${props.theme}-3 ${props.theme}-text`} onChange={e => setSort(e.target.value)}>
        <option value="relevance">relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select>
      <input
        className={`${props.theme}-1 ${props.theme}-text`}
        type="text"
        onChange={e => setSearchFilter(e.target.value)}
      /> <br />

      {renderList()}
      {renderMoreReviews()}
      <button className={`reviewButton ${props.theme}-2 ${props.theme}-text`} onClick={() => setDisplayFormModal(true)}>ADD A REVIEW   +</button>
      {renderReviewFormModal()}
    </div>
  );
};

export default ReviewList;
