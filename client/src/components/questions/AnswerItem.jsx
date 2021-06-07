import React from 'react';

const AnswerItem = (props) => {
  let ref = props.value[1];
  console.log(ref);
  let date = ref.date;
  let answer = ref.body;
  let help = ref.helpfulness;
  let user = ref.answerer_name;
  return (
    <div>
      <div id="answer-text">{answer}</div>
      <div className="answer-extra">
        <div id="ans-user">by {user}, {date}</div>
        <div id="ans-help">Helpful? Yes ({help})</div>
        <div id="ans-report">Report</div>
      </div>
    </div>
  );
};
//answer
//
export default AnswerItem;