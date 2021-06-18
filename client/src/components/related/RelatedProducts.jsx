import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import { RelatedContext } from './Related.jsx';

const RelatedProducts = () => {
  const productData = useContext(RelatedContext).relatedStyles;
  const relatedProductData = useContext(RelatedContext).relatedProductData;
  const relatedRatings = useContext(RelatedContext).relatedRatings;

  // Adding product name, features, and ratings to product data object
  if (relatedRatings.length > 0) {
    for (let i = 0; i < relatedProductData.length; i++) {
      productData[i].name = relatedProductData[i].name;
      productData[i].features = relatedProductData[i].features;
      productData[i].rating = relatedRatings[i].ratings;
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
