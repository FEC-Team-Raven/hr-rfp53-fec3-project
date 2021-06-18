import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import Related from '../client/src/components/related/Related';
import Outfit from '../client/src/components/related/Outfit';
import ProductCard from '../client/src/components/related/ProductCard';
import ActionButton from '../client/src/components/related/ActionButton';

let container;

let product =
  {
    id: 17067,
    campus: 'hr-rfp',
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140.00',
    created_at: '2021-02-23T04:22:44.728Z',
    updated_at: '2021-02-23T04:22:44.728Z',
    features: [
      { feature: 'Fabric', value: 'Canvas' },
      { feature: 'Buttons', value: 'Brass' }
    ]
  }
;


beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it ('should render outfit list and be empty by default', () => {
  act(() => {
    ReactDOM.render(<Outfit productId={product.id}/>, container);
  });

  let outfitList = container.querySelector('.outfit');

  expect(outfitList.textContent.includes('Add to Outfit')).toEqual(true);
  expect(outfitList.childNodes.length).toBe(1);
});


// it('can add outfits', () => {
//   act(() => {
//     ReactDOM.render(<Outfit productId={product.id}/>, container);
//   });

//   const button = container.querySelector('button');
//   console.log('button:', button);
//   const outfitList = container.querySelector('.outfit');
//   console.log('outfit list length:', outfitList.childNodes.length);
//   // Outfit list should be empty by default
//   expect(outfitList.childNodes.length).toBe(1);

//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//   })
//     .then(() => {
//       console.log('outfit list length:', outfitList.childNodes.length);
//       expect(addOutfit).toHaveBeenCalledTimes(1);
//       expect(outfitList.childNodes.length).toBe(2);
//     })
//     .catch((err) => {
//       throw err;
//     });

// expect(addOutfit).toHaveBeenCalledTimes(1);


// });


