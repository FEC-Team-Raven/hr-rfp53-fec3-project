import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import { RelatedContext } from './Related.jsx';

const RelatedProducts = () => {
  const productData = useContext(RelatedContext).relatedProducts;
  const currProductId = useContext(RelatedContext).currProductId;
  return (
    productData.map(product =>
      <ProductCard
        currProductId={currProductId}
        product={product}
        list={'related'}
        key={product.id}/>
    )
  );
};

export default RelatedProducts;
