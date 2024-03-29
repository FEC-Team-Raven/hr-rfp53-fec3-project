import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { QuestionContext, ModalContext, ProductContext } from './Questions.jsx';

const checkBlank = (dataObj) => {
  let bodyBlank = dataObj.body === '';
  let emailBlank = dataObj.email === '';
  let nameBlank = dataObj.name === '';

  return bodyBlank || emailBlank || nameBlank;
};

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


    if (checkBlank(data)) {
      alert('Please fill in all mandatory fields');
    } else {
      //post new answer then get all answer from api
      axios({
        url: '/answers/add',
        method: 'post',
        data: data
      })
        .then((result) => {
          props.addAnswerModal();
          props.getAnswer();
        })
        .catch((err) => {
          alert('please enter a valid email address');
          throw err;
        });
    }

  };


  return (
    <div className='modal' >
      <h3 id='modal-title'>Submit your Answer
        <h5>{props.productName}: {props.questionBody}</h5>
      </h3>
      <form onSubmit={handleSubmit}>
        <label>Your Answer*</label>
        <textarea
          maxlength='1000'
          type="text"
          name="Body"
          onChange={handleChange}>
        </textarea>
        <label>What is your nickname*</label>
        <input type="text"
          name="Name"
          maxlength='60'
          placeholder='Example: jack543!'
          onChange={handleChange}>
        </input>
        <p>For privacy reasons, do not use your full name or email address</p>
        <label>Your email*</label>
        <input
          type="text"
          name="Email"
          maxlength='60'
          placeholder='Example: jack@email.com'
          onChange={handleChange}>
        </input>
        <p>For authentication reasons, you will not be emailed</p>
        <div id='form-buttons'>
          <button id='form-submit'>Submit</button>
          <button id='form-close' onClick={props.addAnswerModal}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddAnswerModal;