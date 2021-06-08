import React, {useState, useEffect, useContext} from 'react';
import Stars from '../../components/Stars.jsx';

const Category = () => {
  return (
    <div>
      <b>Category Component</b>
      <div>Product Name</div>
      <div>Product Price</div>
      <Stars />
    </div>
  );
};

export default Category;
