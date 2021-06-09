import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList.jsx';
import AddQuestionModal from './AddQuestionModal.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';

export const QuestionContext = React.createContext([]);
export const ModalContext = React.createContext(false);
export const ProductContext = React.createContext('');


const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const onClick = () => setShowModal(!showModal);

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

      <ProductContext.Provider value={props.productId}>
        <QuestionContext.Provider value={questions}>
          <QuestionsList />
        </QuestionContext.Provider>
      </ProductContext.Provider>

      <button>MORE ANSWERED QUESTIONS</button>
      <button onClick={onClick}>ADD A QUESTION</button>

      <ProductContext.Provider value={props.productId}>
        <QuestionContext.Provider value={questions}>
          <AddQuestionModal />
        </QuestionContext.Provider>
      </ProductContext.Provider>

      {/* <div id="AddQuestionModal">
        {showModal ? <AddQuestionModal value={props.productId}/> : null}
      </div> */}
    </div>
  );
};


export default Questions;

