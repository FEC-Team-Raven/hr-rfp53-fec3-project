import React, {useState, useEffect, useContext} from 'react';
import Stars from '../Stars.jsx';
import ActionButton from './ActionButton.jsx';


const sampleImg = 'http://pm1.narvii.com/7060/c0f21f5ee6e0f9dff1d677ce423d57b35ebbbffcr1-738-1083v2_uhq.jpg';

const ProductCard = ({product, listType}) => {

  return (
    <div className="card">
      <img src={sampleImg} width="250" height="300"></img>
      <ActionButton
        productId={product.id}
        listType={listType}/>
      <div className="category">CATEGORY
        <div>{product.name}</div>
        <div>{product.default_price}</div>
        <Stars />
      </div>
    </div>
  );
};

export default ProductCard;
