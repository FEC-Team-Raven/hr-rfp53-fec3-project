import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';

const QuestionItem = (props) => {
  const [showAnsModal, setShowAnsModal] = useState(false);
  const [answer, setAnswers] = useState([]);
  const [helpful, setHelpful] = useState(false);
  const questionId = props.value.question_id;
  const productId = props.id;

  const clickAddAnswer = () => { setShowAnsModal(!showAnsModal); };


  useEffect(() => {
    axios({
      method: 'get',
      url: '/answers',
      params: {id: questionId}
    })
      .then((result) => {
        setAnswers(result.data.results);

      })
      .catch((err) => {
        throw err;
      });
  }, [props]);


  const getAnswer = () => {
    axios({
      method: 'get',
      url: '/answers',
      params: {id: questionId}
    })
      .then((result) => {
        setAnswers(result.data.results);
        console.log(result);
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleClick = (e) => {
    console.log(e.target.innerHTML);
    if (e.target.innerHTML === 'Yes') {
      if (!helpful) {
        setHelpful(true);
        axios({
          url: '/helpful/question',
          method: 'post',
          data: {id: questionId}
        })
          .then((result) => { props.getQuestions(productId); })
          .catch((err) => { throw err; });
      }

    } else if (e.target.innerHTML === 'Report') {
      axios({
        url: '/report/question',
        method: 'post',
        data: {id: questionId}
      })
        .then((result) => { props.getQuestions(productId); })
        .catch((err) => { throw err; });
    }

  };

  return (
    <div>
      <div className="question">
        {/* question, helpful, add ans */}
        <div id="q-text"> <h5 id="q-head">Q: </h5>{props.value.question_body}</div>
        <div className='question-extra'>
          <div id="helpful" >Helpful?
            <button onClick={handleClick} id='yes'>Yes</button>
            ({props.value.question_helpfulness})
          </div>
          <div id="addAns">
            <button onClick={clickAddAnswer} id='add'>Add Answer</button>
          </div>
          <div id="Report">
            <button onClick={handleClick} id='report'>Report</button>
          </div>
        </div>
      </div>
      <div>
        <AnswerList value={answer} getAnswer={getAnswer}/>
      </div>
      <div id="AddAnswerModal">
        <div id={showAnsModal ? 'modal-blur-active' : 'modal-blur-inactive'}></div>
        {showAnsModal ? <AddAnswerModal value={questionId} productId={productId} getAnswer={getAnswer} addAnswerModal={clickAddAnswer}/> : null}
      </div>
    </div>
  );
};

export default QuestionItem;
