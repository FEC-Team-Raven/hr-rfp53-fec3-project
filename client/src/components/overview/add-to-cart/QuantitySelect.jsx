import React, { useEffect } from 'react';

const QuantitySelect = props => {
  return (
    <select id="quantity-select">
      {Array(props.quantity).fill().map((x, i) => { if (i > 0) { return <option key={i} value={i}>{i}</option>; } } )}
    </select>
  );
};

export default QuantitySelect;