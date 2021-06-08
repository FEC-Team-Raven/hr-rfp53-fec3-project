import React from 'react';

const AnswerItem = (props) => {
  let ref = props.value[1];
  let date = convertDate(ref.date);
  console.log(date);
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

const convertDate = (iso8601String) => {
  let month, day, year;
  let date = new Date(iso8601String);
  date = date.toString().split(' ');
  month = date[1];
  day = date[2];
  year = date[3];
  return `${month} ${day}, ${year}`;
};

export default AnswerItem;