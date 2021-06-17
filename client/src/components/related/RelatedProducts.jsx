import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import { RelatedContext } from './Related.jsx';

import sampleData from './sampleData.jsx';

const RelatedProducts = () => {
  const productData = useContext(RelatedContext).relatedStyles;
  const relatedProductData = useContext(RelatedContext).relatedProductData;
  const relatedRatings = useContext(RelatedContext).relatedProductData;

  // Adding product name and features to product data object
  if (productData.length > 0) {
    for (let i = 0; i < relatedProductData.length; i++) {
      productData[i].name = relatedProductData[i].name;
      productData[i].features = relatedProductData[i].features;
    }
  }

  return (
    <div className="carousel__cards">
      {productData.map(product =>
        <ProductCard
          product={product}
          list={'related'}
          key={product.id}/>
      )}
    </div>
  );
};

export default RelatedProducts;
