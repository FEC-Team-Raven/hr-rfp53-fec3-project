import React, {useState, useContext} from 'react';
import {ReviewContext} from '../Reviews.jsx';


const RatingBar = props => {
  const [starFilter, setStarFilter] = useContext(ReviewContext).starFilter;
  const [style, setStyle] = useState({
    'textDecoration': 'underline',
    'width': '53px',
    'fontWeight': 'normal'
  });

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

  var handleClick = () => {
    updateStarFilter(props.stars);
    var copy = {};
    for (var key in style) {
      copy[key] = style[key];
    }

    copy['fontWeight'] = copy['fontWeight'] === 'normal' ? 'bold' : 'normal';
    console.log(copy);
    setStyle(copy);
  };

  return (
    <div className="reviewRow">
      <div onClick={handleClick} style={style}>{props.stars} stars</div>
      <div className="table">
        <div className={`barContainer ${props.theme}-5`}>
          <div className={`bar ${props.theme}-4`} style={{'width': `${props.distribution}%`}}></div>
        </div>
      </div>
      <div style={{'marginLeft': '5px'}}>{props.count}</div>
    </div>
  );
};

export default RatingBar;
