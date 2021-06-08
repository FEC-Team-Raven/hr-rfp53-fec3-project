import React from 'react';
import SizeSelect from './SizeSelect.jsx';
import QuantitySelect from './QuantitySelect.jsx';
import AddToCartButton from './AddToCartButton.jsx';

const AddToCart = props => {
  return (
    <div className="purchase-customize">
      <SizeSelect />
      <QuantitySelect />
      <AddToCartButton />
    </div>
  );
};

export default AddToCart;