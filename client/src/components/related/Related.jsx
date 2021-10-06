import React, { useState, useEffect, useContext } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';
import Compare from './Compare.jsx';

import axios from 'axios';

const Related = ({ currProductId }) => {

  return (
    <RelatedProducts currProductId={currProductId}/>
  );
};

export default Related;
