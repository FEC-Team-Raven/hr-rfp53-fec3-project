import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { QuestionContext, ModalContext, ProductContext } from './Questions.jsx';


const AddQuestionModal = (props) => {
  const productId = props.productId;
  const questions = props.questions;
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');



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
      product_id: productId
    };
    axios.post('/questions/add', data)
      .then((data) => {
        props.showModal();
        props.getQ(productId);
      })
      .catch ((err) => {
        throw err;
      });
  };


  return (
    <div className='modal'>
      <h3 id='modal-title'>Ask Your Question
        <div>About the {props.productName}</div>
      </h3>
      <form onSubmit={handleSubmit}>
        <label>Your Question*</label>
        <textarea
          type="text"
          name="Body"
          maxLength='1000'
          placeholder='Why did you like the product or not?'
          onChange={handleChange}></textarea>
        <label>What is your nickname?*</label>
        <input
          type="text"
          name="Name"
          maxLength='60'
          placeholder='Example: jackson11!'
          onChange={handleChange}
        ></input>
        <p>For privacy reasons, do not use your full name or email address</p>
        <label>Your email*</label>
        <input
          type="text"
          name="Email"
          placeholder='Example: jack@email.com'
          maxLength='60'
          onChange={handleChange}></input>
        <p>For authentication reasons, you will not be emailed</p>
        <div id="form-buttons">
          <button id='form-submit'>Submit</button>
          <button id='form-close' onClick={props.showModal}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionModal;