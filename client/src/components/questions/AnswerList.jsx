import React from 'react';
import AnswerItem from './AnswerItem.jsx';

const AnswerList = (props) => {
  let answers = Object.entries(props.value);

  return (
    <div className="answer">
      <div>A: </div>
      <div>
        {answers.map((item) =>
          <AnswerItem value={item}/>
        )}
      </div>
    </div>
  );
};

export default AnswerList;