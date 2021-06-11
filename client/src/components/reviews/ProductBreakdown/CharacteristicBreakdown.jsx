import React from 'react';

const CharacteristicBreakdown = props => {
  var left = (props.rating - 1) / 4 * 270;
  var low = '';
  var high = '';
  var perfect = 'Perfect';

  if (props.characteristic === 'Fit') {
    low = 'Too tight';
    high = 'Too loose';
  } else if (props.characteristic === 'Length') {
    low = 'Too short';
    high = 'Too long';
  } else if (props.characteristic === 'Comfort') {
    low = 'Poor';
    high = 'Perfect';
    perfect = '';
  } else if (props.characteristic === 'Quality') {
    low = 'Low';
    high = 'High';
    perfect = '';
  } else if (props.characteristic === 'Size') {
    low = 'Too small';
    high = 'Too big';
  } else if (props.characteristic === 'Width') {
    low = 'Too narrow';
    high = 'Too wide';
  }

  return (
    <div className="characteristicContainer">
      <div>{props.characteristic}</div>
      <div>
        <div className="characteristicBar"></div>
      </div>
      <div className="pointer" style={{'left': `${left}px`}}>
        <i className="fas fa-sort-up"></i>
      </div>
      <div className="reviewRow characteristic">
        <div>{low}</div>
        <div>{perfect}</div>
        <div>{high}</div>
      </div>
    </div>
  );
};

export default CharacteristicBreakdown;
