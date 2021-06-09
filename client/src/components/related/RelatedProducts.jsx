import React, {useState, useEffect, useContext} from 'react';
import ProductCard from './ProductCard.jsx';

import {RelatedContext} from './Related.jsx';

const RelatedProducts = () => {
  const productData = useContext(RelatedContext);

  // const renderProduct = (productData) => {
  //   console.log('productData:', productData);
  //   if (productData.length !== 0) {
  //     return productData.map(product => {
  //       <ProductCard value={productData}/>;
  //     });
  //   }
  // };

  return (
    productData.map(product =>
      <ProductCard
        value={productData}
        key={product.id}/>
    )
  );
};

export default RelatedProducts;

/*
<RelatedContext.Consumer>
{value => <div>{console.log(value)}</div>}
<ProductCard/>
</RelatedContext.Consumer>

*/