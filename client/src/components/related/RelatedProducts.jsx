import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import {RelatedContext} from './Related.jsx';

const RelatedProducts = () => {
  const productData = useContext(RelatedContext);

  return (
    productData.map(product =>
      <ProductCard
        product={product}
        list={'related'}
        key={product.id}/>
    )
  );
};

export default RelatedProducts;
