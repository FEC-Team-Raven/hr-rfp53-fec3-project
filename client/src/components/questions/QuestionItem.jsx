import React, {useState, useEffect, useContext} from 'react';
import AnswerList from './AnswerList.jsx';

const QuestionItem = (props) => {

  return (
    <div>
      <div className="question">
        {/* question, helpful, add ans */}
        <div id="q-text"> <h5 id="q-head">Q: </h5>{props.value.question_body}</div>
        <div className='question-extra'>
          <div id="helpful">Helpful?
            <button> Yes </button>
            ({props.value.question_helpfulness})
          </div>
          <div id="addAns">
            <button>Add Answer</button>
          </div>
        </div>
      </div>
      <div>
        <AnswerList value={props.value.answers}/>
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