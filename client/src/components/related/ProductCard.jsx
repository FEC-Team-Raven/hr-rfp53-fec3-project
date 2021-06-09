import React, {useState, useEffect, useContext} from 'react';

const ProductCard = ({product}) => {
  return (
    <div>
      <div>
        <div>Preview Image</div>
        <button>Action Button</button>
      </div>
      <div>
        <div>Category</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
