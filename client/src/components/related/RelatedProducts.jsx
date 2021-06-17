import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import { RelatedContext } from './Related.jsx';

import sampleData from './sampleData.jsx';

const RelatedProducts = () => {
  const productData = useContext(RelatedContext).relatedProducts;
  const currProductId = useContext(RelatedContext).currProductId;
  return (
    <div className="carousel__cards">
      {sampleData.map(product =>
        <ProductCard
          currProductId={currProductId}
          product={product}
          list={'related'}
          key={product.id}/>
      )}
    </div>
  );
};

export default RelatedProducts;
