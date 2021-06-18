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

  //css light and dark
  const theme = props.theme;
  const text = `${theme}-text`;
  const color1 = `${theme}-1`;
  const color2 = `${theme}-2`;
  const color3 = `${theme}-3`;
  const color4 = `${theme}-4`;
  const color5 = `${theme}-5`;
  ////////////////////////////

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
    <div id="questions"
      className={`module main-questions ${theme}-5 ${theme}-text`}>
      <div id="titleQA">QUESTIONS AND ANSWERS</div>

      <div className="search" id="search-bar-main">
        <form>
          <input id="searchBar" type="text" name="search" onChange={handleSearch}
            placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>

      <ProductContext.Provider value={props.productId}>
        <QuestionContext.Provider value={show}>
          <QuestionsList search={search} getQuestions={getQuestions} allQuestions={questions} productName={props.productName}/>
        </QuestionContext.Provider>
      </ProductContext.Provider>

      <button id={modalId} onClick={onClick}>
        {test ? null : 'MORE ANSWERED QUESTIONS'}
      </button>

      <button onClick={clickAddQuestion} id="AddQ">
        <p>ADD A QUESTION</p>
        <p id='plus'>+</p>
      </button>

      <div id="AddQuestionModal">
        <div id={showModal ? 'modal-blur-active' : 'modal-blur-inactive'}></div>
        {showModal ?
          <AddQuestionModal
            productId={props.productId}
            productName={props.productName}
            questions={questions}
            getQ={getQuestions}
            showModal={clickAddQuestion}
          /> : null}

      </div>
    </div>
  );
};


export default Questions;

