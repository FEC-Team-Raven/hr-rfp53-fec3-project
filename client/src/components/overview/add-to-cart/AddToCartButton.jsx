import React from 'react';

const AddToCartButton = props => {
  return (
    <button id="add-to-cart" onClick={props.submit}>
      Add To Cart
    </button>
  );
};

export default AddToCartButton;