import React, {useState, useContext} from 'react';
import {QuestionContext, ProductContext} from './Questions.jsx';
import QuestionItem from './QuestionItem.jsx';


const QuestionsList = (props) => {
  const [showAll, setShowAll] = useState(false);
  const productId = useContext(ProductContext);
  const question = useContext(QuestionContext);

  return (
    <div>
      {question.map((item) =>
        <QuestionItem value={item} id={productId} getQuestions={props.getQuestions}/>
      )}
    </div>
  );
};

export default QuestionsList;

