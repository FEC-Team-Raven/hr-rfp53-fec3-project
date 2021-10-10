import React, { useState, useEffect, useContext } from 'react';
import RelatedProducts from './RelatedProducts.jsx';

import axios from 'axios';

const Related = ({ currProductId }) => {

  return (
    <div>
      <h1 id="related-title">RELATED PRODUCTS</h1>
      <RelatedProducts currProductId={currProductId}/>
    </div>
  );
};

export default Related;
