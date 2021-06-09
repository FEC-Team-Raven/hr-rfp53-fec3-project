import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { QuestionContext, ModalContext, ProductContext } from './Questions.jsx';


const AddAnswerModal = (props) => {
  const questions = useContext(QuestionContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const questionId = props.value;
  const productId = props.productId;

  const handleChange = (e) => {
    e.preventDefault();
    let target = e.target.name;
    let value = e.target.value;
    if (target === 'Name') {
      setName(value);
    } else if (target === 'Email') {
      setEmail(value);
    } else if (target === 'Body') {
      setBody(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      body: body,
      name: name,
      email: email,
      // eslint-disable-next-line camelcase
      product_id: productId,
      questionId: questionId
    };

    axios({
      url: '/answers/add',
      method: 'post',
      data: data
    });
  };


  return (
    <div className="modal">
      ADD ANSWER FORM
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="Name" onChange={handleChange}></input>
        <label>Email</label>
        <input type="text" name="Email" onChange={handleChange}></input>
        <label>Answer</label>
        <input type="text" name="Body" onChange={handleChange}></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddAnswerModal;