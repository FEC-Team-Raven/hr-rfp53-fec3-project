import React, {useState} from 'react';
import axios from 'axios';

const convertDate = (iso8601String) => {
  let month, day, year;
  let date = new Date(iso8601String);
  date = date.toString().split(' ');
  month = date[1];
  day = date[2];
  year = date[3];
  return `${month} ${day}, ${year}`;
};

const AnswerItem = (props) => {
  const [helpful, setHelpful] = useState(false);
  let ref = props.value[1];
  let date = convertDate(ref.date);
  let answer = ref.body;
  let help = ref.helpfulness;
  let user = ref.answerer_name;

  //asnwer id --> ref.id
  const handleClick = (e) => {
    console.log(ref.answer_id);
    console.log(e.target.innerHTML);
    if (e.target.innerHTML === 'Report') {
      axios({
        url: '/report/answer',
        method: 'post',
        data: {id: ref.answer_id}
      })
        .then((result) => {
          //get all answers
          props.getAnswer();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e.target.innerHTML === 'Yes') {
      if (!helpful) {
        setHelpful(true);
        axios({
          url: '/helpful/answer',
          method: 'post',
          data: {id: ref.answer_id}
        })
          .then((data) => { props.getAnswer(); })
          .catch((err) => { throw err; });
      }
    }


  };

  return (
    <div>
      <div id="answer-text">{answer}</div>
      <div className="answer-extra">
        <div id="ans-user">by {user}, {date}</div>
        <div id="ans-help">Helpful? <button onClick={handleClick} id='yes'>Yes</button> ({help})</div>
        <div id="ans-report"><button onClick={handleClick} id='report'>Report</button></div>
      </div>
    </div>
  );
};


export default AnswerItem;