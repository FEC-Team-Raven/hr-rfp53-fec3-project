import React from 'react';

const CharacteristicRadio = props => {
  return (
    <div className="grid">
      <div>
        <input
          id={`${props.characteristic}${props.value}`}
          type="radio"
          name={props.characteristic}
          value={props.value}
          onChange={e => props.setCharacteristicValue(parseInt(e.target.value, 10))}
          required
        />
        <label htmlFor={`${props.characteristic}${props.value}`}>{props.rating}</label>
      </div>
    </div>
  );
};

export default CharacteristicRadio;