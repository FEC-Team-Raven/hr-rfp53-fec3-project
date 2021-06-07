import React, {useState, useEffect} from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList.jsx';

export const QuestionContext = React.createContext([]);


const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (props.productId !== 0) {
      axios('/questions', {params: {productId: props.productId}})
        .then(questions => {
          setQuestions(questions.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [props]);

  return (
    <div>
      <input type="text" name="search"></input>
      <QuestionContext.Provider value={questions}>
        <QuestionsList />
      </QuestionContext.Provider>
      <button>MORE ANSWERED QUESTIONS</button>
      <button>ADD A QUESTION</button>
    </div>
  );
};


export default Questions;

