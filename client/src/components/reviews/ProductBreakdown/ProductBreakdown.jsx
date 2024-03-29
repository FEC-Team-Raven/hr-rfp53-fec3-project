import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Stars from '../../Stars.jsx';
import RatingBar from './RatingBar.jsx';
import CharacteristicBreakdown from './CharacteristicBreakdown.jsx';
import {ReviewContext} from '../Reviews.jsx';

const ProductBreakdown = props => {
  var metaData = useContext(ReviewContext).metaData[0];
  var theme = 'dark';

  var roundToQuarter = rating => {
    rating = Math.floor(rating / 0.25) * 0.25;
    var decimal = rating - Math.floor(rating);
    rating *= 20;
    if (decimal === 0.25) {
      rating += 3;
    } else if (decimal === 0.75) {
      rating -= 3;
    }
    return rating;
  };

  var renderRating = () => {
    var average = 0;
    var count = 0;
    for (var rating in metaData.ratings) {
      average += parseInt(rating, 10) * parseInt(metaData.ratings[rating]);
      count += parseInt(metaData.ratings[rating]);
    }
    average = average / count;
    average = Math.floor(average / 0.25) * 0.25;
    return (
      <div className="reviewRow">
        <div className={`productRating ${props.theme}-text`}>{average}</div>
        <Stars rating={average} />
      </div>
    );
  };

  var renderRecommended = () => {
    var recommended = metaData.recommended;
    var average = parseInt(recommended.true, 10) / (parseInt(recommended.true, 10) + parseInt(recommended.false, 10));
    average = Math.floor(average * 100);
    return <div className="recommendedRating">{average}% of reviews recommend this product</div>;
  };

  var renderStarDistribution = () => {
    var stars = Object.keys(metaData.ratings);
    var total = 0;
    for (var i = 0; i < stars.length; i++) {
      total += parseInt(metaData.ratings[i + 1], 10);
    }
    stars = stars.reverse();
    return stars.map((star, index) => {
      return <RatingBar
        key={index}
        stars={star}
        distribution={Math.floor((metaData.ratings[star] / total) * 100)}
        count={metaData.ratings[star]}
        theme={props.theme}
      />;
    });

  };

  var renderCharacteristics = () => {
    return Object.keys(metaData.characteristics).map((characteristic, index) => {
      return <CharacteristicBreakdown
        key={index}
        characteristic={characteristic}
        rating={metaData.characteristics[characteristic].value}
        theme={props.theme}/>;
    });
  };

  if (metaData) {
    return (
      <div className="productBreakdown">
        {renderRating()}
        {renderRecommended()}
        {renderStarDistribution()}
        {renderCharacteristics()}
      </div>
    );
  } else {
    return null;
  }
};

export default ProductBreakdown;
