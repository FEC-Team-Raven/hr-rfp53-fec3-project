import React from 'react';

var renderDate = (date) => {
  var date = new Date(date);
  var options = {year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

var renderRecommend = recommend => {
  if (recommend) {
    return 'I recommend this product';
  }
};

const ReviewItem = (props) => (
  <div>
    {console.log(props.review)}
    <div className="reviewRow">
      <div>Stars: {props.review.rating}</div>
      <div>{props.review.reviewer_name}, {renderDate(props.review.date)}</div>
    </div>
    <div>{props.review.body}</div>
    <div>{renderRecommend(props.review.recommend)}</div>
  </div>
);

export default ReviewItem;
