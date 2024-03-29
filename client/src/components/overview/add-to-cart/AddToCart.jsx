import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SizeSelect from './SizeSelect.jsx';
import QuantitySelect from './QuantitySelect.jsx';
import AddToCartButton from './AddToCartButton.jsx';

const AddToCart = props => {
  const [ skuIndex, setSkuIndex ] = useState(0);
  const [ isOutOfStock, setIsOutOfStock ] = useState(false);

  const submitHandler = event => {
    event.preventDefault();

    const targetSKU = Object.keys(props.styleSKUs)[skuIndex];
    for (let i = 0; i < document.querySelector('#quantity-select').value; i++) {
      axios.post('/cart', { 'sku': targetSKU })
        .then(() => {
          console.log('Successfully added item to cart!');
        })
        .catch(err => {
          console.log('Failed to add item to cart. Please try again.');
          console.error(err);
        });
    }
  };

  useEffect(() => {
    if (Object.values(props.styleSKUs)[skuIndex].quantity <= 0) {
      setIsOutOfStock(true);
    } else {
      if (isOutOfStock) {
        setIsOutOfStock(false);
      }
    }
  }, [skuIndex]);

  return (
    <form id="purchase-form">
      <div id="purchase-select">
        <SizeSelect sizes={Object.values(props.styleSKUs).map(sku => sku.size)} skuSetter={event => { setSkuIndex(event.target.value); }}/>
        <QuantitySelect quantity={Object.values(props.styleSKUs)[skuIndex].quantity}/>
      </div>
      <div id="purchase-submit">
        {isOutOfStock ? null : <AddToCartButton submit={submitHandler}/>}
        {isOutOfStock ? null : <button id="favorite-button">&#x2605;</button>}
      </div>
    </form>
  );
};

export default AddToCart;