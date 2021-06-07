import React from 'react';

var parseDate = (date) => {
  var date = new Date(date);
  var options = {year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const ReviewItem = (props) => (
  <div>
    {console.log(props.review)}
    <div className="reviewRow">
      <div>Stars: {props.review.rating}</div>
      <div>{props.review.reviewer_name}, {parseDate(props.review.date)}</div>
    </div>
  </div>
);

export default ReviewItem;
