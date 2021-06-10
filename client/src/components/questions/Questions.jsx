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
  const [showAllQ, setShowAllQ] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ques = questions.length > 4;
  const show = ques ? questions.slice(0, 4) : questions;
  const test = showAllQ ? questions : show;

  const onClick = () => setShowAllQ(!showAllQ);
  const clickAddQuestion = () => setShowModal(!showModal);


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
  }, [props]);

  const getQuestions = (productId) => {
    if (props.productId !== 0) {
      axios('/questions', {params: {productId: productId}})
        .then(questions => {
          setQuestions(questions.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>QUESTIONS AND ANSWERS</div>
      <input type="text" name="search"></input>

      <ProductContext.Provider value={props.productId}>
        <QuestionContext.Provider value={test}>
          <QuestionsList getQuestions={getQuestions}/>
        </QuestionContext.Provider>
      </ProductContext.Provider>

      <button onClick={onClick}>
        {showAllQ ? 'Hide' : 'MORE ANSWERED QUESTIONS'}
      </button>
      <button onClick={clickAddQuestion}>ADD A QUESTION</button>

      {/* <ProductContext.Provider value={props.productId}>
        <QuestionContext.Provider value={questions}>
          <AddQuestionModal />
        </QuestionContext.Provider>
      </ProductContext.Provider> */}

      {/* <AddQuestionModal productId={props.productId} questions={questions} getQ={getQuestions}/> */}

      <div id="AddQuestionModal">
        {showModal ? <AddQuestionModal productId={props.productId} questions={questions} getQ={getQuestions} showModal={clickAddQuestion}/> : null}
      </div>
    </div>
  );
};


export default Questions;

