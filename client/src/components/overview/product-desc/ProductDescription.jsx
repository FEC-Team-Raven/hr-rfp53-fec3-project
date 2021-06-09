import React from 'react';

const ProductDescription = props => {
  return (
    <div id="product-description">
      <div id="description-body">
        <h2>{props.product.slogan}</h2>
        <p>{props.product.description}</p>
      </div>
      <div id="product-facts">
        <ul>
          <li>This is a fact about the product</li>
          <li>Cool product fact</li>
          <li>GMO non-GMO 145.42% fake-real! This isn't even a product!</li>
          <li>yep</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;