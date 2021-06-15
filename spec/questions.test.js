import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RTU, {act, isDOMComponent, mockComponent} from 'react-dom/test-utils';
import Questions from '../client/src/components/questions/Questions.jsx';

/**
 * @jest-environment jsdom
 */

// test('use jsdom in this test file', () => {
//   const element = document.createElement('div');
//   expect(element).not.toBeNull();
// });

describe('Questions component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<Questions productId={17067} productName={'Camo Onesie'}/>, container);
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('has correct title', () => {
    const title = document.getElementById('titleQA');
    expect(title.textContent).toBe('QUESTIONS AND ANSWERS');
  });

  // it('has search bar', () => {
  //   let searchBar = RTU.findRenderedDOMComponentWithClass(container, 'search');
  // });
});

// describe('renders all components', () => {

//   //test first render and componentDidMount
//   // const questionList = document.getElementById('Qlist');
//   // const addQuestionButton = document.getElementById('AddQ');
//   // const addMoreQuestionButton = document.getElementById('MoreQActive');




//   // it('has a search bar', () => {
//   //   const productId = 17067;
//   //   const productName = 'Camo Onesie';
//   //   act(() => {
//   //     ReactDOM.render(<Questions productId={productId} productName={productName}/>, container);
//   //   });

//   //   const search = document.getElementById('search-bar-main');
//   //   // expect(true).toBe(true);
//   //   expect(isDOMComponent(search)).toBe(true);
//   // });

// });