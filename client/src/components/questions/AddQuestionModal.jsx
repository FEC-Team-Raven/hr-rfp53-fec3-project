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
    <div className="modal">
      <h3 id='modal-title'>ADD QUESTION MODAL</h3>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="Name" onChange={handleChange}></input>
        <label>Email</label>
        <input type="text" name="Email" onChange={handleChange}></input>
        <label>Question</label>
        <textarea type="text" name="Body" onChange={handleChange}></textarea>
        <div id="form-buttons">
          <button id='form-submit'>Submit</button>
          <button id='form-close' onClick={props.showModal}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionModal;