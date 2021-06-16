import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Overview from './../Overview.jsx';


const product = {
  campus: 'hr-rfp',
  category: 'Jackets',
  'created-at': '2021-02-23T04:22:44.728Z',
  'default_price': '140.00',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  id: 17067,
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  'updated_at': '2021-02-23T04:22:44.728Z'
};

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('can render an Overview component', () => {
  act(() => {
    ReactDOM.render(<Overview product={product}/>, container);
  });
  const overview = container.querySelector('#overview');
  expect(overview).not.toBeNull();
  expect(overview).not.toBeUndefined();
  expect(overview.children.length).toBeGreaterThan(0);
});

// test('should render Overview correctly', () => {
//   const overview = renderer
//     .create(<Overview product={product}/>)
//     .toJSON();
//   expect(overview).toMatchSnapshot();
// });