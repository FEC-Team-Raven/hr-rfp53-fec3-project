import React, {useState, useEffect, useContext} from 'react';
import Stars from '../Stars.jsx';
import RelatedActionButton from './RelatedActionButton.jsx';
import OutfitActionButton from './OutfitActionButton.jsx';

const sampleImg = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png';

const ProductCard = ({product, list}) => {

  // Rating calculator helper function
  const computeRating = () => {
    let ratingObj = product.rating;
    let totalRatings = 0;
    let numberOfRatings = 0;
    for (var score in ratingObj) {
      totalRatings += (Number(score) * Number(ratingObj[score]));
      numberOfRatings += Number(ratingObj[score]);
    }
    return totalRatings / numberOfRatings;

  };
  let rating = computeRating();

  let styles = product.results;
  let previewImg, defaultPrice, salePrice;

  // Renders product price and default image
  const renderProductInfo = () => {
    for (let i = 0; i < styles.length; i++) {
      if (styles[i]['default?']) {
        previewImg = styles[i].photos[0].url;
        defaultPrice = '$' + styles[i].original_price;
        if (salePrice) {
          defaultPrice = '<del>' + defaultPrice + '</del>';
        }
        break;
      } else if (!styles[styles.length - 1]['default?']) {
        defaultPrice = 'N/A';
      }
    }
  };
  renderProductInfo();

  // If missing image, then use placeholder image
  if (!previewImg) {
    previewImg = sampleImg;
  }

  // Renders action button, depending on which list the button appears within
  const renderActionBtn = () => {
    if (list === 'related') {
      return (
        <RelatedActionButton
          product={product} list={list}/>
      );
    } else {
      return (
        <OutfitActionButton
          product={product} list={list}/>
      );
    }
  };

  // Finding average rating for each product:
  // Create total points
  // Iterate through ratings object
  // Add to total point according to key value pair
  // Divide total by number of ratings to get average rating

  return (
    <div id={product.product_id} className="card">
      <img className="preview" src={previewImg} width="250" height="300"></img>
      {renderActionBtn()}
      <div className="category">CATEGORY
        <div>{product.name}</div>
        <div>{defaultPrice}</div>
        <div>{salePrice}</div>
        <Stars rating={rating}/>
      </div>
    </div>
  );
};

export default ProductCard;
