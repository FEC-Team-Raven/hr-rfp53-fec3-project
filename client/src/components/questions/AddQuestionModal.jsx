import React, {useState, useEffect, useContext} from 'react';
import {QuestionContext, ModalContext} from './Questions.jsx';



const AddQuestionModal = (props) => {
  const test = useContext(ModalContext);
  const [show, setShow] = useState(false);
  console.log('test', test);


  return (
    <div className="modal">
      <form>
        <label>Name</label>
        <input></input>
        <label>Email</label>
        <input></input>
        <label>Answer</label>
        <input></input>
      </form>
    </div>
  );
};

export default AddQuestionModal;