import React from 'react';

const Price = props => props.salePrice !== null ? (
  <div id="price">
    <span id="sale-price">${props.salePrice}</span><span id="original-price">${props.price}</span>
  </div>
) : (
  <div id="price">${props.price}</div>
);

export default Price;