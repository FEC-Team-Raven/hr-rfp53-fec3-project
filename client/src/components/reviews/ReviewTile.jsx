import React from 'react';
import Stars from '../Stars.jsx';

var renderDate = (date) => {
  var date = new Date(date);
  var options = {year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

var renderRecommend = recommend => {
  if (recommend) {
    return <div>'I recommend this product'</div>;
  }
};

var renderResponse = response => {
  if (response) {
    return (
      <div className="response">
        Response: <br/>
        {response}
      </div>
    );
  }
};

const ReviewTile = (props) => (
  <div className="reviewTile">
    {console.log(props.review)}
    <div className="reviewRow between">
      <Stars rating={2.99} />
      <div>{props.review.reviewer_name}, {renderDate(props.review.date)}</div>
    </div>
    <div>{props.review.body}</div>
    {renderRecommend(props.review.recommend)}
    {renderResponse(props.review.response)}
    <div className="reviewRow">
      Helpful?
      <button>Yes ({props.review.helpfulness})</button>
      <button>No</button>
    </div>
  </div>
);

export default ReviewTile;
