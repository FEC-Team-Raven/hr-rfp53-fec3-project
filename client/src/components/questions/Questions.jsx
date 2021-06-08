import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList.jsx';
import AddQuestionModal from './AddQuestionModal.jsx';

export const QuestionContext = React.createContext([]);
export const ModalContext = React.createContext(false);


const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const onClick = () => setShowModal(true);

  //get questions
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
  }, [props, showModal]);

  return (
    <div>
      <div>QUESTIONS AND ANSWERS</div>
      <input type="text" name="search"></input>

      <QuestionContext.Provider value={questions}>
        <QuestionsList />
      </QuestionContext.Provider>

      <button>MORE ANSWERED QUESTIONS</button>
      <button onClick={onClick}>ADD A QUESTION</button>
      <div id="AddQuestionModal">
        {showModal ? <AddQuestionModal /> : null}
      </div>
    </div>
  );
};


export default Questions;

