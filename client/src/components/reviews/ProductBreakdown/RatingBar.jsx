import React, {useContext} from 'react';
import {FilterContext} from '../Reviews.jsx';

const style = {
  'margin-right': '10px',
  'text-decoration': 'underline'
};

const RatingBar = props => {
  const {starFilter, setStarFilter} = useContext(FilterContext);

  var updateStarFilter = stars => {
    var copy = starFilter.slice();
    if (!starFilter.includes(parseInt(stars, 10))) {
      copy.push(parseInt(stars, 10));
      setStarFilter(copy);
    } else {
      copy.splice(copy.indexOf(stars), 1);
      setStarFilter(copy);
    }
  };

  return (
    <div className="reviewRow">
      <div onClick={() => updateStarFilter(props.stars)} style={style}>{props.stars} stars</div>
      <div className="table">
        <div className="barContainer">
          <div className="bar" style={{'width': `${props.distribution}%`}}></div>
        </div>
      </div>
      <div style={{'margin-left': '5px'}}>{props.count}</div>
    </div>
  );
};

export default RatingBar;
