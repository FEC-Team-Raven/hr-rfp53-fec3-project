import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import AddAnswerModal from './AddAnswerModal.jsx';

const QuestionItem = (props) => {
  const [answer, setAnswers] = useState([]);
  const [helpful, setHelpful] = useState(false);
  const questionId = props.value.question_id;
  const productId = props.id;


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
          <div id="helpful">Helpful?
            <button onClick={handleClick}>Yes</button>
            ({props.value.question_helpfulness})
          </div>
          <div id="addAns">
            <button>Add Answer</button>
          </div>
          <div id="Report">
            <button onClick={handleClick}>Report</button>
          </div>
        </div>
      </div>
      <div>
        <AnswerList value={answer} getAnswer={getAnswer}/>
      </div>
      <AddAnswerModal value={questionId} productId={productId} getAnswer={getAnswer}/>
    </div>
  );
};

export default QuestionItem;
