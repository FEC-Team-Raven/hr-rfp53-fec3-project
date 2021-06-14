import React from 'react';

const SizeSelect = props => {
  return (
    <select id="size-select" onChange={props.skuSetter}>
      {props.sizes.map((size, index) => <option key={index} value={index}>{size}</option>)}
    </select>
  );
};

export default SizeSelect;