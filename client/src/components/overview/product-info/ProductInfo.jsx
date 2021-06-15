import React, { useEffect } from 'react';
import SocialMedia from './SocialMedia.jsx';
import Price from './Price.jsx';
import Stars from './../../Stars.jsx';

const ProductInfo = props => {
  return (
    <div id="product-info">
      <div id="product-rating">
        <Stars rating={props.rating}/><a href="/">Read all reviews</a>
      </div>
      <p id="product-category">{props.product.category}</p>
      <p id="product-name">{props.product.name}</p>
      <Price price={props.style.original_price} salePrice={props.style.sale_price}/>
      <SocialMedia />
    </div>
  );
};

export default ProductInfo;