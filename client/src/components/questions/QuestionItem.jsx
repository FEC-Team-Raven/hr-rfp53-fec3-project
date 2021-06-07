import React, {useState, useEffect, useContext} from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionItem = (props) => {

  return (
    <div>
      <div className="question">
        {/* question, helpful, add ans */}
        <div >Q: {props.value.question_body}</div>
        <div className='question-extra'>
          <div id="helpful">Helpful? Yes ({props.value.question_helpfulness})</div>
          <div id="addAns">add ans</div>
        </div>
      </div>
      <div>
        <AnswerList />
      </div>
    </div>
  );
};

export default QuestionItem;

//question format
//answers obj
//question_body
//question_data
//question_helpfulness
//question_id
//reported