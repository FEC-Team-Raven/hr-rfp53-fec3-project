import React, {useState, useContext} from 'react';
import {QuestionContext, ProductContext} from './Questions.jsx';
import QuestionItem from './QuestionItem.jsx';


const QuestionsList = (props) => {
  const productId = useContext(ProductContext);
  const question = useContext(QuestionContext);
  const questionShort = question.length > 4 ? question.slice(0, 4) : question;
  return (
    <div>
      {questionShort.map((item) =>
        <QuestionItem value={item} id={productId} getQuestions={props.getQuestions}/>
      )}
    </div>
  );
};

export default QuestionsList;

