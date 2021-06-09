import React from 'react';
import SizeSelect from './SizeSelect.jsx';
import QuantitySelect from './QuantitySelect.jsx';
import AddToCartButton from './AddToCartButton.jsx';

const AddToCart = props => {
  return (
    <form id="purchase-form">
      <div id="purchase-select">
        <SizeSelect />
        <QuantitySelect />
      </div>
      <div id="purchase-submit">
        <AddToCartButton />
        <button id="favorite-button">&#x2605;</button>
      </div>
    </form>
  );
};

export default AddToCart;