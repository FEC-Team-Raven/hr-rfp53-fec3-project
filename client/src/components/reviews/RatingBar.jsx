import React from 'react';

const RatingBar = props => (
  <div className="reviewRow">
    <div style={{'margin-right': '10px'}}>{props.stars} stars</div>
    <div className="table">
      <div className="barContainer">
        <div className="bar" style={{'width': `${props.distribution}%`}}></div>
      </div>
    </div>
    <div style={{'margin-left': '5px'}}>{props.count}</div>
  </div>
);

export default RatingBar;
