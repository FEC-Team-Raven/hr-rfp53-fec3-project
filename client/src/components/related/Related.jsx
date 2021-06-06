import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

const Related = ({productId}) => {

  return (
    <div>
      <h1>RELATED PRODUCTS</h1>
      <RelatedProducts />
      <h1> YOUR OUTFIT</h1>
      <YourOutfit />
    </div>
  );
};


export default Related;
