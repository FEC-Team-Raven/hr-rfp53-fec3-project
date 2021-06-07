import React, {useState, useContext} from 'react';
import {QuestionContext} from './Questions.jsx';
import QuestionItem from './QuestionItem.jsx';


const QuestionsList = (props) => {
  const question = useContext(QuestionContext);

  return (
    <div>QUESTION LIST
      {/* map questions */}
      {question.map((item) =>
        <QuestionItem value={item}/>
      )}
      {/* answer list */}
    </div>
  );
};

export default QuestionsList;


// let main = props.value;
// let helpfulness = main.question_helpfulness;
// let reported = main.reported;
// let questionId = main.question_id;
// let date = main.question_date;
// let asker = main.asker_name;
// let answers = main.answers;
// let question = main.question_body;
// console.log(answers);

