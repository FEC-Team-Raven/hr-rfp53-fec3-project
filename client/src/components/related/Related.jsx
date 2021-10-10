import React, { useState, useEffect, useContext } from 'react';
import RelatedProducts from './RelatedProducts.jsx';

import axios from 'axios';

const Related = ({ currProductId }) => {

  return (
    <RelatedProducts currProductId={currProductId}/>
  );
};

export default Related;
