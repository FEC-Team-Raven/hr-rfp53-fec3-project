import React, { useEffect } from 'react';
import SocialMedia from './SocialMedia.jsx';
import Price from './Price.jsx';
import Stars from './../../Stars.jsx';

const ProductInfo = props => {
  useEffect(() => {
    console.log('Product: ', props.product);
  }, [props.product]);

  return (
    <div className="product-info">
      <h2>
        {props.product.name}
      </h2>
      <Stars rating={Math.random() * 5}/>
      <p>
        {props.product.category}
      </p>
      <p>
        {props.product.description}
      </p>
      <SocialMedia />
      <Price />
    </div>
  );
};

export default ProductInfo;