import React, { useState, useEffect, useContext } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfit from './Outfit.jsx';

import axios from 'axios';

const Related = ({ currProductId }) => {

  return (
    <div>
      <h1 id="title">RELATED PRODUCTS</h1>
      <RelatedProducts currProductId={currProductId}/>
      <h1 id="title">YOUR OUTFITS</h1>
      <Outfit currProductId={currProductId}/>
    </div>
  );
};

export default Related;
