import React from 'react';
import CharacteristicRadio from './CharacteristicRadio.jsx';

const CharacteristicInput = props => {
  var rating1 = '';
  var rating2 = '';
  var rating3 = '';
  var rating4 = '';
  var rating5 = '';

  if (props.characteristic === 'Size') {
    rating1 = 'A size too small';
    rating2 = '½ a size too small';
    rating3 = 'Perfect';
    rating4 = '½ a size too big';
    rating5 = 'A size too wide';
  } else if (props.characteristic === 'Width') {
    rating1 = 'Too narrow';
    rating2 = 'Slightly narrow';
    rating3 = 'Perfect';
    rating4 = 'Slightly wide';
    rating5 = 'Too wide';
  } else if (props.characteristic === 'Comfort') {
    rating1 = 'Uncomfortable';
    rating2 = 'Slightly uncomfortable';
    rating3 = 'Ok';
    rating4 = 'Comfortable';
    rating5 = 'Perfect';
  } else if (props.characteristic === 'Quality') {
    rating1 = 'Poor';
    rating2 = 'Below average';
    rating3 = 'What I expected';
    rating4 = 'Pretty great';
    rating5 = 'Perfect';
  } else if (props.characteristic === 'Length') {
    rating1 = 'Runs Short';
    rating2 = 'Runs slightly short';
    rating3 = 'Perfect';
    rating4 = 'Runs slightly long';
    rating5 = 'Runs long';
  } else if (props.characteristic === 'Fit') {
    rating1 = 'Runs tight';
    rating2 = 'Runs slightly tight';
    rating3 = 'Perfect';
    rating4 = 'Runs slightly long';
    rating5 = 'Runs long';
  }

  var values = [1, 2, 3, 4, 5];

  return (
    <div className="characteristicInputContainer">
      {props.characteristic} <br />
      <div className="characteristicInput">
        {values.map(value => {
          return <CharacteristicRadio
            value={value}
            characteristic={props.characteristic}
            setCharacteristicValue={props.setCharacteristicValue}
            rating={eval('rating' + value)}
          />;
        })}
      </div>
    </div>
  );
};

export default CharacteristicInput;
