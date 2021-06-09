import React, {useState, useContext} from 'react';
import {QuestionContext, ProductContext} from './Questions.jsx';
import QuestionItem from './QuestionItem.jsx';


const QuestionsList = (props) => {
  const productId = useContext(ProductContext);
  const question = useContext(QuestionContext);
  return (
    <div>
      {question.map((item) =>
        <QuestionItem value={item} id={productId}/>
      )}
    </div>
  );
};

export default QuestionsList;

