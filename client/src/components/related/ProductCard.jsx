import React, {useState, useEffect, useContext} from 'react';
import Stars from '../Stars.jsx';
import RelatedActionButton from './RelatedActionButton.jsx';
import OutfitActionButton from './OutfitActionButton.jsx';

const sampleImg = 'http://pm1.narvii.com/7060/c0f21f5ee6e0f9dff1d677ce423d57b35ebbbffcr1-738-1083v2_uhq.jpg';

const ProductCard = ({product, list}) => {

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

  return (
    <div id={product.id} className="card">
      <img className="preview" src={sampleImg} width="250" height="300"></img>
      {renderActionBtn()}
      <div className="category">CATEGORY
        <div>{product.name}</div>
        <div>{product.default_price}</div>
        <Stars />
      </div>
    </div>
  );
};

export default ProductCard;
