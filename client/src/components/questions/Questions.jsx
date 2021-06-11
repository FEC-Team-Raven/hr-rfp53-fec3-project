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
  const [test, setTest] = useState(false);
  const [showAllQ, setShowAllQ] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const ques = questions.length > 4;
  const show = ques ? questions.slice(0, showAllQ) : questions;
  const modalId = test ? 'MoreQInactive' : 'MoreQActive';

  const onClick = () => {
    let hold = showAllQ;
    hold += 2;
    setShowAllQ(hold);
    if (showAllQ > questions.length - 2) {
      setTest(true);
    }
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    let text = e.target.value;
    if (text.length >= 3) {
      setSearch(text);
    } else {
      setSearch('');
    }
  };

  return (
    <div class="main">
      <div>QUESTIONS AND ANSWERS</div>

      <div class="search">
        <form>
          <input id="searchBar" type="text" name="search" onChange={handleSearch}></input>
          <button>Search</button>
        </form>
      </div>

      <ProductContext.Provider value={props.productId}>
        <QuestionContext.Provider value={show}>
          <QuestionsList search={search} getQuestions={getQuestions} allQuestions={questions}/>
        </QuestionContext.Provider>
      </ProductContext.Provider>

      <button id={modalId} onClick={onClick}>
        {test ? null : 'MORE ANSWERED QUESTIONS'}
        {/* MORE ANSWERED QUESTIONS */}
      </button>
      <button onClick={clickAddQuestion} id="AddQ">ADD A QUESTION</button>

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

