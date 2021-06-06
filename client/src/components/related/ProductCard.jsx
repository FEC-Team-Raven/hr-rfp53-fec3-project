import React, {useState, useEffect, useContext} from 'react';
import Image from './Image.jsx';
import Category from './Category.jsx';

const ProductCard = () => {
  return (
    <div>
      <h3>Product Card</h3>
      <Image /><br/>
      <Category />
    </div>
  );
};

export default ProductCard;
