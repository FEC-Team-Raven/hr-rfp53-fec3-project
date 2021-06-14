import React, { useEffect } from 'react';

const QuantitySelect = props => {
  let quantities = Array(props.quantity);
  useEffect(() => {
    console.log(props.quantity);
    for (let i = 0; i <= props.quantity; i++) {
      quantities[i] = i;
    }
  }, []);
  return (
    <select id="quantity-select">
      {Array(props.quantity).fill().map((x, i) => { if (i > 0) { return <option key={i} value={i}>{i}</option>; } } )}
    </select>
  );
};

export default QuantitySelect;