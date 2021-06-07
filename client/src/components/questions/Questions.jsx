import React from 'react';

const Questions = (props) => {
  console.log(props);
  return (
    <div>
      <div>Questions & Answers</div>
      <input type='text' name='search'/>
      <div className='Qlist'>
        <div>List</div>
      </div>
    </div>


  );
};


export default Questions;