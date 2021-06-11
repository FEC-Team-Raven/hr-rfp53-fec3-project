import React, {useState, useContext} from 'react';
import {QuestionContext, ProductContext} from './Questions.jsx';
import QuestionItem from './QuestionItem.jsx';


const QuestionsList = (props) => {
  const [showAll, setShowAll] = useState(false);
  const productId = useContext(ProductContext);
  const question = useContext(QuestionContext);
  let temp = [];
  const search = props.search;

  if (search.length < 3) {
    temp = question;
  } else {
    temp = props.allQuestions;
    temp = temp.filter((value) =>
      value.question_body.indexOf(search) !== -1
    );
  }

  return (
    <div class='QList'>
      {temp.map((item) =>
        <QuestionItem value={item} id={productId} getQuestions={props.getQuestions}/>
      )}
    </div>
  );
};

export default QuestionsList;

