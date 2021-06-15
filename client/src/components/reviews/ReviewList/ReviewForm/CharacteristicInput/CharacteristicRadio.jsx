import React from 'react';

const CharacteristicRadio = props => {
  return (
    <div>
      <input
        id={`${props.characteristic}${props.value}`}
        type="radio"
        name={props.characteristic}
        value={props.value}
        onChange={e => props.setCharacteristicValue(parseInt(e.target.value, 10))}
        required
      >
      </input>
      <label for={`${props.characteristic}${props.value}`}>{props.rating}</label>
    </div>
  );
};

export default CharacteristicRadio;