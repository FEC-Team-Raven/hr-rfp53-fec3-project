import React, {useState, useEffect, useContext} from 'react';
import Stars from '../Stars.jsx';

const sampleImg = 'http://pm1.narvii.com/7060/c0f21f5ee6e0f9dff1d677ce423d57b35ebbbffcr1-738-1083v2_uhq.jpg';

const ProductCard = ({product}) => {

  return (
    <div className="card">
      <img src={sampleImg} width="250" height="300"></img>
      <button>Action Button</button>
      <div>CATEGORY</div>
      <div>{product.name}</div>
      <div>{product.default_price}</div>
      <Stars />
    </div>
  );
};

export default ProductCard;
