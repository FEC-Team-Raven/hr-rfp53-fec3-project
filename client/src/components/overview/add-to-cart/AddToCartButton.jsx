import React from 'react';

const AddToCartButton = props => {
  return (
    <button id="add-to-cart" onClick={props.submit}>
      <span>Add To Cart</span>
      <span>+</span>
    </button>
  );
};

export default AddToCartButton;