import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils, {act} from 'react-dom/test-utils';
import JSDOM from 'jest-environment-jsdom';
import Questions from '../client/src/components/questions/Questions.jsx';

/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
// let container;
// const { document } = (new JSDOM()).window;




// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });

// it('can render a component', () => {
//   //test first render and componentDidMount
//   act(() => {
//     ReactDOM.render(<Questions/>, container);
//   });
// });