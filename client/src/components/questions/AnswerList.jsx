import React, {useState} from 'react';
import AnswerItem from './AnswerItem.jsx';

const AnswerList = (props) => {
  const [showAll, setShowAll] = useState(false);
  let answers = Object.entries(props.value);
  let showA = answers.length === 0;
  let ans = answers.length > 2;
  let ansDefault = ans ? answers.slice(0, 2) : answers;
  let show = showAll ? answers : ansDefault;

  const onClick = () => {
    setShowAll(!showAll);
  };
  return (
    <div class='answerWhole'>
      <div className="answer">
        {showA ? <div></div> : <div>A: </div>}
        <div class="answerList">
          {show.map((item) =>
            <AnswerItem value={item} getAnswer={props.getAnswer}/>
          )}
        </div>
      </div>
      {ans ? <div><button class="moreAns" onClick={onClick}>
        {showAll ? 'Collapse answers' : 'See more answers'}
      </button></div> : <div></div>}
    </div>
  );
};

export default AnswerList;