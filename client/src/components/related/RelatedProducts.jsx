import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import { RelatedContext } from './Related.jsx';

import sampleData from './sampleData.jsx';

const RelatedProducts = () => { // invoked 6 times, which is what we expect
  const productData = useContext(RelatedContext).relatedProducts;
  const currProductId = useContext(RelatedContext).currProductId;
  return (
    sampleData.map(product =>
      <ProductCard
        currProductId={currProductId}
        product={product}
        list={'related'}
        key={product.id}/>
    )
  );
};

export default RelatedProducts;
