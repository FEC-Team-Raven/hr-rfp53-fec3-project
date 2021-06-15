import React from 'react';

const ProductDescription = props => {
  return (
    <div id="product-description">
      <div id="description-body">
        <h2>{props.product.slogan}</h2>
        <p>{props.product.description}</p>
      </div>
      <div id="product-features">
        <ul>
          {props.product.features.map(featureObj => <li key={featureObj.feature}>{featureObj.feature}: <span className="feature-value">{featureObj.value}</span></li>)}
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;