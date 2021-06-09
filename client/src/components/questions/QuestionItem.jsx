import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';

const QuestionItem = (props) => {
  const questionId = props.value.question_id;
  const productId = props.id;

  const handleClick = (e) => {
    if (e.target.innerHTML === 'Yes') {
      axios({
        url: '/helpful/question',
        method: 'post',
        data: {id: questionId}
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    } else if (e.target.innerHTML === 'Report') {
      axios({
        url: '/report/question',
        method: 'post',
        data: {id: questionId}
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <div>
      <div className="question">
        {/* question, helpful, add ans */}
        <div id="q-text"> <h5 id="q-head">Q: </h5>{props.value.question_body}</div>
        <div className='question-extra'>
          <div id="helpful">Helpful?
            <button onClick={handleClick}>Yes </button>
            ({props.value.question_helpfulness})
          </div>
          <div id="addAns">
            <button>Add Answer</button>
          </div>
          <div id="Report">
            <button onClick={handleClick}>Report</button>
          </div>
        </div>
      </div>
      <div>
        <AnswerList value={props.value.answers}/>
      </div>
      <AddAnswerModal value={questionId} productId={productId}/>
    </div>
  );
};

export default QuestionItem;
