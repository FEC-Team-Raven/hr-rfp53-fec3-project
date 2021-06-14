import React, { useState, useEffect } from 'react';
import SizeSelect from './SizeSelect.jsx';
import QuantitySelect from './QuantitySelect.jsx';
import AddToCartButton from './AddToCartButton.jsx';

const AddToCart = props => {
  const [ skuIndex, setSkuIndex ] = useState(0);

  return (
    <form id="purchase-form">
      <div id="purchase-select">
        <SizeSelect sizes={props.styleSKUs.map(sku => sku.size)} skuSetter={event => { setSkuIndex(event.target.value); }}/>
        <QuantitySelect quantity={props.styleSKUs[skuIndex].quantity}/>
      </div>
      <div id="purchase-submit">
        <AddToCartButton />
        <button id="favorite-button">&#x2605;</button>
      </div>
    </form>
  );
};

export default AddToCart;