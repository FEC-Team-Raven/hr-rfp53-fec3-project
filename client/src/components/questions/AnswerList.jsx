import React from 'react';
import AnswerItem from './AnswerItem.jsx';

const AnswerList = (props) => {
  let answers = Object.entries(props.value);
  let showA = answers.length === 0;
  return (
    <div className="answer">
      {showA ? <div></div> : <div>A: </div>}
      <div>
        {answers.map((item) =>
          <AnswerItem value={item} getAnswer={props.getAnswer}/>
        )}
      </div>
    </div>
  );
};

export default AnswerList;