import React, {useState, useEffect, useContext} from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';
import Compare from './Compare.jsx';

import axios from 'axios';

const Related = ({ currProductId }) => {

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (loading) setLoading(false);
  });

  console.log('HERE');

  return (
    <Related currProductId={currProductId}/>
  );
};

export default Related;
